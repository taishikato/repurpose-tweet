import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const toneArray = [
  "friendly",
  "hook",
  "stoner",
  "compress",
  "persuasive",
] as const;

const handler = async (req: NextRequest): Promise<Response> => {
  let { tweet, mode } = (await req.json()) as {
    tweet: string;
    mode: typeof toneArray[number];
  };

  tweet = tweet.replace(/\n/g, " ");

  if (!toneArray.includes(mode)) mode = "friendly";

  let prompt = `Rephrase the tweet in ${mode} tone.
  Tweet: ${tweet}
  Rephrase:`;

  if (mode === "compress") {
    prompt = `Please summarize the following tweet. Everyone should be able to easily understand it.
    Tweet: ${tweet}
    Rephrase:`;
  } else if (mode === "hook") {
    prompt = `Please rephrase the following tweets to make them more attention-grabbing.
    Tweet: ${tweet}
    Rephrase:`;
  } else if (mode === "stoner") {
    prompt = `Please rewrite the following tweet to make it sound like a person smoking pot and getting high.
    Tweet: ${tweet}
    Rephrase:`;
  } else if (mode === "persuasive") {
    prompt = `Rephrase the tweet in persuasive language.
    Tweet: ${tweet}
    Rephrase:`;
  }

  try {
    const payload = {
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      prompt,
    };

    try {
      const json = await fetch("https://api.openai.com/v1/completions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .catch((err) => {
          throw new Error(err.message);
        });

      return new Response(
        JSON.stringify({ result: json.choices[0].text ?? "" }),
        { status: 200 }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({
          status: "error",
          result: "An error occurred because of an Open AI API error",
        }),
        { status: 500 }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ status: "error", result: (err as Error).message }),
      { status: 500 }
    );
  }
};

export default handler;

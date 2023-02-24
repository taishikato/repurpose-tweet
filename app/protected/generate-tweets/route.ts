// Node.js runtime
import Twitter, { ResponseData } from "twitter";

const client = new Twitter({
  consumer_key: process.env.CUSTOMER_KEY as string,
  consumer_secret: process.env.CONSUMER_SECRET as string,
  access_token_key: process.env.ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
});

export async function POST(req: Request) {
  const { accountName } = (await req.json()) as {
    accountName: string;
  };

  const params = {
    screen_name: accountName,
    exclude_replies: true,
    include_rts: false,
  };

  let data = [] as ResponseData[];

  try {
    data = (await client.get(
      "statuses/user_timeline",
      params
    )) as ResponseData[];
  } catch (err) {
    console.error({ err });
    if ((err as any)[0].code === 34) {
      return new Response(
        JSON.stringify({ code: 34, detail: "This account does not exist." }),
        {
          status: 400,
        }
      );
    }

    return new Response(JSON.stringify({ detail: "An error occurred." }), {
      status: 500,
    });
  }

  const tweets = data.map((d: Twitter.ResponseData) => d.text);

  const payload = {
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
    prompt: `Please create a list of new tweets from the list of the tweets below. The number of the new tweets must be 2. Please return it as an array. Please do not use any hashtags.
    The list of the tweets in style of a json data format: ${JSON.stringify(
      tweets
    )}
    The new tweets array:`,
  };

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

  return new Response(JSON.stringify({ tweet: json.choices[0].text }), {
    status: 200,
  });
}

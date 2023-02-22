// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Twitter from "twitter";

const client = new Twitter({
  consumer_key: process.env.CUSTOMER_KEY as string,
  consumer_secret: process.env.CONSUMER_SECRET as string,
  access_token_key: process.env.ACCESS_TOKEN_KEY as string,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
});

type Data = {
  tweet: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const accountName = req.body.accountName;
  const params = {
    screen_name: accountName,
    exclude_replies: true,
    include_rts: false,
  };
  const data = await client.get("statuses/user_timeline", params);

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

  res.status(200).json({ tweet: json.choices[0].text });
}

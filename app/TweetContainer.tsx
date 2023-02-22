import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import axios from "redaxios";

export const TweetContainer = ({ tweet }: { tweet: string }) => {
  const [paraphrasedTweet, setParaphrasedTweet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tone, setTone] = useState<string | null>(null);

  const paraphrase = async ({
    tweet,
    mode,
  }: {
    tweet: string;
    mode: string;
  }) => {
    setParaphrasedTweet(null);
    setLoading(true);
    setTone(null);
    setTone(mode);
    const { data }: { data: { result: string } } = await axios.post(
      "/api/paraphrase",
      {
        tweet,
        mode,
      }
    );
    setLoading(false);
    setParaphrasedTweet(data.result);
  };

  return (
    <div
      className="p-4 mb-6 text-lg border rounded-2xl animate-fade-in"
      key={tweet}
    >
      <span className="block mb-5">{tweet}</span>
      <div className="divider" />
      <div className="flex flex-wrap gap-x-3">
        <button
          disabled={loading}
          className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full"
          onClick={() => paraphrase({ tweet, mode: "friendly" })}
        >
          Dark
        </button>
        <button
          disabled={loading}
          className="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full"
          onClick={() => paraphrase({ tweet, mode: "friendly" })}
        >
          Energy
        </button>
        <button
          disabled={loading}
          className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex gap-x-1 items-center"
          onClick={() => paraphrase({ tweet, mode: "friendly" })}
        >
          {tone === "friendly" && loading && (
            <CgSpinnerTwo className="w-4 h-4 animate-spin" />
          )}{" "}
          Friendly
        </button>
      </div>
      {paraphrasedTweet && (
        <div className="mt-5 animate-fade-in">{paraphrasedTweet}</div>
      )}
    </div>
  );
};

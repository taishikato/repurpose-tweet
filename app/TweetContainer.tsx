import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { IoCheckmarkCircle } from "react-icons/io5";
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
      <div className="flex flex-wrap gap-3">
        <button
          disabled={loading}
          className="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex gap-x-1 items-center"
          onClick={() => paraphrase({ tweet, mode: "friendly" })}
        >
          {tone === "friendly" && loading && (
            <CgSpinnerTwo className="w-4 h-4 animate-spin" />
          )}
          {tone === "friendly" && !loading && (
            <IoCheckmarkCircle className="w-4 h-4" />
          )}{" "}
          Friendly 👯
        </button>
        <button
          disabled={loading}
          className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex gap-x-1 items-center"
          onClick={() => paraphrase({ tweet, mode: "hook" })}
        >
          {tone === "hook" && loading && (
            <CgSpinnerTwo className="w-4 h-4 animate-spin" />
          )}
          {tone === "hook" && !loading && (
            <IoCheckmarkCircle className="w-4 h-4" />
          )}{" "}
          Hook 👊
        </button>
        <button
          disabled={loading}
          className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex gap-x-1 items-center"
          onClick={() => paraphrase({ tweet, mode: "compress" })}
        >
          {tone === "compress" && loading && (
            <CgSpinnerTwo className="w-4 h-4 animate-spin" />
          )}
          {tone === "compress" && !loading && (
            <IoCheckmarkCircle className="w-4 h-4" />
          )}{" "}
          Compress 🗜
        </button>
        <button
          disabled={loading}
          className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex gap-x-1 items-center"
          onClick={() => paraphrase({ tweet, mode: "stoner" })}
        >
          {tone === "stoner" && loading && (
            <CgSpinnerTwo className="w-4 h-4 animate-spin" />
          )}
          {tone === "stoner" && !loading && (
            <IoCheckmarkCircle className="w-4 h-4" />
          )}{" "}
          Stoner 💨
        </button>
      </div>
      {paraphrasedTweet && (
        <div className="mt-5 animate-fade-in">{paraphrasedTweet}</div>
      )}
    </div>
  );
};

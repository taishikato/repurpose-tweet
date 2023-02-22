"use client";

import axios from "redaxios";
import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { TweetContainer } from "./TweetContainer";

export const MainContent = () => {
  const [newTweet, setNewTweet] = useState([
    "I'm finding that more and more people are taking advantage of subscription plans offered by big tech companies. What do you think?",
  ]);
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);

  const fetchTweets = async () => {
    setNewTweet([]);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/generate-tweets", {
        accountName,
      });
      setNewTweet(JSON.parse(data.tweet));
      setAccountName(null);
    } catch (err) {
      console.error({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mb-14">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (accountName == null) return;
            await fetchTweets();
          }}
          className="flex items-center justify-center gap-x-3"
        >
          <input
            type="text"
            placeholder="Type here"
            className="w-full max-w-xs rounded-full input input-bordered"
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            value={accountName ?? ""}
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-full bg-sky-500 text-white font-semibold transition-colors hover:bg-sky-600`}
          >
            {loading ? (
              <CgSpinnerTwo className="w-5 h-5 animate-spin" />
            ) : (
              "Create a Tweet"
            )}
          </button>
        </form>
      </div>
      {newTweet.map((t) => (
        <TweetContainer tweet={t} key={t} />
      ))}
    </>
  );
};

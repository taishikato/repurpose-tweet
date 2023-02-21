"use client";

import { inter } from "@/interFont";
import axios from "axios";
import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";

export const MainContent = () => {
  const [newTweet, setNewTweet] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    setNewTweet([]);
    setLoading(true);
    try {
      const { data } = await axios.get("/api/hello");
      setNewTweet(JSON.parse(data.tweet));
    } catch (err) {
      console.error({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center mb-14">
        <button
          disabled={loading}
          onClick={fetchTweets}
          className={`px-8 py-4 rounded-full bg-sky-500 text-white font-bold transition-colors hover:bg-sky-600 ${inter.className}`}
        >
          {loading ? (
            <CgSpinnerTwo className="animate-spin" />
          ) : (
            "Create a Tweet"
          )}
        </button>
      </div>
      {newTweet.map((t) => {
        return (
          <div className="text-lg p-3 border rounded-xl mb-6" key={t}>
            {t}
          </div>
        );
      })}
    </>
  );
};

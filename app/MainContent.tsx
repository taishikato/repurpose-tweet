"use client";

import axios from "axios";
import { useState } from "react";
import { inter } from "./page";
import { CgSpinnerTwo } from "react-icons/cg";

export const MainContent = () => {
  const [newTweet, setNewTweet] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    setNewTweet("");
    setLoading(true);
    try {
      const { data } = await axios.get("/api/hello");
      setNewTweet(data.tweet);
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
      <div className="text-lg">{newTweet}</div>
    </>
  );
};

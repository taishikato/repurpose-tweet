"use client";

import axios from "redaxios";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { TweetContainer } from "./TweetContainer";
import { Alert } from "./Alert";

const bigAccounts = [
  {
    name: "Elon Musk",
    image:
      "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/elon-musk",
    account: "elonmusk",
  },
  {
    name: "Paul Graham",
    image:
      "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/pg",
    account: "paulg",
  },
  {
    name: "Melinda French Gates",
    image:
      "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/mg",
    account: "melindagates",
  },
];

export const MainContent = ({ isLoggedin }: { isLoggedin: boolean }) => {
  // const [newTweet, setNewTweet] = useState([
  //   "I'm finding that more and more people are taking advantage of subscription plans offered by big tech companies. What do you think?",
  // ]);
  const [newTweet, setNewTweet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [loadingBigAccount, setLoadingBigAccount] = useState(false);
  const [selectedBigAccount, setSelectedBigAccount] = useState<string | null>(
    null
  );
  const [authAlert, setAuthAlert] = useState(false);

  const fetchTweets = async (account: string) => {
    setAuthAlert(false);
    setNewTweet([]);

    try {
      const { data } = await axios.post("/api/protected/generate-tweets", {
        accountName: account,
      });
      setNewTweet(JSON.parse(data.tweet));
      setAccountName(null);
    } catch (err) {
      if ((err as any).status === 401) {
        setAuthAlert(true);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedin) setNewTweet([]);
  }, [isLoggedin]);

  return (
    <div className="mt-24">
      {authAlert && <Alert message="You need to login." />}
      <div className="w-full">
        <div className="mb-5 text-xl font-medium text-center">
          Use someone&apos;s tweet
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (accountName == null) return;

            try {
              setLoading(true);
              await fetchTweets(accountName);
            } catch (err) {
            } finally {
              setLoading(false);
            }
          }}
          className="flex flex-col items-center justify-center gap-y-3 md:gap-y-0 md:flex-row md:gap-x-3"
        >
          <input
            type="text"
            name="accountName"
            placeholder="Your account name without @"
            className="w-full max-w-xs rounded-full input input-bordered"
            onChange={(e) => {
              setAccountName(e.target.value);
            }}
            value={accountName ?? ""}
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-full bg-sky-500 text-white font-semibold transition-colors hover:bg-sky-600 w-full md:w-auto max-w-xs`}
          >
            {loading ? (
              <CgSpinnerTwo className="w-5 h-5 animate-spin" />
            ) : (
              "Create tweets"
            )}
          </button>
        </form>
      </div>
      <div className="my-14 divider">OR</div>
      <div className="mb-5 text-xl font-medium text-center">
        Use big accounts&apos; tweets like below
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-20">
        {bigAccounts.map((v) => {
          return (
            <button
              key={v.account}
              className="flex items-center py-2 transition-colors border rounded-full px-7 gap-x-3 hover:bg-slate-100"
              onClick={async () => {
                try {
                  setSelectedBigAccount(v.account);
                  setLoadingBigAccount(true);
                  setAuthAlert(false);
                  await fetchTweets(v.account);
                } catch (err) {
                  if ((err as any).status === 401) {
                    setAuthAlert(true);
                  }
                } finally {
                  setLoadingBigAccount(false);
                }
              }}
            >
              {selectedBigAccount === v.account && loadingBigAccount ? (
                <CgSpinnerTwo className="w-5 h-5 animate-spin" />
              ) : (
                <div className="avatar">
                  <div className="w-5 rounded-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.image} loading="lazy" alt={v.name} />
                  </div>
                </div>
              )}
              {v.name}
            </button>
          );
        })}
      </div>
      {newTweet.map((t) => (
        <TweetContainer tweet={t} key={t} />
      ))}
    </div>
  );
};

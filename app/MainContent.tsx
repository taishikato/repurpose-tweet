import axios from "redaxios";
import { useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { TweetContainer } from "./TweetContainer";
import { Alert } from "./Alert";
import { event } from "nextjs-google-analytics";

const bigAccounts = [
  {
    name: "Elon Musk",
    image:
      "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/elon-musk",
    account: "elonmusk",
  },
  {
    name: "Cardi B",
    image:
      "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/cardib",
    account: "iamcardib",
  },
  {
    name: "Justin Welsh",
    image:
      "https://hndfjivgskjpoyxfgmyu.supabase.co/storage/v1/object/public/public/jw",
    account: "thejustinwelsh",
  },
];

const scroll = () => {
  const section = document.querySelector("#tweet-result");
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
};

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
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [showAlertTweetContainer, setShowAlertTweetContainer] = useState(false);

  const fetchTweets = async (account: string) => {
    setShowAlert(false);
    setNewTweet([]);

    try {
      const { data } = await axios.post("/api/protected/generate-tweets", {
        accountName: account,
      });
      setNewTweet(JSON.parse(data.tweet));
      setAccountName(null);
      scroll();
    } catch (err) {
      console.log({ err });
      if ((err as any).status === 401) {
        setShowAlert(true);
        setErrorMessage("You need to login.");
      } else if ((err as any).status === 400 && (err as any).data.code === 34) {
        setShowAlert(true);
        setErrorMessage((err as any).data.detail);
      } else {
        setShowAlert(true);
        setErrorMessage(undefined);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedin) setNewTweet([]);
  }, [isLoggedin]);

  return (
    <div className="mt-24">
      {showAlert && <Alert message={errorMessage} />}
      <div className="w-full">
        <div className="mb-5 text-xl font-medium text-center">
          Use your Twitter account{" "}
          <span className="text-sm">
            (You can use anyone&apos;s account actually ????)
          </span>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            event("click-create-tweet-btn");

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
            className={`flex md:inline justify-center px-8 py-3 rounded-full bg-sky-500 text-white font-semibold transition-colors hover:bg-sky-600 w-full md:w-auto max-w-xs`}
          >
            {loading ? (
              <CgSpinnerTwo className="w-5 h-5 animate-spin" />
            ) : (
              "Create tweets"
            )}
          </button>
        </form>
      </div>
      <div className="my-9 divider">OR</div>
      <div className="mb-5 text-xl font-medium text-center">
        Try big accounts
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-10 md:mb-20">
        {bigAccounts.map((v) => {
          return (
            <button
              key={v.account}
              className="flex items-center py-2 transition-colors border rounded-full px-7 gap-x-3 hover:bg-slate-100"
              onClick={async () => {
                try {
                  event(`click-${v.account}-btn`);
                  setSelectedBigAccount(v.account);
                  setLoadingBigAccount(true);
                  setShowAlert(false);
                  await fetchTweets(v.account);
                } catch (err) {
                  if ((err as any).status === 401) {
                    setShowAlert(true);
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
      {showAlertTweetContainer && <Alert />}
      <div id="tweet-result">
        {newTweet.map((t) => (
          <TweetContainer
            setShowAlertTweetContainer={setShowAlertTweetContainer}
            tweet={t}
            key={t}
          />
        ))}
      </div>
    </div>
  );
};

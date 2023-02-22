"use client";

import { poppins } from "@/fonts";
import { MainContent } from "./MainContent";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Home() {
  return (
    <>
      <GoogleAnalytics
        trackPageViews={process.env.NEXT_PUBLIC_PROD === "true"}
      />
      <main
        className={`my-36 w-full max-w-[680px] m-auto ${poppins.className} px-2 md:px-0`}
      >
        <h1 className="mb-10 text-5xl font-semibold text-center md:text-7xl">
          Repurpose your recent tweets
        </h1>
        <h2 className="mb-20 text-xl font-medium text-center md:text-2xl">
          Get inspired by anyone&apos;s recent tweets and
          <br /> use them for yourself.
        </h2>
        <MainContent />
      </main>
    </>
  );
}

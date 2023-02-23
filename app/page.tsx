"use client";

import { poppins } from "@/fonts";
import { MainContent } from "./MainContent";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Login } from "./Login";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function Home() {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabaseClient.auth.getUser();

      if (data && !error) setIsLoggedin(true);
    };
    fetchUser();
  }, [supabaseClient.auth]);

  return (
    <>
      <GoogleAnalytics
        trackPageViews={process.env.NEXT_PUBLIC_PROD === "true"}
      />
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="taishik"
        data-description="Support me on Buy me a coffee!"
        data-message="Thank you for visiting!"
        data-color="#FF813F"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      />
      <SessionContextProvider supabaseClient={supabaseClient}>
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
        <main
          className={`pt-12 md:pt-24 pb-36 w-full max-w-[680px] m-auto ${poppins.className} px-2 md:px-0`}
        >
          <h1 className="mb-10 text-5xl font-bold text-center md:text-7xl text-slate-800">
            Repurpose your/anyone&apos;s recent tweets
          </h1>
          <h2 className="text-xl font-medium text-center mb-14 md:text-2xl text-slate-500">
            Get inspired by anyone&apos;s recent tweets and use them for
            yourself.
          </h2>
          {!isLoggedin && <Login />}
          <MainContent isLoggedin={isLoggedin} />
        </main>
        <Footer />
      </SessionContextProvider>
    </>
  );
}

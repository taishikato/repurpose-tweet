"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const supabaseClient = useSupabaseClient();
  const [showDesc, setShowDesc] = useState(false);

  const login = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const logout = async () => {
    return supabaseClient.auth.signOut();
  };

  return (
    <div className="mb-14">
      <div className="flex items-center justify-center gap-x-3">
        <button
          className="flex items-center py-3 transition-colors bg-white border rounded-full px-7 gap-x-2 hover:bg-slate-100"
          onClick={login}
        >
          <FcGoogle className="w-5 h-5" />
          Login with Google
        </button>
        <button
          className="text-sm hover:underline"
          onClick={() => setShowDesc((prev) => !prev)}
        >
          Why do I need to login?
        </button>
        {/* <button onClick={logout}>Logout</button> */}
      </div>
      {showDesc && (
        <div className="mt-3 animate-fade-in">
          The reason is to prevent API abuse.
          <br />I have an experience that someone called my API A LOT like
          crazy, thus I had to pay money to OpenAI for that.
        </div>
      )}
    </div>
  );
};

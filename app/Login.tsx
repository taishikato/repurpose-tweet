import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { event } from "nextjs-google-analytics";
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

  return (
    <div className="mb-14">
      <div className="flex flex-col items-center justify-center gap-x-3 md:flex-row">
        <button
          className="flex items-center py-3 mb-3 transition-colors bg-white border rounded-full px-7 gap-x-2 hover:bg-slate-100 md:mb-0"
          onClick={async () => {
            event("click-login-btn");
            await login();
          }}
        >
          <FcGoogle className="w-5 h-5" />
          Login with Google
        </button>
        <button
          className="text-sm hover:underline"
          onClick={() => {
            event("click-show-login-desc-btn");
            setShowDesc((prev) => !prev);
          }}
        >
          Why do I need to login?
        </button>
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

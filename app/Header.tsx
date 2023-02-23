import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { poppins } from "@/fonts";
import type { SetStateAction } from "react";

export const Header = ({
  isLoggedin,
  setIsLoggedin,
}: {
  isLoggedin: boolean;
  setIsLoggedin: (value: SetStateAction<boolean>) => void;
}) => {
  const supabaseClient = useSupabaseClient();
  const logout = async () => {
    await supabaseClient.auth.signOut();
    setIsLoggedin(false);
  };

  return (
    <header className={`px-4 md:px-0 ${poppins.className}`}>
      <div className="h-[50px] max-w-[680px] w-full m-auto flex items-center flex-row-reverse">
        {isLoggedin && (
          <button
            onClick={logout}
            className="px-4 py-1 text-sm font-semibold border rounded-full text-slate-500"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

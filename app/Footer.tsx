import { poppins } from "@/fonts";
import { IoLogoGithub } from "react-icons/io5";

export const Footer = () => {
  return (
    <footer
      className={`flex justify-center py-8 border-t ${poppins.className}`}
    >
      <div className="flex items-center">
        <small className="text-xs text-slate-500">
          Made by{" "}
          <a
            href="https://twitter.com/taishik_"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            @taishik_
          </a>
        </small>
        {/* <div className="flex items-center ml-5 text-xs text-slate-500"> */}
        <a
          href="https://github.com/taishikato/repurpose-tweet"
          target="_blank"
          className="flex items-center text-xs ml-7 text-slate-500 hover:underline"
        >
          <IoLogoGithub className="w-4 h-4 mr-1" />
          Source code
        </a>
        {/* </div> */}
      </div>
    </footer>
  );
};

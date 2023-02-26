import { poppins } from "@/fonts";
import { IoLogoGithub } from "react-icons/io5";
import { SiSubstack } from "react-icons/si";

export const Footer = () => {
  return (
    <footer
      className={`flex justify-center py-8 border-t flex-col items-center ${poppins.className}`}
    >
      <div className="flex items-center mb-7">
        <a
          href="https://github.com/taishikato/repurpose-tweet"
          target="_blank"
          className="flex items-center text-xs ml-7 text-slate-500 hover:underline"
        >
          <IoLogoGithub className="w-4 h-4 mr-1" />
          Source code
        </a>
        <a
          href="https://taishi.substack.com/"
          target="_blank"
          className="flex items-center p-2 text-xs font-medium text-white transition-colors bg-orange-500 rounded-md ml-7 hover:bg-orange-600"
        >
          <SiSubstack className="w-3 h-3 mr-1" />
          On SubStack
        </a>
      </div>
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
    </footer>
  );
};

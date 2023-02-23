import { poppins } from "@/fonts";

export const Footer = () => {
  return (
    <footer
      className={`flex items-center justify-center py-8 border-t ${poppins.className}`}
    >
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

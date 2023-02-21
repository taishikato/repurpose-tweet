import { inter } from "@/interFont";
import { MainContent } from "./MainContent";

export default function Home() {
  return (
    <main
      className={`mt-44 mb-20 w-full max-w-[680px] m-auto ${inter.className} px-2 md:px-0`}
    >
      <h1 className="font-extrabold text-5xl md:text-7xl mb-14 text-center tracking-wide">
        Repurpose your recent tweets
      </h1>
      <MainContent />
    </main>
  );
}

import { poppins } from "@/fonts";
import { MainContent } from "./MainContent";

export default function Home() {
  return (
    <main
      className={`mt-44 mb-20 w-full max-w-[680px] m-auto ${poppins.className} px-2 md:px-0`}
    >
      <h1 className="text-5xl font-bold tracking-wide text-center md:text-7xl mb-14">
        Repurpose your recent tweets
      </h1>
      <MainContent />
    </main>
  );
}

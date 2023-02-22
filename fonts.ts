import { Inter } from "@next/font/google";
import { Poppins } from "@next/font/google";

// export const inter = Inter({ subsets: ["latin"] });

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-poppins",
});

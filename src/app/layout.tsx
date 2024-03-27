import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import BannerWaitList from "@/components/BannerWaitList";
import NavBar from "../components/NavBar";
import Providers from "../components/Provider";
import Footer from "../components/Footer";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Art Street",
  description: "Landing Page Art Street",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={
          " w-full relative h-full font-sans antialiased" + inter.className
        }
      >
        <BannerWaitList />
        <Providers>
          <NavBar />
          <main className=" relative flex flex-col min-h-screen">
            <div className=" flex-grow flex-1">{children}</div>
          </main>
          <Footer />
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}

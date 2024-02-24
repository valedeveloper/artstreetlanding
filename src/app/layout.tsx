import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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
        className={" relative h-full font-sans antialiased" + inter.className}
      >
   
        <NavBar />
        <main className=" relative flex flex-col min-h-screen">
          <div className=" flex-grow flex-1">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Link from "next/link";
import Providers from "../components/Provider";
import { Toaster } from "sonner";
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
        <p className=" text-md text-center  bg-primaryYelow p-1 w-full hover:bg-yellow-500">
          {" "}
          <Link href={"/waitlist"}>
            Estamos desarrollando un producto increíble ¡Click para ingresar a
            la lista de espera!
          </Link>
        </p>

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

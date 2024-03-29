"use client";
import CallToAction from "../components/CallToAction";
import Intro from "../components/Intro";
import Image from "next/image";
import WaitScreen from "./waitlist/page";
import { scrollToSection } from "../utilities/scrollToSection";
import AppInfo from "@/components/AppInfo";
import ProductReel from "@/components/ProductReel";
import FeaturesSection from "@/components/FeaturesSection";

function HomePage(): JSX.Element {
  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <Image
          src={"/assets/gif/artist.gif"}
          className="opacity-85"
          layout="fill"
          objectFit="cover"
          alt="Artista"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="pb-3 text-5xl font-bold border-b-2 border-gray-400  shadow-md  lg:6xl relative z-10">
            Si la Calle es el escenario
          </h1>
          <CallToAction
            title="Aquí vas a encontrar el verdadero Arte"
            className="bg-primaryYelow hover:bg-yellow-500  mt-6 p-4"
            onClick={() => scrollToSection("intro")}
          />
        </div>
      </div>
      <Intro />
      <FeaturesSection />
      <WaitScreen />
      <ProductReel
        title="Conoce la Store"
        subtitle="Compra para tus presentaciones y vístete con Art Street"
        href="/products"
        query={{
          sort: "desc",
          limit: 4,
        }}
      />
        <AppInfo />
    </>
  );
}
export default HomePage;

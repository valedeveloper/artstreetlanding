"use client"
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import CallToAction from "../components/CallToAction";
import Intro from "../components/Intro";
import { scrollToSection } from "../utilities/scrollToSection";
import Image from "next/image";

function HomePage(): JSX.Element {
  return (
    <>
        <div className="h-screen relative overflow-hidden">
          <Image
            src={"/assets/gif/artist.gif"}
            layout="fill"
            objectFit="cover"
            alt="Artista"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="pb-3 text-4xl font-bold border-b-2 border-gray-400 text-gray-900 lg:6xl relative z-10">
              Si la Calle es el escenario
            </h1>
            <CallToAction
              title="Aquí vas a encontrar el verdadero Arte"
              className="bg-primaryYelow hover:bg-yellow-500  mt-6 p-3"
               onClick={() => scrollToSection("intro")}
            />
          </div>
        </div>
      <Intro />
    </>
  );
}
export default HomePage;

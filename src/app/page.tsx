'use client'
import Link from "next/link";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import CallToAction from "./components/CallToAction";
import Intro from "./components/Intro";
import { scrollToSection } from "./utilities/scrollToSection";

function HomePage(): JSX.Element {
  return (
    <>
      <MaxWidthWrapper className="bg-cover">
      <div style={{ backgroundImage: 'url("/assets/gif/artist.gif")'}} className=" h-screen mx-auto text-center justify-center flex flex-col items-center max-w-3xl py-20 gap-8 ">
        <h1 className=" pb-3 text-4xl  font-bold border-b-2 border-gray-400 text-gray-900 lg:6xl">
          Si la Calle es el escenario
        </h1>
        <CallToAction
          title="Aquí vas a encontrar el verdadero Arte"
          className=" bg-primaryYelow hover:bg-yellow-500"
          onClick={()=>scrollToSection("intro")}
        />
      </div>
      </MaxWidthWrapper>
      <Intro />
    </>
  );
}
export default HomePage;

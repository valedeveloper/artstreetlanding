import Image from "next/image";
import MaxWidthWrapper from "./components/MaxWidthWrapper";

export default function Home() {
  return (
  <MaxWidthWrapper>
    <div className=" h-screen  mx-auto text-center justify-center flex flex-col items-center max-w-3xl py-20 gap-8 ">
      <h1 className=" pb-3 text-4xl  font-bold border-b-2 border-gray-400 text-gray-900 lg:6xl">Si la Calle es el escenario</h1>
      <button className=" cursor-pointer text-lg bg-primaryYelow p-4 font-semibold rounded-3xl hover:bg-yellow-500 ">Aquí vas a encontrar el verdadero arte</button>
    </div>
  </MaxWidthWrapper>
  );
}

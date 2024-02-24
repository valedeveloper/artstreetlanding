import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import CallToAction from "./CallToAction";

function Intro(): JSX.Element {
  return (
      <div className=" bg-black text-white p-20 text-center flex flex-col gap-5 items-center  " id="intro">
        <h6 className=" text-2xl text-primaryGray">¡Siente el arte en tus manos!</h6>
        <h1 className=" title">¿Qué es Art Street?</h1>
        <span className="text-primaryGray  text-xl max-w-prose  text-muted-foreground ">
          Transmite, descubre y conecta con artistas de todo el mundo.<br></br>
          ¡Comparte, sigue, dona y sé parte de esta increíble experiencia
          creativa!
        </span>
        <CallToAction href="/waitlist" title="Notifícame" className=" bg-transparent border-2 border-primaryYelow text-primaryYelow w-full md:w-max hover:bg-primaryYelow hover:text-black   " />
      </div>
  );
}

export default Intro;

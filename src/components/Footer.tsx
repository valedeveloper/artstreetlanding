import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";

function Footer():JSX.Element{
  return (
    <footer className="bg-primaryBlack text-white p-14">
      <MaxWidthWrapper>
        <address className="flex flex-col items-center lg:flex-row justify-around text-gray-500 text-center">
          <h2 className="">
            &copy; Copyright 2024 Art Street - Todos los derechos reservados
          </h2>
          <ul className="text-sm font-medium">
            <li>Desarrollado por Building Projects</li>
          </ul>
        </address>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;


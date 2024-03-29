"use client";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { buildWhatsAppLink } from "../utilities/buildWhatsAppLink";
import Link from "next/link";
import { scrollToSection } from "@/utilities/scrollToSection";

function Footer(): JSX.Element {
  return (
    <footer className=" bg-black text-white   gap-5 flex flex-col items-center py-8">
      {/* <h2 className="text-lg font-bold">
        Art Street -{" "}
        <span className=" text-primaryGray">Descubre el verdadero Arte</span>
      </h2> */}
      <ul className="flex flex-col items-center  p-2 md:flex-row gap-2">
        <li className=" item-hover border-r-1 px-2 border-gray-500 ">
          <Link href="/">Inicio</Link>
        </li>
        <li
          className=" item-hover border-r-1 px-2 border-gray-500"
          onClick={() => scrollToSection("intro")}
        >
          ¿Qué es Art Street?
        </li>
        <li
          className=" item-hover border-r-1 px-2 border-gray-500"
          onClick={() => scrollToSection("wait-list")}
        >
          Lista de Espera
        </li>
        <li className="item-hover">
          <Link href="/products">Store</Link>
        </li>
        {/* <li className="nav-item">
          <Link href="#" className="nav-link px-2 text-body-secondary">
            About
          </Link>
        </li> */}
      </ul>
      <div className=" flex flex-col-reverse items-center w-full justify-evenly gap-y-3 md:flex-row">
        {/* <address className="flex  items-center gap-5  text-gray-500 text-center"> */}
        {/* <h2 className="">
            &copy; Copyright 2024 Art Street - Todos los derechos reservados
          </h2> */}
        {/* </address> */}
        <p className=" text-gray-500 text-center text-sm font-medium">
          Desarrollado por Building Projects
        </p>
        <div className="flex gap-4 ">
          <FaWhatsapp
            size={25}
            className="item-hover"
            onClick={buildWhatsAppLink}
          />
          <Link
            href={
              "https://www.instagram.com/artstreetapp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            }
          >
            <FaInstagram size={25} className="item-hover" />
          </Link>
          <Link href={`mailto:artstreetcol@gmail.com`}>
            <MdEmail size={25} className="item-hover" />
          </Link>
          <p className="flex items-center gap-x-2">
            <FaPhoneAlt />
            +57 317 029 9336
          </p>
        </div>
      </div>
    </footer>

    // <footer className="bg-primaryBlack text-white p-14   ">
    //   <MaxWidthWrapper className=" space-y-10">
    //     <div className=" flex flex-col justify-center items-center gap-6">
    //       <h2 className="text-lg font-bold">
    //         Art Street - <span className=" text-primaryGray">Descubre el verdadero Arte</span>
    //       </h2>
    //       <div className="flex gap-4 ">
    //         <FaWhatsapp size={25} className="item-hover" onClick={buildWhatsAppLink} />
    //         <Link href={"https://www.instagram.com/artstreetapp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="}><FaInstagram size={25} className="item-hover" /></Link>
    //         <Link href={`mailto:artstreetcol@gmail.com`}><MdEmail size={25} className="item-hover" /></Link>
    //       </div>
    //       <p className="flex items-center gap-x-5">
    //         <FaPhoneAlt />
    //        +57 317 029 9336
    //       </p>
    //     </div>

    //     <address className="flex flex-col items-center lg:flex-row justify-around text-gray-500 text-center">
    //       <h2 className="">
    //         &copy; Copyright 2024 Art Street - Todos los derechos reservados
    //       </h2>
    //       <ul className="text-sm font-medium">
    //         <li>Desarrollado por Building Projects</li>
    //       </ul>
    //     </address>
    //   </MaxWidthWrapper>
    // </footer>
  );
}

export default Footer;

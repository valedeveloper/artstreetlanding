'use client'
import { scrollToSection } from "@/utilities/scrollToSection";
import Link from "next/link";
import React from "react";
function BannerWaitList() {
  return (
    <Link href={"/"}>
      <p onClick={()=>scrollToSection("wait-list")} className=" text-md text-center  bg-primaryYelow p-1 w-full hover:bg-yellow-500">
        Estamos desarrollando un producto increíble ¡Click para ingresar a la
        lista de espera!
      </p>
    </Link>
  );
}

export default BannerWaitList;

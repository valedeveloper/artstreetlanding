import React from "react";
import { PageProps } from "../../../../types/types";
import Image from "next/image";
import VerifyEmail from "@/components/VerifyEmail";

function VerifyEmailPage({ searchParams }: PageProps) {
  const token = searchParams.token;
  const toEmail = searchParams.sentToEmail;
  return (
    <div className=" bg-black h-screen  flex flex-col items-center justify-center lg:px-0">
      <div className=" sm:w-[350px]"></div>
      {token && typeof token === "string" ? (
        <VerifyEmail token={token} />
      ) : (
        <div className=" flex items-center flex-col gap-5 p-10  ">
          <Image
            src={"/assets/images/enviar-datos.png"}
            alt="Enviar correo"
            width={120}
            height={120}
          />
          <h1 className=" text-primaryGray text-2xl font-bold">
            Revisa tu correo electrónico
          </h1>
          <p className=" text-primaryGray text-center text-lg">
            Ya casi terminas. Enviamos un correo electrónico
            <span>{` ${toEmail ?? ""}`}</span> con un enlace para activar tu
            cuenta. Consulta tu correo electrónico y haz clic en el enlace de
            activación.
          </p>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;

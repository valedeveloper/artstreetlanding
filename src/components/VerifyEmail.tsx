"use client";
import { trpc } from "@/trpc/client";
import React from "react";
import { VerifyEmailProps } from "../../types/types";
import Image from "next/image";
import Link from "next/link";
import CallToAction from "./CallToAction";
import Spiner from "./Spinner/Spiner";
// import { XCircle } from "lucide-react";

function VerifyEmail({ token }: VerifyEmailProps) {
  const { data, isError, isLoading } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className=" flex flex-col items-center gap-5">
        <Image
          src={"/assets/images/boton-eliminar.png"}
          alt="Correo verificado"
          width={50}
          height={50}
        />
        <p className=" text-primaryGray text-muted-foregrund text-sm">
          No es válido este token. Intente de nuevo.
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className=" flex h-full flex-col items-center justify-center gap-5">
        <Image
          src={"/assets/images/chequeo.png"}
          alt="Correo verificado"
          width={80}
          height={80}
        />
        <h3 className=" text-primaryGray font-semibold text-2xl">
          ¡Todo está listo!
        </h3>
        <p className="  text-primaryGray text-mutted-foreground text-center mt-1">
          Gracias por verificar tu correo.{" "}
        </p>
        <CallToAction
          href="/signin"
          title="Inicia Sesión"
          className=" bg-primaryYelow text-white w-full"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className=" flex flex-col items-center gap-2">
        <Spiner />
        <h3>Verificando ... </h3>
        <p className=" text-primaryGray text-muted-foregrund text-sm">
          No tardará mucho, espera un momento
        </p>
      </div>
    );
  }
}

export default VerifyEmail;

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "../../../lib/validators/credentialsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function PageSignUp(): JSX.Element {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter();

  const { mutate, isLoading, isSuccess } =
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          toast.error("Este correo ya está en uso. ");
          return;
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message);
          return;
        }
        toast.error("Algo salió mal, por favor intente de nuevo");
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(`Verificación de correo enviado a ${sentToEmail}  `);
        router.push("verify-email?to=" + sentToEmail);
      },
    });
  const onSubmit = async ({
    name,
    lastName,
    // phone,
    email,
    password,
  }: TAuthCredentialsValidator) => {
    if (!acceptTerms) {
      return toast.error("Debe aceptar los términos de uso");
    }

    await mutate({ name, lastName, email, password });
    reset();
  };

  return (
    <div className="bg-primaryBlack h-screen py-5 px-10 text-white flex flex-col gap-y-10 items-center">
      <h1 className="text-2xl border-b-1 border-white self-start w-full py-2 ">
        Crear cuenta
      </h1>
      <div className="container relative flex flex-col items-center justify-center gap-y-5 lg:w-[750px]">
        <p className=" text-primaryGray">
          Al crear una cuenta, puedes recibir boletines informativos o
          promociones.
        </p>
        <form
          className=" mx-auto w-full flex flex-col gap-y-6 items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="relative w-full">
            <input
              className="inputs"
              required
              type="text"
              {...register("name")}
            />
            <label htmlFor="name" className="labelInput">
              Nombre
            </label>
          </div>
          <div className="relative w-full">
            <input
              className="inputs"
              type="text"
              required
              {...register("lastName")}
            />
            <label htmlFor="lastName" className="labelInput">
              Apellido
            </label>
          </div>
          {/* <input
            placeholder="Celular"
            className=" p-4 border-1 border-white w-full bg-transparent "
            {...register("phone")}
          /> */}
          {/* {errors?.phone?.message && (
            <p className=" self-start text-sm text-red-500">
              {errors.phone.message}
            </p>
          )} */}

          <div className="relative w-full">
            <input
              className="inputs"
              {...register("email")}
              type="email"
              required
            />
            <label htmlFor="email" className="labelInput">
              Correo electrónico
            </label>
            {errors?.email?.message && (
              <p className="self-start text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative w-full">
            <input
              className="inputs"
              {...register("password")}
              type="password"
              required
            />
            <label htmlFor="password" className="labelInput">
              Contraseña
            </label>
            {errors?.password?.message && (
              <p className="self-start text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className=" button-call p-3 bg-primaryYelow text-black w-full lg:w-max hover:bg-yellow-500">
            Crear cuenta
          </button>
        </form>

        <p className="text-center">
          Este sitio está protegido por reCaPTCHA y aplican las{" "}
          <Link href={"/"} className="links">
            Política de privacidad
          </Link>{" "}
          y los{" "}
          <Link href={"/"} className="links">
            Términos de servicio
          </Link>{" "}
          de Google.
        </p>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 text-primaryYelow bg-primaryYelow border-primaryYelow rounded focus:ring-primaryYelow focus:ring-offset-gray-800 focus:ring-2 dark:bg-primaryYelow dark:border-bgPrimaryYelow checked:bg-primaryYelow"
          />
          <label
            htmlFor="acceptTerms"
            className="ms-2 text-sm font-medium text-white dark:text-gray-300"
          >
            Aceptar Términos y Condiciones
          </label>
        </div>

        <p>
          ¿Ya tienes cuenta{" "}
          <Link href={"/signin"} className="links">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
export default PageSignUp;

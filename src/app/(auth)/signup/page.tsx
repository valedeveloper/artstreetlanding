"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "../../../lib/credentialsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import {toast} from 'sonner'
function PageSignUp(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const router = useRouter()

  const { mutate, isLoading, isSuccess } =
    trpc.auth.createPayloadUser.useMutation({
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          toast.error(
            "Este correo ya está en uso. "
          )
          return
        }

        if (err instanceof ZodError) {
          toast.error(err.issues[0].message)
          return
        }
        toast.error('Algo salió mal, Por favor intente de nuevo')
      },
      onSuccess: ({ sentToEmail }) => {
        toast.success(`Verification email sent to ${sentToEmail}  `)
        router.push('verify-email?to=' + sentToEmail)
      }
    });
  const onSubmit = ({
    name,
    lastName,
    email,
    password,
  }: TAuthCredentialsValidator) => {
    console.log("Submit");
    mutate({ name, lastName, email, password });
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
          {/* <input
            placeholder="Teléfono"
            className=" p-4 border-1 border-white w-full bg-transparent "
            {...register("phone")}
            

          />    */}
          <input
            placeholder="Nombre"
            className="p-4 border-1 border-white w-full bg-transparent"
            required
            type="text"
            {...register("name")}
          />
          <input
            placeholder="Apellido"
            className=" p-4 border-1 border-white w-full bg-transparent "
            type="text"
            required
            {...register("lastName")}
          />

          <input
            placeholder="Correo electrónico"
            className=" p-4 border-1 border-white w-full bg-transparent "
            {...register("email")}
            type="email"
            required
          />
          {
            errors?.email?.message && (
              <p className=" self-start text-sm text-red-500">{errors.email.message}</p>
            )
          }
          <input
            placeholder="Constraseña"
            className={
              "p-4 border-1 border-white w-full bg-transparent " +
              (errors.email ? " focus-visible:ring-red-500" : null)
            }
            {...register("password")}
            type="password"

            required
          />
          {
            errors?.password?.message && (
              <p className=" self-start  text-sm text-red-500">{errors.password.message}</p>
            )
          }
          {/* <CallToAction
            title=" Crear cuenta "
            className=" bg-primaryYelow text-black w-full lg:w-max hover:bg-yellow-500"
          />   */}

          <button className=" button-call bg-primaryYelow text-black w-full lg:w-max hover:bg-yellow-500">
            Crear cuenta
          </button>
        </form>
        <p>
          ¿Ya tienes cuenta{" "}
          <Link href={"/signin"} className="links">
            Inicia sesión
          </Link>
        </p>
        {
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
        }
      </div>
    </div>
  );
}
export default PageSignUp;

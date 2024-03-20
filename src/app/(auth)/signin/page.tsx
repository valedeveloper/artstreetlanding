"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  AuthCredentialsLogin,
  TAuthCredentialsLogin,
} from "../../../lib/credentialsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import CallToAction from "@/components/CallToAction";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
function PageSignIn(): JSX.Element {
  const searchParamas = useSearchParams();
  const router = useRouter();
  const isSeller = searchParamas.get("as") === "seller";
  const origin = searchParamas.get("origin");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsLogin>({
    resolver: zodResolver(AuthCredentialsLogin),
  });

  const {
    mutate: signInUser,
    isLoading,
    isSuccess,
  } = trpc.auth.signInUser.useMutation({
    onSuccess: () => {
      toast.success(`Logueado con éxito`);
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return
      }
      if (isSeller) {
        router.push(`/sell`);
        return
      }
      router.push("/")
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Correo o contraseña inválida  ");
        return;
      }
      if (err instanceof ZodError) {
        toast.error(err.issues[0].message);
        return;
      }
      toast.error("Algo salió mal, Por favor intente de nuevo");
    },
  });
  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsLogin) => {
    console.log("Submit");
    signInUser({ email, password });
  };

  const continueAsSeller = () => {
    router.push("?as=seller")
    console.log("Seller");

  }
  const continueAsBuyer = () => {
    router.replace("/signin", undefined)
    console.log("Buyer");

  }
  return (
    <div className="bg-primaryBlack h-screen py-5 px-10 text-white flex flex-col gap-y-10 items-center">
      <h1 className="text-2xl border-b-1 border-white self-start w-full py-2 ">
        Ingresar a la cuenta {isSeller ? "vendedor" : ""}
      </h1>
      <div className="container relative flex flex-col items-center justify-center gap-y-5 lg:w-[750px]">
        <form
          className=" mx-auto w-full flex flex-col gap-y-6 items-center "
          onSubmit={handleSubmit(onSubmit)}
        >

          <input
            placeholder="Correo electrónico"
            className=" p-4 border-1 border-white w-full bg-transparent "
            {...register("email")}
            type="email"
            required
          />
          {errors?.email?.message && (
            <p className=" self-start text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
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
          {errors?.password?.message && (
            <p className=" self-start  text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          <button className=" button-call bg-primaryYelow text-black w-full lg:w-max hover:bg-yellow-500">
            Ingresar
          </button>
        </form>
        <div className=" w-full relative">
          <div className=" absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground"> or </span>
          </div>
        </div>
        {
          isSeller ? (
            <button className=" p-3 rounded-full bg-transparent border-2 border-primaryYelow text-primaryYelow w-full lg:w-max  md:w-max hover:bg-primaryYelow hover:text-black   " onClick={continueAsBuyer}>Continúe como comprador</button>
          ) : (
            <button className="  p-3 rounded-full bg-transparent border-2 border-primaryYelow text-primaryYelow w-full lg:w-max  md:w-max hover:bg-primaryYelow hover:text-black   " onClick={continueAsSeller}>Continúe como vendedor</button>

          )
        }

        <p>
          ¿No tiene cuenta?
          <Link href={"/signup"} className="links">
            Crear Cuenta
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
export default PageSignIn;

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  AuthCredentialsLogin,
  TAuthCredentialsLogin,
} from "../../../lib/validators/credentialsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
function PageSignIn(): JSX.Element {
  const searchParamas = useSearchParams();
  const router = useRouter();
  const origin = searchParamas.get("origin");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TAuthCredentialsLogin>({
    resolver: zodResolver(AuthCredentialsLogin),
  });

  const {
    mutate: signInUser,
    isLoading,
    isSuccess,
  } = trpc.auth.signInUser.useMutation({
    onSuccess: () => {
      toast.success(`Ha ingresado a su cuenta con éxito`);
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      router.push("/");
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
  const onSubmit = async ({ email, password }: TAuthCredentialsLogin) => {
    console.log("Submit");
    await signInUser({ email, password });
    reset()
  };

  return (
    <div className="bg-primaryBlack h-screen py-5 px-10 text-white flex flex-col gap-y-10 items-center">
      <h1 className="text-2xl border-b-1 border-white self-start w-full py-2 ">
        Ingresa a la cuenta
      </h1>
      <div className="container relative flex flex-col items-center justify-center gap-y-5 lg:w-[750px]">
        <form
          className=" mx-auto w-full flex flex-col gap-y-6 items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* <input
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
            Ingresar
          </button>
        </form>

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

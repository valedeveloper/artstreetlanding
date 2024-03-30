import React from "react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import CallToAction from "../../components/CallToAction";
import { trpc } from "@/trpc/client";
import { useForm } from "react-hook-form";
import {
  EmailCredential,
  TEmailCredential,
} from "@/lib/validators/credentialsValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ZodError } from "zod";

function WaitScreen(): JSX.Element {
  const { mutate, isSuccess, isLoading } =
    trpc.auth.createEmailWaitList.useMutation({
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
        toast.success(`Correo enviado a ${sentToEmail}  `);
      },
    });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TEmailCredential>({
    resolver: zodResolver(EmailCredential),
  });
  const onSubmit = async ({ email }: TEmailCredential) => {
    console.log(email);
    await mutate({ email });
    reset();
  };
  return (
    <div
      className=" p-20 text-center flex flex-col gap-5 items-center "
      id="wait-list"
    >
      {isLoading ? toast.warning("Espere un momento") : null}
      <div className=" flex flex-col justify-center items-center  gap-y-5   ">
        <h1 className="title ">Lista de Espera</h1>
        <p className="text-primaryGray  text-xl max-w-prose  text-muted-foreground">
          ¡Te avisaremos cuando la aplicación esté lista para usar!
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-8  w-full px-5 lg:flex-row "
        >
          {/* <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-transparent focus:border-primaryBlack transition duration-300" placeholder="Ingrese su correo electrónico" type="email" required /> */}
          {/* <input className="w-full px-2 py-3 rounded-md outline-none border-1 border-primaryBlack lg:w-1/2 p-4 " placeholder="Ingrese su correo electrónico" type="email" required /> */}
          <div className="relative w-full">
            <input
              type="email"
              id="email"
              {...register("email")}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black  focus:text-black"
            />
            <label
              htmlFor="email"
              className="absolute top-0 left-4 -mt-2 px-1 text-xs text-gray-600 bg-white"
            >
              Correo electrónico
            </label>
            {errors?.email?.message && (
              <p className=" self-start text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <CallToAction
            title="Unirme"
            className=" bg-primaryYelow w-full hover:bg-yellow-500  lg:w-max p-4"
          />
        </form>
      </div>
    </div>
  );
}

export default WaitScreen;

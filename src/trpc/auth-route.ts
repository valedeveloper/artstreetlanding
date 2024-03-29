import {
  AuthCredentialsLogin,
  AuthCredentialsValidator,
  EmailCredential,
} from "../lib/validators/credentialsValidator";
import { publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../getPayloadClient";
import { sendWaitlistEmail } from "../waitListMail";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { name, lastName, email, password } = input;
      const payload = await getPayloadClient();

      const { docs: users } = await payload.find({
        collection: "users",
        overrideAccess: false,
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length !== 0) throw new TRPCError({ code: "CONFLICT" });
      await payload.create({
        collection: "users",
        data: {
          name,
          lastName,
          // phone,
          email,
          password,
          role: "user",
        },
      });
      return {
        success: true,
        sentToEmail: email,
      };
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const isVerified = await payload.verifyEmail({
        collection: "users",
        token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return {
        success: true,
      };
    }),

  signInUser: publicProcedure
    .input(AuthCredentialsLogin)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      try {
        await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return {
          success: true,
        };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
    }),

    createEmailWaitList: publicProcedure
    .input(EmailCredential)
    .mutation(async ({ input }) => {
      console.log("Inicio de la función createEmailWaitList");

      const { email } = input;
      console.log("Email recibido:", email);
      
      const payload = await getPayloadClient();
      console.log("Cliente de payload obtenido");
      
      // Verificar si el correo ya está en la lista de espera
      const { docs: waitlistEntries } = await payload.find({
        collection: "waitlist",
        where: {
          email: {
            equals: email,
          },
        },
      });
      console.log("Lista de espera verificada");
      
      console.log("Enviar correo electrónico");
      await sendWaitlistEmail(email);
      console.log("Correo electrónico enviado");
      
      if (waitlistEntries.length !== 0) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      
      console.log("Momento de crear entrada en la lista de espera");
      
      // Agregar el correo electrónico a la lista de espera
      await payload.create({
        collection: "waitlist",
        data: {
          email,
        },
      });
      
      console.log("Entrada en la lista de espera creada correctamente");
      
      // Enviar correo electrónico de confirmación
      console.log("Correo de confirmación enviado");
      
      console.log("Fin de la función createEmailWaitList");
  
      return {
        success: true,
        sentToEmail: email,
      };
    }),
});

import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  name: z.string(),
  lastName: z.string(),
  // phone: z.number(), // Asegura que el número de teléfono consista en exactamente 10 dígitos
  email: z.string().email(),
  password: z.string().min(8, {
    message: "La contraseña debe tener más de 8 caracteres",
  }),
});
export const AuthCredentialsLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "La contraseña debe tener más de 8 caracteres",
  }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
export type TAuthCredentialsLogin = z.infer<
  typeof AuthCredentialsLogin
>;
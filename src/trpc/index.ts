import { authRouter } from "./auth-route";
import { router } from "./trpc";

//Aquí utilizo ese outer que inicialicé en el trpc y exporto un typo que va  a seleccionar los tipos que devuelva el app router
export const appRouter = router({
    auth: authRouter
})
export type AppRouter = typeof appRouter
import { ExpressContext } from "@/server"
import { initTRPC } from "@trpc/server"



//Aquí creo todas las configuraciones necesarias para inicializar las funciones.
//inicializar un servidor trpc. Esta variable tiene todas las configuraciones necesarias
const t=initTRPC.context<ExpressContext>().create()
//El router se utiliza ara manejar las definiciones d elas rutas y procedimientos rpc
export const router=t.router
//ontiene las definiciones de los procedimientos RPC públicos que están disponibles para ser llamados desde el cliente
export const publicProcedure=t.procedure
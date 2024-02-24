import dotenv from "dotenv"; //Para cargar variables de entorno
import path from "path"; //Módulo de node js para manipular rutas de archivos
import payload from "payload";
import { Args } from "../types/types";
dotenv.config({
  path: path.resolve(__dirname, "../.env"), //El __diname se utiliza para traer la ruta del archiv actual
});

//El objeto payload es algo que yo creo. La palabra cached significa "almacenado en caché
//Aquí valido que hay allgo en cache, ya que vvoy acceder desde el objeto global al payload. Este últimoes algo que yo creo y se vallida que exista, de lo contrario lo creo yo
let cached = (global as any).payload; //e cached está trayendo el objeto payload del objeto global. Se usa any para evitar errores de tipo, lo que quiere decir que puede ser lo que sea

// se valida que esté, en caso que no lo inicializo
//Si da undefine o false es porque todavía no se ha inicializado es payload. Aquí voy a crearlo.
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

export const getPayloadClient = async ({ initialOptions }: Args = {}) => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("OMGGG, no está el PROCESSENVSECRET");
  }
  if (cached.client) {
    return cached.client;
  }

  //Secret el valor que espera como secreto su configuración.
  //El local es una bandera que indica si a configuració es local o no
  //Lo otr trae todos lo initialOptions, si es null o undefined, será un objeto vacío
  if (!cached.promise) {
    return (cached.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET,
      local: initialOptions?.express ? false : true,
      ...(initialOptions || {}),
    }));
  }
  try {
    cached.client = await cached.promise;
  } catch (error: unknown) {
    cached.promise = null;
    throw error;
  }
  return cached.client;
};

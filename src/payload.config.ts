import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";

//El payload sirve para la parte de admin
export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "", // Es la url base del servidor de la app
    collections: [],
    routes: {
        admin: "/sell", //En esta ruta está la interfaz de administración, es decir, donde se pueden gestionar la bd o config de la app
    },
    admin: {
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "- Art Street", //El título que aparecerá en cada sitio de la página
            favicon: "/artstreet.ico", //Pequeño icono que aparece en el sitio web
            ogImage: "/LogoArtStreetTransparente.png",
        },
    },
    rateLimit: {
        max: 200, //Límite de configuración de velocidad de la aplicación.
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
});
// Ctrl/k/u

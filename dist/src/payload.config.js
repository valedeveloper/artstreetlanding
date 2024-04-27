"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var config_1 = require("payload/config");
var Users_1 = require("./collections/Users");
var Products_1 = require("./collections/Products");
var Media_1 = require("./collections/Media");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var ProductFile_1 = require("./collections/ProductFile");
var Orders_1 = require("./collections/Orders");
var WaitList_1 = require("./collections/WaitList");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, "../.env"),
});
//El payload sirve para la parte de admin
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "", // Es la url base del servidor de la app
    collections: [Users_1.Users, Products_1.Products, Media_1.Media, ProductFile_1.ProductFile, Orders_1.Orders, WaitList_1.Waitlist],
    routes: {
        admin: "/sell", //En esta ruta está la interfaz de administración, es decir, donde se pueden gestionar la bd o config de la app
    },
    admin: {
        user: "users",
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: "- Art Street", //El título que aparecerá en cada sitio de la página
            favicon: "/favicon.ico", //Pequeño icono que aparece en el sitio web
            ogImage: "/LogoArtStreetTransparente.png",
        },
    },
    rateLimit: {
        max: 200, //Límite de configuración de velocidad de la aplicación.
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL,
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, "payload-types.ts"),
    },
});
// Ctrl/k/u

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailCredential = exports.AuthCredentialsLogin = exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    name: zod_1.z.string(),
    lastName: zod_1.z.string(),
    //  phone: z.number(), // Asegura que el número de teléfono consista en exactamente 10 dígitos
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, {
        message: "La contraseña debe tener más de 8 caracteres",
    }),
});
exports.AuthCredentialsLogin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, {
        message: "La contraseña debe tener más de 8 caracteres",
    }),
});
exports.EmailCredential = zod_1.z.object({
    email: zod_1.z.string().email(),
});

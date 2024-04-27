"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var yourOwn = function (_a) {
    var user = _a.req.user;
    if (user.role === 'user')
        return true;
    return {
        user: {
            equals: user === null || user === void 0 ? void 0 : user.id,
        },
    };
};
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<p>Hola:\n          Gracias por crear una cuenta con nosotros. Haz clic en el siguiente enlace para activar tu cuenta y configurar una contrase\u00F1a.\n\n          <a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "' >Verifica tu correo </a>\n\n          Una vez que crees una cuenta, podr\u00E1s pagar m\u00E1s r\u00E1pido con tu informaci\u00F3n guardada, ver tu perfil, reservas y pedidos.\n          Si no creaste una cuenta con nosotros, no tomes en cuenta este correo electr\u00F3nico.\n          \n          Gracias, ArtStreet\n        </p>\n        \n        \n        ");
                // return `<div>
                //   <img src="/assets/enviar-datos.png"/>
                //   <h1>Revisa tu correo electrónico</h1>
                //   <p>Ya casi terminas. Enviamos un correo electrónico con un enlace para activar tu cuenta. Consulta tu correo electrónico y haz clic en el enlace de activación.</p>
                // </div>`;
            },
        },
    },
    access: {
        create: function (_a) {
            var req = _a.req;
            return req.user.role === "admin";
        },
        update: yourOwn,
        read: function () { return true; },
        delete: function () { return false; }
    },
    fields: [
        {
            name: "name",
            label: "Nombre",
            type: "text",
            required: true,
        },
        {
            name: "lastName",
            label: "Apellido",
            type: "text",
            required: true,
        },
        // {
        //   name: "phone",
        //   label: "Teléfono",
        //   type: "number",
        // },
        {
            name: "role",
            defaultValue: "user",
            required: true,
            type: "select",
            access: {
                update: function (_a) {
                    var req = _a.req;
                    return req.user.role === "admin";
                }
            },
            options: [
                { label: "Administrador", value: "admin" },
                { label: "Vendedor", value: "sell" },
                { label: "Usuario", value: "user" },
            ],
        },
    ],
};

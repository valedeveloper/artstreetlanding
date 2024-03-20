import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return `<p>Hola:
          Gracias por crear una cuenta con nosotros. Haz clic en el siguiente enlace para activar tu cuenta y configurar una contraseña.

          <a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}' >Verifica tu correo </a>

          Una vez que crees una cuenta, podrás pagar más rápido con tu información guardada, ver tu perfil, reservas y pedidos.
          Si no creaste una cuenta con nosotros, no tomes en cuenta este correo electrónico.
          
          Gracias, ArtStreet
        </p>
        
        
        `;
        // return `<div>
        //   <img src="/assets/enviar-datos.png"/>
        //   <h1>Revisa tu correo electrónico</h1>
        //   <p>Ya casi terminas. Enviamos un correo electrónico con un enlace para activar tu cuenta. Consulta tu correo electrónico y haz clic en el enlace de activación.</p>

        // </div>`;
      },
    },
  },
  access: {
    read: () => true,
    create: () => true,
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
    //  {
    //      name: "phone",
    //      label: "Teléfono",
    //      type: "number",
    //      required: true
    //  },

    {
      name: "role",
      defaultValue: "user",
      required: true,
      type: "select",
      // admin: {
      //      condition: ((req) => req.user.role === "admin")
      //     condition:()=>false
      // },
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};

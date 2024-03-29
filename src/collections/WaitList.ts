import { CollectionConfig } from "payload/types";

export const Waitlist: CollectionConfig = {
  slug: "waitlist",
  access: {
    read: () => true,
    create: () => false,
    update:()=>false,
    delete:({req})=>req.user.role==="admin"
  },
  fields: [
    {
      name: "email",
      label: "Correo Electrónico",
      type: "text",
      required: true,
    },
  ],
};

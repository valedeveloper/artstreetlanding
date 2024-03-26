import { filterTypes, products, typesProducts } from "../utilities/optionsList";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    create: ({ req }) => req.user.role === "admin",
    update: ({ req }) => req.user.role === "admin",
    read: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    // {
    //   name: "code",
    //   label: "Referencia",
    //   type: "text",
    //   required: true,
    // },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Detalles del producto",
      type: "textarea",
    },
    {
      name: "price",
      label: "Precio del producto",
      min: 0,
      max: 1000000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      options: filterTypes.map((category) => ({
        label: category,
        value: category,
      })),
      required: true,
    },
     {
       name: "product_files",
       label: "Product file(s)",
       type: "relationship",
       relationTo: "product_files",
       hasMany: false,
       required: true,
     },
    {
      name: "approvedForSale",
      label: "Estado del Producto",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Verificación pendiente", value: "pending" },
        { label: "Aprobado", value: "approved" },
        { label: "Denegado", value: "denied" },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Imagen del Producto",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "image",
        plural: "images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    // {
    //   name: "isOffer",
    //   label: "¿Tiene oferta?",
    //   type: "select",
    //   required: true,
    //   options: [
    //     { label: "SÍ", value: "true" },
    //     { label: "NO", value: "false" },
    //   ],
    // },
  ],
};

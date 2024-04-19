import { filterTypes, products, typesProducts } from "../utilities/optionsList";
import { CollectionConfig } from "payload/types";
import { Product } from "../payload-types";
import { stripe } from "../lib/stripe";
import { BeforeChangeHook } from "payload/dist/collections/config/types";

const addUser: BeforeChangeHook<Product> = async ({
  req,
  data,
}) => {
  const user = req.user

  return { ...data, user: user.id }
}
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  // access: {
  //   create: ({ req }) => req.user.role === "admin",
  //   update: ({ req }) => req.user.role === "admin",
  //   read: ({ req }) => req.user.role === "admin",
  // },
  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === 'create') {
          const data = args.data as Product

          const createdProduct =
            await stripe.products.create({
              name: data.name,
              default_price_data: {
                currency: 'USD',
                unit_amount: Math.round(data.price * 100),
              },
            })

          const updated: Product = {
            ...data,
            stripeId: createdProduct.id,
            priceId: createdProduct.default_price as string,
          }

          return updated
        } else if (args.operation === 'update') {
          const data = args.data as Product

          const updatedProduct =
            await stripe.products.update(data.stripeId!, {
              name: data.name,
              default_price: data.priceId!,
            })

          const updated: Product = {
            ...data,
            stripeId: updatedProduct.id,
            priceId: updatedProduct.default_price as string,
          }

          return updated
        }
      },
    ],
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

    //   name: "sizes", // Nombre del campo de tallas
    //   label: "Tallas", // Etiqueta para mostrar en la interfaz de usuario
    //   type: "c", // Tipo de campo (puede ser checkbox, select múltiple, etc.)
    //   options: [ // Opciones disponibles para las tallas
    //     { label: "S", value: "S" }, // Por ejemplo, tallas S, M, L, etc.
    //     { label: "M", value: "M" },
    //     { label: "L", value: "L" },
    //   ],
    //   required: false, // Hacer que este campo sea opcional
    // },

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

import {  ShoppingCart, Store, User, X } from "lucide-react";


export const itemsMenu = [
  {
    name: "Wait List",
    item: "Wait List",
    href: "/waitlist",
  },
  {
    name: "Store",
    item: <Store />,
    href: "/store",
  },
  {
    name: "Carrito de Compras",
    item: <ShoppingCart />,
    href: "/cart",
  },
  {
    name: "Mi cuenta",
    item: <User />,
    href: "/login",
  },
];

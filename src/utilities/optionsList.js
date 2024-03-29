// import { ShoppingCart, Store, User, X } from "lucide-react";
import React from 'react'
import { FaUser   } from "react-icons/fa";
export const itemsMenu = [
  {
    name:"Lista de Espera",
    item:"Lista de Espera",
    href:"/"
  },
  {
    name: "Store",
    item: "Store",
    href: "/products",
  },

  {
    name: "Mi cuenta",
    item: <FaUser  size={20}/>,
    href: "/signup",
  },
];

export const products = [
  {
    id: 0,
    name: "T-Shirt Art Street",
    category: "T-Shirt",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    offer: 30,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: true,
  },
  {
    id: 1,
    name: "T-Shirt Art Street",
    category: "Mugs",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: false,
  },
  {
    id: 2,
    name: "T-Shirt Art Street",
    category: "Hoodies",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: false,
  },
  {
    id: 3,
    name: "T-Shirt Art Street",
    category: "T-Shirt",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    offer: 50,
    isOffer: true,
  },
  {
    id: 4,
    name: "T-Shirt Art Street",
    category: "Hoodies",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: false,
  },
];

export const typesProducts = products.map((product) => product.category);
export const filterTypes = typesProducts.filter(
  (category, index) => typesProducts.indexOf(category) === index
);
//Cuando existan varios productos de un mismo tipo y solo quiero
//que aparezca uno para los filtros, utilizo el index of con e index. Ya que ppor muchos productos delmismo tipo que existsn solo va atraer el valor de uno solo, el primero que encuetnre
//al hacer la condición con el index, solo va a traer el del primero, los demás lo deshecha

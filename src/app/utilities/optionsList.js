import { ShoppingCart, Store, User, X } from "lucide-react";

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

export const products = [
  {
    id: 0,
    name: "T-Shirt Art Street",
    type: "T-Shirt",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: true,
  },
  {
    id: 1,
    name: "T-Shirt Art Street",
    type: "Mugs",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: false,
  },
  {
    id: 2,
    name: "T-Shirt Art Street",
    type: "Hoodies",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: false,
  },
  {
    id: 3,
    name: "T-Shirt Art Street",
    type: "T-Shirt",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: true,
  },
  {
    id: 4,
    name: "T-Shirt Art Street",
    type: "Hoodies",
    image: "/assets/images/CamisetaArtStreet.jpg",
    price: 45000,
    desc: "T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.",
    isOffer: false,
  },
];

export const typesProducts = products.map((product) => product.type);
export const filterTypes = typesProducts.filter(
  (type, index) => typesProducts.indexOf(type) === index
);
//Cuando existan varios productos de un mismo tipo y solo quiero
//que aparezca uno para los filtros, utilizo el index of con e index. Ya que ppor muchos productos delmismo tipo que existsn solo va atraer el valor de uno solo, el primero que encuetnre
//al hacer la condición con el index, solo va a traer el del primero, los demás lo deshecha

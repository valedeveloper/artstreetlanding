// import { LucideIcon } from "lucide-react";
import { TQueryValidator } from "@/lib/validators/queryValidator";
import { Product, User } from "@/payload-types";
import { InitOptions } from "payload/config";
import { MouseEventHandler, ReactNode } from "react";
import { IncomingMessage } from "http";
import { inferAsyncReturnType } from "@trpc/server";
export interface MenuItem {
  name?: string;
  item: string | ReactNode;
  href: string;
  onClick?: () => void;
}
// export interface Product {
//   product: {
//     id: number;
//     name: string;
//     category: string;
//     image: string;
//     price: number;
//     offer?: number;
//     desc: string;
//     isOffer?: boolean;
//   };
// }
export interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

export interface ProductListing {
  product: Product | null;
  index: number;
}
export interface ImageSlider {
  urls: string[];
}

export interface PropsCallAction {
  href?: string;
  title: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
export interface ImageSliderProps {
  urls: string[];
}

export interface WidthWrapper {
  children: ReactNode;
  className?: string;
}
export interface PropsChildren {
  children: ReactNode;
}

export interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export interface ProductDetails {
  params: {
    productId: string;
  };
}

export interface VerifyEmailProps {
  token: string;
}
//El partial hace referencia a que se va a deefinir un tipo que tiene
//las misma propiedades de lo que se pasará en medio de los <>, pero todas esas propiedades serán opcionales
//Es decir, en este caso se va a coger todas las propiedades de InitOptions, pero puedo usar una, varios o quizá ninguna.
//El partial lo que quiere decir es que se accederá a todas las propiedades del InititOptions, pero serán opcionales.
export interface Args {
  initialOptions?: Partial<InitOptions>;
}

export interface CartItem {
  product: Product;
};
export interface CartState {
  items: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
};
export interface CartProduct {
  product: Product
};

export type ProductsCheckOut = {
  items: CartItem[],
  removeItem: (id:string) => void
}

export interface PaymentStatusProps {
  orderEmail: string
  orderId: string
  isPaid: boolean
}

export interface ReceiptEmailProps {
  email: string
  date: Date
  orderId: string
  products: Product[]
}

export interface NavItemsProps{
  user: User | null
}


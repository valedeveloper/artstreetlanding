// import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { IoClose } from "react-icons/io5";
import { formatPrice } from "../../utilities/utils";
import { getPriceProductsInCart } from "../../utilities/getPriceProductsInCart";
import CallToAction from "../CallToAction";
import CartItem from "./CartItem";
import Link from "next/link";

interface CartProps {
  onCloseCart: () => void;
}

function Cart({ onCloseCart }: CartProps): JSX.Element {
  const { items } = useCart();
  const fee = 1
  const quantityItems = items.length;
  const subtotalCart = getPriceProductsInCart(items);

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className=" absolute inset-0 bg-gray-200 opacity-50 backdrop-blur-lg"></div>
      <div className="  justify-center z-50 fixed top-0  right-0 h-full bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg flex items-center w-full lg:absolute lg:flex lg:flex-col lg:items-center lg:p-5 lg:z-30 lg:right-0 lg:top-0 lg:h-full lg:overflow-y-auto lg:w-1/4">
        <IoClose
          className=" self-start right-5 absolute top-5  item-hover"
          size={30}
          onClick={onCloseCart}
        />
        <div className="flex flex-col gap-y-5 items-start h-screen">
          <h1 className="text-center font-bold text-xl   p-10 ">
            Carrito de Compras ({quantityItems})
          </h1>
          {quantityItems !== 0 ? (
            <>
              <h3>Productos:</h3>
              <ul className=" space-y-2 text-sm w-full">
                {items.map(({ product }, i) => (
                  <CartItem product={product} key={i} />
                ))}
                <div className="flex ">
                  <span className="flex-1">Shopping</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex ">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(subtotalCart)}</span>
                </div>
              </ul>
              <button onClick={onCloseCart} className='  button-call bg-primaryYelow  hover:bg-yellow-500  p-3 w-full'> <Link href={"/cart"}>Ver Pedido</Link></button>
            
            </>
          ) : (
            <div className=" flex h-full flex-col items-center gap-y-5 w-full">
              <p>No tiene productos en su carrito :(</p>
              <CallToAction
                title="Compra Ahora"
                className=" bg-primaryYelow w-full hover:bg-yellow-400 p-3"
                href="/products"
                onClick={onCloseCart}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cart;

"use client";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";
import { getPriceProductsInCart } from "@/utilities/getPriceProductsInCart";
import { formatPrice } from "../../utilities/utils";
import { trpc } from "@/trpc/client";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import ProductsInCheckout from "@/components/ProductsInCheckout";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      },
      onError: (error) => {
        if (error.message === "UNAUTHORIZED") {
          setTimeout(() => {
            toast.error("Para hacer su pedido, ingrese a su cuenta")
            router.push("/signin")
          }, 1000)
        }
      }
    });
  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = getPriceProductsInCart(items);

  const fee = 1;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tu Carrito de Compras
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={`lg:col-span-7 ${isMounted && items.length === 0
              ? "rounded-lg border-2 border-dashed border-zinc-200 p-12"
              : ""
              }`}
          >
            <h2 className="sr-only">Productos en tu carrito de compras</h2>

            {isMounted && items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-50 w-50 text-muted-foreground bg-black'>
                  <Image
                    src='/assets/images/artstreet-2.jpg'
                    width={300}
                    height={500}
                    loading='eager'
                    alt='empty shopping cart art-street'
                  />
                </div>
                <h3 className="font-semibold text-2xl">
                  Tu carrito de compras está vacío
                </h3>
                <p className="text-muted-foreground text-center">
                  Whoops! No hay nada para mostrarte.
                </p>
                <Link className=" text-primaryYelow p-3  " href="/products">
                  Comprar Ahora
                </Link>
              </div>
            ) : null}

            <ul
              className={
                isMounted && items.length > 0
                  ? "divide-y divide-gray-200 border-b border-t border-gray-200"
                  : ""
              }
            >
              {isMounted && (
                <ProductsInCheckout items={items} removeItem={removeItem} />
              )}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Resumen de la Orden</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <LuLoader className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Valor del Envio</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <LuLoader className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Total de la Orden
                </div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <LuLoader className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                disabled={items.length === 0 || isLoading}
                onClick={() => createCheckoutSession({ productIds })}
                className=" disabled:bg-yellow-200 disabled:text-gray-500   button-call bg-primaryYelow  hover:bg-yellow-500  p-3 w-full"
              >
                Comprar
              </button>
              {isLoading ? (
                <LuLoader className="w-4 h-4 animate-spin mr-1.5" />
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

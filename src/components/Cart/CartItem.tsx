import { useCart } from "@/hooks/useCart";
import { Product } from "@/payload-types";
import { formatPrice } from "@/utilities/utils";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

function CartItem({ product }: { product: Product }) {
  const { removeItem } = useCart();
  const { image } = product.images[0];
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                priority
                style={{ width: "100%", height: "100%" }}
                loading="eager"
                width={500}
                height={500}
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                {/* <ImageIcon
                      aria-hidden='true'
                      className='h-4 w-4 text-muted-foreground'
                    /> */}
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.category}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5 text-red-600"
              >
                <IoClose className="w-3 h-4" />
                Eliminar del Carrito
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

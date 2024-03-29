"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/payload-types";
import { CartProduct } from "../../../types/types";
import { toast } from "sonner";

const AddToCartButton = ({ product }: CartProduct) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Producto Agregado al Carrito");
    }
  }, [isSuccess]);
  return (
    <button
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      className="button-call bg-primaryYelow w-full hover:bg-yellow-500  lg:w-max p-3"
    >
      {isSuccess ? "Agregado" : "Añadir al Carrito"}
    </button>
  );
};

export default AddToCartButton;

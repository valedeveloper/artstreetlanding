'use client'
import React from "react";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";
import { filterTypes, products } from "../../utilities/optionsList";
import Image from "next/image";
import ProductReel from "../../components/ProductReel";

function ProductsPage(): JSX.Element {
  return (
    <section className="border border-gray-200 bg-gray-80 my-12 ">
      <MaxWidthWrapper className="py-20 flex flex-col lg:flex-row gap-10">

      
        {/* Left Bar */}
        <div className="lg:w-1/4 lg:flex-none">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-secondaryYelow">
              Categorias
            </h2>
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <ul className=" flex gap-2 p-2 lg:flex-col  justify-center ">
              {filterTypes.map((type) => (
                <li
                  key={type}
                  className="cursor-pointer  bg-gray-300 p-2 rounded-full hover:text-primaryYelow"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Product List */}

        <ProductReel title="Nuevos Lanzamientos"
          subtitle="Disfruta de las nuevas camisetas para tus presentaciones con Art Street"
          query={{
            sort: "desc", limit: 4
          }} />

      </MaxWidthWrapper>
    </section>
  );
}

export default ProductsPage;
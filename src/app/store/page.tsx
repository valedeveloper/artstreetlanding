import React from "react";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import { filterTypes, products } from "../utilities/optionsList";
import Image from "next/image";

function StorePage(): JSX.Element {
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
            <ul className="mt-4 flex flex-col gap-2">
              {filterTypes.map((type) => (
                <li
                  key={type}
                  className="cursor-pointer text-black hover:text-primaryYelow"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Product List */}

        <ul className="lg:w-3/4 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0 ">
          {products.map((product) => {
            const productWithOffer =
              product.offer !== undefined
                ? product.price - (product.offer * product.price) / 100
                : undefined;
            return (
              <div
                key={product.id}
                className="text-center md:flex md:items-center md:text-left lg:block lg:text-center shadow-xl p-5 relative rounded-xl"
              >
                {product.isOffer && (
                  <button className="absolute top-5 left-2  bg-primaryYelow   px-3 py-1 rounded-xl">
                    {`${product.offer}%`}
                  </button>
                )}

                <div className=" md:flex-shrink-0 flex justify-center">
                  <Image
                    width={300}
                    height={300}
                    src={product.image}
                    alt={product.desc}
                  />
                </div>
                <div className="mt-6 ms:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className=" text-base font-medium text-gray-900">
                    {product.name}
                  </h3>
                  {productWithOffer  ? (
                    <div className="flex items-center gap-x-5">
                      <p className=" mt-3 text-sm text-muted-foreground text-left">
                        {`$ ${productWithOffer}`}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground text-left">
                        <span
                          style={{ color: "#808080", textDecoration: "none" }}
                        ></span>
                        <span
                          style={{
                            color: "#808080",
                            textDecoration: "line-through",
                          }}
                        >
                          {`$ ${product.price}`}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className=" mt-3 text-sm text-muted-foreground text-left">
                      {`$ ${product.price}`}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </MaxWidthWrapper>
    </section>
  );
}

export default StorePage;

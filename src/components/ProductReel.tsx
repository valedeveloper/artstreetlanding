import React from "react";
import { trpc } from "@/trpc/client";
import { ProductReelProps } from "../../types/types";
import { GrFormNextLink } from "react-icons/gr";
import { Product } from "@/payload-types";
import Link from "next/link";
import ProductListing from "./ProductListing";

const FALLBACK_LIMIT = 4;
function ProductReel({ title, subtitle, href, query }: ProductReelProps) {
  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);
  let mapProducts: (Product | null)[] = [];
  if (products && products.length) {
    mapProducts = products;
  } else if (isLoading) {
    mapProducts = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }
  return (
    <section className=" p-12 w-full h-full ">
      <div className="md:flex md:items-center md:justify-between mb-4 ">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl ">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        
        {href ? (
          <Link
            href={href}
            className='hidden text-md font-medium  hover:text-yelow-800 md:block'>
            Compra Aquí{' '}
            <span aria-hidden='true'>&rarr;</span>
          </Link>
        ) : null}


      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center ">
            {mapProducts.map((product, i) => (
              <ProductListing key={i} product={product} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductReel;

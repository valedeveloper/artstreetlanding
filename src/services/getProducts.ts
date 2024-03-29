import { trpc } from "@/trpc/client";
import { TQueryValidator } from "@/lib/validators/queryValidator";
import { Product } from "@/payload-types";
import { getPayloadClient } from "@/getPayloadClient";
import { notFound } from "next/navigation";
import { ProductDetails } from "../../types/types";
const FALLBACK_LIMIT = 4;
export const getProductsStore = async (query: TQueryValidator) => {

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
    return mapProducts
}

export const getProductId=async(params:ProductDetails)=>{
    const payload = await getPayloadClient();
    //Trata esto como products
    const { docs: products } = await payload.find({
      collection: "products",
      limit: 1,
      where: {
        id: {
          equals: params.productId,
        },
        approvedForSale: {
          equals: "approved",
        },
      },
    });
    //Saco e product de products
    const [product] = products;
    if (!product) return notFound();
}
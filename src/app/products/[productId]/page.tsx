import { FaFacebook, FaWhatsapp, FaCopy, FaCheck } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { IoShieldOutline } from "react-icons/io5";
import { getPayloadClient } from "@/getPayloadClient";
import { getUrlsProduct } from "@/utilities/getUrlsProduct";
import { formatPrice } from "@/utilities/utils";
import { ProductDetails } from "../../../../types/types";
import { notFound } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";
import ProductReel from "@/components/ProductReel";
import AddToCartButton from "@/components/Cart/AddToCartButton";

const BREADCRUMBS = [
  { id: 1, name: "Inicio", href: "/" },
  { id: 2, name: "Store", href: "/products" },
];
async function ProductDetailPage({ params }: ProductDetails) {
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
  const urlsProduct = getUrlsProduct(product);
  return (
    <MaxWidthWrapper className='bg-white'>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product Details */}
          <div className='lg:max-w-lg lg:self-end'>
            <ol className='flex items-center space-x-2'>
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className=' flex items-center text-sm'>
                    <Link
                      href={breadcrumb.href}
                      className='item-hover font-medium text-sm text-muted-foreground '>
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='ml-2 h-5 w-5 flex-shrink-0 text-gray-300'>
                        <path d='M5.555 17.776l8-16 .894.448-8 16-.894-.448z' />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {product.name}
              </h1>
            </div>

            <section className='mt-4'>
              <div className='flex items-center'>
                <p className='font-medium text-gray-900'>
                  {formatPrice(product.price)}
                </p>

                <div className='ml-4 border-l text-muted-foreground border-gray-300 pl-4'>
                  {product.category}
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-muted-foreground'>
                  {product.description}
                </p>
              </div>
              <div className='mt-4 space-y-6'>
                {/* {listSize.map((size, i) => {
                  console.log(size);
                  return (
                    <button
                      key={i}
                      onClick={() => getSizeProduct(size)}
                      className={`py-1 px-2 mx-2 border rounded-2xl text-sm hover:bg-black hover:text-white ${selectSize === size ? `bg-black text-white` : undefined
                        }`}
                    >
                      {size}
                    </button>
                  );
                })} */}
              </div>

              <div className='mt-6 flex items-center'>
                <FaCheck
                  aria-hidden='true'
                  className='h-5 w-5 flex-shrink-0 text-green-500'
                />
                <p className='ml-2 text-sm text-muted-foreground'>
                  Disponible para Entrega
                </p>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='aspect-square rounded-lg'>
              <ImageSlider urls={urlsProduct} />
            </div>
          </div>

          {/* add to cart part */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <div>
              <div className='mt-1'>
                <AddToCartButton product={product} />
              </div>
              <div className='mt-6 text-center'>
                <div className='group inline-flex text-sm text-medium'>
                  <IoShieldOutline
                    aria-hidden='true'
                    className='mr-2 h-5 w-5 flex-shrink-0 text-gray-400'
                  />
                  <span className='text-muted-foreground hover:text-gray-700'>
                    30 días de garantía
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {<ProductReel
        href='/products'
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${product.category}`}
        subtitle={`Browse similar high-quality ${product.category} just like '${product.name}'`}
      />} */}
    </MaxWidthWrapper>
  );
}

export default ProductDetailPage;
{
  /* <div className="flex flex-col lg:flex-row items-center justify-center">
      <div className="lg:w-1/3 lg:mr-8">
        <Image src="/t-shirt.jpg" width={400} height={400} alt="T-Shirt ArtStreet" />
      </div>
      <div className="lg:w-2/3">
        <h1 className="text-3xl font-bold">T-Shirt ArtStreet</h1>
        <p className="text-xl font-semibold">$45.000</p>
        <div className="w-full lg:w-1/3">
          <label htmlFor="quantity" className="mt-2 px-1 text-xs text-gray-600 bg-white">Cantidad de Productos</label>
          <input type="number" id="quantity" name="quantity" min="1" max="999" required className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:text-black" />
        </div>
        <p className="text-lg">T-Shirt oficial de ArtStreet. Perfecta para usar en tu día a día o en tus presentaciones.</p>
        <button className="mt-4 px-6 py-3 bg-primaryColor text-white rounded-md">Agregar al Carrito</button>
      </div>
      <div className="mt-8 flex items-center">

       
      </div>
    </div> */
}

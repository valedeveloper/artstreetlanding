import React from 'react'
import {  ProductsCheckOut } from '../../types/types'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utilities/utils'
import { IoMdClose } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'



function ProductsInCheckout({ items,removeItem }: ProductsCheckOut) {
    return (
        items.map(({ product }) => {
            const { image } = product.images[0]
            return (
                <li
                    key={product.id}
                    className='flex py-6 sm:py-10'>
                    <div className='flex-shrink-0'>
                        <div className='relative h-24 w-24'>
                            {typeof image !== 'string' &&
                                image.url ? (
                                <Image
                                    width={500}
                                    height={500}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    src={image.url}
                                    alt='product image'
                                    className='h-full w-full rounded-md  object-center sm:h-48 sm:w-48'
                                />
                            ) : null}
                        </div>
                    </div>

                    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                            <div>
                                <div className='flex justify-between'>
                                    <h3 className='text-sm'>
                                        <Link
                                            href={`/products/${product.id}`}
                                            className='font-medium text-gray-700 hover:text-gray-800'>
                                            {product.name}
                                        </Link>
                                    </h3>
                                </div>

                                <div className='mt-1 flex text-sm'>
                                    <p className='text-muted-foreground'>
                                        Category: {product.category}
                                    </p>
                                </div>

                                <p className='mt-1 text-sm font-medium text-gray-900'>
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                                <div className='absolute right-0 top-0'>
                                    <button
                                        aria-label='remove product'
                                        onClick={() =>
                                            removeItem(product.id)
                                        }
                                    >
                                        <IoMdClose
                                            className='item-hover h-5 w-5'
                                            aria-hidden='true'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                            <FaCheck className='h-5 w-5 flex-shrink-0 text-green-500' />
                            <span>
                                Disponible para entrega
                            </span>
                        </p>
                    </div>
                </li>
            )
        })
    )
}

export default ProductsInCheckout
'use client'
import React, { useEffect, useState } from 'react'
import { ProductListing } from '../../types/types'
import { CardSkeleton } from './skeletons'
import { formatPrice } from '@/utilities/utils'
import ImageSlider from './ImageSlider'
import { getUrlsProduct } from '@/utilities/getUrlsProduct'
import Link from 'next/link'


function ProductListing({ product, index }: ProductListing) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const validUrls=getUrlsProduct(product)
    console.log(validUrls);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)

        return () => clearTimeout(timer)
    }, [index])

    if (!product || !isVisible) return <ProductPlaceholder />
    if (isVisible && product) {
        return <Link href={`/products/${product.id}`} className={" h-full w-ful cursor-pointer " + (isVisible ? "visible" : "invisible")}>
            <div className=' flex flex-col w-full'>
                  <ImageSlider urls={validUrls}/>
                <h3 className=' mt-4 font-medium text-sm text-gray-700'>{product.name}</h3>
                <p className=' mt-1 text-sm text-gray-500'>{product.category}</p>
                <p className=' mt-1 font-medium text-sm text-gray-900' >{formatPrice(product.price)}</p>
            </div>

        </Link>
    }
}

function ProductPlaceholder() {
    return (
        <div className='flex flex-col w-full' >
            <div className={"relative bg-zinc-100 aspect-square w-fulll overflow-hidden rounded-xl"}>
                <CardSkeleton />
            </div>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}


export default ProductListing
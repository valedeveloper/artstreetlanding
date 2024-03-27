'use client'
import React, { useEffect, useState } from 'react'
import { ProductListing } from '../../types/types'
import { CardSkeleton } from './skeletons'
import Link from 'next/link'
import { filterTypes } from '@/utilities/optionsList'


function ProductListing({ product, index }: ProductListing) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    console.log(product);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)

        return () => clearTimeout(timer)
    }, [index])

    if (!product || !isVisible) return <ProductPlaceholder />
    if (isVisible && product) {
        return <Link href={`/product/${product.id}`} className='invisible h-full w-ful cursor-pointer'>
            <div className=' flex flex-col w-full'>
                <h3 className=' mt-4 font-medium text-sm text-gray-700'>{product.name}</h3>
                <p className=' mt-1 text-sm text-gray-500'>{product.category}</p>
            </div>

        </Link>
    }
}

function ProductPlaceholder() {
    return (
        <div className='flex flex-col w-full' >
            <div className=' relative bg-zinc-100 aspect-square w-fulll overflow-hidden rounded-xl'>
                <CardSkeleton />
            </div>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}


export default ProductListing
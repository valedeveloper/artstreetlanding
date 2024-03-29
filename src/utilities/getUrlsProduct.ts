import { Product } from "@/payload-types"

export const getUrlsProduct=(product:Product | null)=>{
    const urls=product?.images.map(({image})=>typeof image==="string" ?image:image.url).filter(Boolean) as string[]
    return urls
}
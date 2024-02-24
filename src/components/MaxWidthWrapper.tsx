import { ReactNode } from "react"
import { WidthWrapper } from "../../types/types"

function MaxWidthWrapper({
    children, className
}:WidthWrapper){
    return(
        <div  className= {'mx-auto w-full max-w-screen-xl  px-2.5 md:px-20' + className}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper
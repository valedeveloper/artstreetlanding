'use client'
import Link from "next/link"
import { PropsCallAction } from "../../../types/types"

function CallToAction({href,title,className,onClick}:PropsCallAction):JSX.Element{
    return(
        <Link href={href}><button onClick={onClick} className={"button-call" + className}>{title}</button></Link>
    )
}
export default CallToAction 

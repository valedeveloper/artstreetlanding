import { LucideIcon } from "lucide-react";
import { InitOptions } from "payload/config";
import { MouseEventHandler, ReactNode } from "react";
export interface MenuItem {
  name?: string;
  item:  LucideIcon | string 
  href: string;
}

export interface PropsCallAction {
  href?: string;
  title: string;
  className?: string;
  onClick?:MouseEventHandler<HTMLButtonElement>
}

export interface WidthWrapper{
  children:ReactNode,
  className?:string,
}

//El partial hace referencia a que se va a deefinir un tipo que tiene 
//las misma propiedades de lo que se pasará en medio de los <>, pero todas esas propiedades serán opcionales
//Es decir, en este caso se va a coger todas las propiedades de InitOptions, pero puedo usar una, varios o quizá ninguna. 
//El partial lo que quiere decir es que se accederá a todas las propiedades del InititOptions, pero serán opcionales.
export interface Args {
  initialOptions?: Partial<InitOptions>
}

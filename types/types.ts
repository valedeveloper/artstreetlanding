import { LucideIcon } from "lucide-react";
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
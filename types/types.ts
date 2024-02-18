import { MouseEventHandler } from "react";

export interface MenuItem {
  name: string;
  item: React.ReactNode;
  href: string;
}

export interface PropsCallAction {
  href: string;
  title: string;
  className: string;
  onClick?:MouseEventHandler<HTMLButtonElement>
}

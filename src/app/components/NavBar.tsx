"use client";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart, Store, User, X } from "lucide-react";
import { itemsMenu } from "../utilities/optionsList";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";

function NavBar() {
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handledResize = () => {
    setIsVisibleMenu(window.innerWidth < 768);
  };
  const onOpenMenu = () => {
    {
      setIsOpenMenu(true);
    }
  };
  const onCloseMenu = () => {
    setIsOpenMenu(false);
  };
  useEffect(() => {
    window.addEventListener("resize", handledResize);
    return () => window.removeEventListener("resize", handledResize);
  }, []);
  return (
    <MaxWidthWrapper>
      <header
        className={"flex justify-around p-2 items-center bg-transparent "}
      >
        {isVisibleMenu ? (
          <Menu onClick={onOpenMenu} className="item-hover " />
        ) : (
          <li className="item-hover list-none">¿Qué es Art Street</li>
        )}
        <Link href={"/"}>
          <Image
            src={"/assets/images/LogoArtStreetTransparente.png"}
            width={100}
            height={100}
            alt="Logo art street"
          />
        </Link>
        {isVisibleMenu ? (
          <ShoppingCart className="item-hover" />
        ) : (
          <ul className="flex gap-5 items-center">
            {itemsMenu.map((item) => (
              <Link key={item.name} href={item.href}>
                <li className="item-hover">{item.item}</li>
              </Link>
            ))}
          </ul>
        )}
        {isOpenMenu && isVisibleMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-20 flex justify-center items-center transition-opacity duration-500">
            <ul className="text-white text-center w-screen flex justify-center flex-col items-center text-2xl transition-opacity duration-500">
              <X
                className="absolute right-8 top-8 cursor-pointer item-hover"
                size={30}
                onClick={onCloseMenu}
              />
              <Link href={"/"}>
                <li className="item-nav ">Inicio</li>
              </Link>
              <Link href={"/"}>
                <li className="item-nav ">¿Qué es Art Street</li>
              </Link>
              {itemsMenu
                .filter((item) => item.href !== "/cart")
                .map((item) => (
                  <Link key={item.href} href={item.href}>
                    <li className="item-nav" onClick={onCloseMenu}>
                      {item.name}
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        )}
      </header>
    </MaxWidthWrapper>
  );
}
export default NavBar;

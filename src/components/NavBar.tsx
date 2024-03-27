"use client";
import { useEffect, useState } from "react";
// import { Menu, ShoppingCart, Store, User, X } from "lucide-react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";

import { itemsMenu } from "../utilities/optionsList";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { scrollToSection } from "@/utilities/scrollToSection";
import { useAuth } from "@/hooks/useAuth";

function NavBar() {
  // const nextCookies = cookies();
  // const { user } = await getServerSideUser(nextCookies);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);

  const onToggleCart = () => {
    setIsOpenCart((prev) => !prev);
  };
  const onCloseCart = () => {
    setIsOpenCart(false);
  };
  const onOpenMenu = () => {
    setIsOpenMenu(true);
  };
  const onCloseMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <>
      {isOpenCart && <Cart onCloseCart={onCloseCart} />}
      <div className="bg-white sticky z-20 top-0 inset-x-0  ">
        <header className={"relative bg-white"}>
          <MaxWidthWrapper>
            <div
              className={
                "border-b flex items-center justify-between px-5 md:justify-around "
              }
            >
              <CiMenuFries
                size={20}
                onClick={onOpenMenu}
                color="black"
                className="item-hover md:hidden  "
              />
              {
                <li
                  onClick={() => scrollToSection("intro")}
                  className=" hidden md:visible"
                >
                  ¿Qué es Art Street?
                </li>
              }
              <Link href={"/"}>
                <Image
                  src={"/assets/images/LogoArtStreetTransparente.png"}
                  width={80}
                  height={80}
                  alt="Logo art street"
                />
              </Link>
              <FaShoppingCart
                size={20}
                className="item-hover md:hidden"
                onClick={onToggleCart}
              />

              <ul className="md:flex md:gap-5 md:items-center hidden">
                <Link href={"/"}
                  className=" cursor-pointer item-hover"
                  onClick={() => scrollToSection("wait-list")}
                >
                  Lista de Espera
                </Link>

                {itemsMenu.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <li className="item-hover ">{item.item}</li>
                  </Link>
                ))}
                <FaShoppingCart
                  className="item-hover"
                  onClick={onToggleCart}
                  size={20}
                />
              </ul>

              {isOpenMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-20 flex justify-center items-center transition-opacity duration-500">
                  <ul className="text-white text-center w-screen flex justify-center flex-col items-center text-2xl transition-opacity duration-500">
                    <IoMdClose
                      className="absolute right-8 top-8 cursor-pointer item-hover"
                      size={30}
                      onClick={onCloseMenu}
                    />
                    <Link href={"/"}>
                      <li className="item-nav " onClick={onCloseMenu}>
                        Inicio
                      </li>
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
                    {/* {user ? <p>Ingresar</p> : null} */}
                  </ul>
                </div>
              )}
            </div>
          </MaxWidthWrapper>
        </header>
      </div>
    </>
  );
}
export default NavBar;

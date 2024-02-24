"use client";
import { useEffect, useState } from "react";
import { Menu, ShoppingCart, Store, User, X } from "lucide-react";
import { itemsMenu } from "../app/utilities/optionsList";
import { scrollToSection } from "../app/utilities/scrollToSection";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";

interface NavbarProps {
  onToggleCart: () => void;
}
function NavBar() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.pageYOffset !== 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {isOpenCart && <Cart onCloseCart={onCloseCart} />}
      <div className=" bg-white sticky z-20 top-0 inset-x-0 h-16">
        <header className={"relative bg-white"}>
          <MaxWidthWrapper>
            <div
              className={
                "border-b flex items-center justify-between px-5 md:justify-around " +
                (+isScroll
                  ? "bg-white"
                  : "bg-gradient-to-t from-transparent via-transparent to-rgba(0, 0, 0, 0.3) transition duration-500 ease-in-out")
              }
            >
              <Menu onClick={onOpenMenu} className="item-hover md:hidden " />
              {/* <li onClick={()=>scrollToSection("intro")} className=" hidden md:visible">¿Qué es Art Street</li> */}
              <Link href={"/"}>
                <Image
                  src={"/assets/images/LogoArtStreetTransparente.png"}
                  width={100}
                  height={100}
                  alt="Logo art street"
                />
              </Link>
              <ShoppingCart
                className="item-hover md:hidden"
                onClick={onToggleCart}
              />

              <ul className="md:flex md:gap-5 md:items-center hidden">
                {itemsMenu.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <li className="item-hover">{item.item}</li>
                  </Link>
                ))}
                <ShoppingCart className="item-hover" onClick={onToggleCart} />
              </ul>

              {isOpenMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-95 z-20 flex justify-center items-center transition-opacity duration-500">
                  <ul className="text-white text-center w-screen flex justify-center flex-col items-center text-2xl transition-opacity duration-500">
                    <X
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

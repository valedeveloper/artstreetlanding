import { useAuth } from "@/hooks/useAuth";
import { User } from "@/payload-types";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavItemsProps } from "../../types/types";
import { useRouter } from "next/navigation";

const UserAccountNav = ({ user }: NavItemsProps) => {
    const { signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
   

    return (
        <div className="relative">
            <button
                onClick={toggleMenu}
                className=" px-2 py-1 rounded  item-hover text-primaryYelow  "
            >
                Mi Cuenta
            </button>

            {isMenuOpen && (
                <div className="absolute top-10 right-0 bg-white  border-gray-300 rounded w-60 z-50 min-w-[8rem] overflow-hidden  border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 slide-in-from-bottom-2">
                    <div className="flex items-center justify-start gap-2 p-2">
                        <p className="font-medium text-sm text-black">{user?.email}</p>
                    </div>

                    <hr className="my-2 border-gray-300" />

                    <div className="p-2">
                        <Link
                            href={`/sell/collections/users/${user?.id}`}
                            className="block py-1 text-sm text-gray-800 hover:bg-gray-100 transition duration-200"
                        >
                            Editar Datos
                        </Link>
                        <button
                            onClick={signOut}
                            className="block w-full py-1 text-sm text-gray-800 hover:bg-gray-100 transition duration-200 text-left"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAccountNav;

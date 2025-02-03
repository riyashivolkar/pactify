"use client";

import React, { useState, useEffect } from "react";
import {
    Bars3Icon,
    XMarkIcon,

} from "@heroicons/react/24/outline";

type NavItemProps = {
    children: React.ReactNode;
};

function NavItem({ children }: NavItemProps) {
    return (
        <li className="text-blue-gray-700 flex items-center gap-2 font-medium">
            <a href="#">{children}</a>
        </li>
    );
}

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav className="w-full border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-lg font-bold">Pactify</h1>
                <ul className="hidden lg:flex items-center gap-6">
                    <NavItem>Pages</NavItem>
                    <NavItem>Account</NavItem>
                    <NavItem>Blocks</NavItem>
                    <NavItem>Docs</NavItem>
                </ul>
                <div className="hidden lg:flex items-center gap-4">
                    <button className="bg-gray-700 text-white px-4 py-2 rounded">
                        Cart
                    </button>
                </div>
                <button onClick={handleOpen} className="lg:hidden">
                    {open ? (
                        <XMarkIcon className="h-6 w-6" />
                    ) : (
                        <Bars3Icon className="h-6 w-6" />
                    )}
                </button>
            </div>
            {open && (
                <div className="mt-3 border-t px-2 pt-4">
                    <ul className="flex flex-col gap-4">
                        <NavItem>Pages</NavItem>
                        <NavItem>Account</NavItem>
                        <NavItem>Blocks</NavItem>
                        <NavItem>Docs</NavItem>
                    </ul>
                    <div className="mt-6 mb-4 flex flex-col gap-4">
                        <button className="text-gray-700">Log in</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded">
                            Cart
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
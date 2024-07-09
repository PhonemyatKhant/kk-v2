import { Menu, Search, ShoppingBag } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Image from "next/image";
import Avatar from "./Avatar";
import NavbarProfile from "./NavbarProfile";

const Navbar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <nav className=" flex items-center justify-between border-b-2 px-4 py-2 lg:px-8">
      {/* MOBILE MENU & LOGO  */}
      <div className=" flex items-center justify-between gap-4">
        <Menu />
        <h1>KK STORE</h1>
      </div>

      {/* SEARCH INPUT  */}
      <div className="flex items-center justify-center relative">
        <Search className="absolute inset-0 self-center" />
        <Input />
      </div>

      {/* NAV LINKS  */}
      <ul className=" flex items-center justify-between gap-4">
        <li>Collections</li>
        <li>About</li>
      </ul>

      {/* SHOPPING CART & USER ICON  */}
      <div className="flex items-center justify-between gap-4">
        <ShoppingBag />
        <NavbarProfile user={currentUser!}/>
      </div>
    </nav>
  );
};

export default Navbar;

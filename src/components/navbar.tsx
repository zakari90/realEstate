"use client"
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LangSwitcher from "./lang-switcher";
import LogoComponent from "./logoComponents";
import { NavBarProps } from "./navWithSheet";
import { Button } from "./ui/button";

export default function Navbar({ locale, navLinks }: NavBarProps) {
  const [toggle, setToggle] = useState(false);
  const domaine = process.env.NEXT_PUBLIC_DOMAINE;

  const showNav = () => {
    setToggle(!toggle);
  };

  // start mobile first plus facile
  return (
    <nav className="bg-background md:max-h-12">
      
      <div className="container mx-auto grid grid-cols-6 gap-4">
      <div className="grid-cols-1 w-12">
      <LogoComponent/>

      </div>
      <div className="col-start-2 md:col-start-4 col-span-4">
      <ul
          className={`${
            toggle ? "flex" : " hidden"
          }   h-auto flex-col justify-center items-center w-auto md:w-auto  md:flex md:flex-row`}
        >
          {navLinks.map((link, index) => {
            return (
                <Button 
                className="m-1"
                variant="ghost"
                key={index}
                >
                <Link
                  
                  href={`${domaine}${locale}/#${link[1]}`}
                  onClick={showNav}
                >
                 {link[0]}
                </Link>
                </Button>

            );
          })}
          <LangSwitcher />
      </ul>
      </div>
      <div >
      <div className="mt-3">
        <button
          className="flex justify-end md:hidden ring-1 rounded"
          onClick={showNav}
        >
          {toggle ?  <XIcon className="m-1"/> : <MenuIcon className="m-1"/>}
        </button>
          </div>
        </div>

      </div>
    </nav>
  );
}

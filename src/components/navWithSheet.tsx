"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SheetTrigger, SheetContent, Sheet, SheetClose } from '@/components/ui/sheet';
import LangSwitcher from './lang-switcher';
import LogoComponent from './logoComponents';
import { JSX, SVGProps } from 'react';

type NavLink = [string, string];

export interface NavBarProps {
  locale: string;
  navLinks: NavLink[];
}

export default function SheetNavBar({ locale, navLinks }: NavBarProps) {
  const domaine = process.env.NEXT_PUBLIC_DOMAINE;

  return (
    <header className="bg-background p-4 flex items-center justify-between">
      <div className="container mx-auto flex justify-between items-center">
        <LogoComponent />
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link, index) => (
            <Link className="nav-link hover:underline hover:underline-offset-4"
              key={index} href={`${domaine}${locale}/#${link[1]}`}>
              {link[0]}
            </Link>
          ))}
          <LangSwitcher />
        </nav>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6 text-primary" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent >
          <div className="grid gap-6 p-4">
            {navLinks.map((link, index) => (
              <SheetClose asChild key={index}>
                <Link
                  className="nav-link font-medium hover:underline hover:underline-offset-4"
                  href={`${domaine}${locale}/#${link[1]}`}
                  onClick={() => setTimeout(() => {}, 300)} // Delay to ensure sheet closes
                key={index}
                >
                  {link[0]}
                </Link>
              </SheetClose>
            ))}
            <LangSwitcher />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

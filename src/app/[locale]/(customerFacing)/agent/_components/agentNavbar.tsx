"use client"
import {
  ChevronDown,
  LucideHome,
  Menu
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LangSwitcher from "@/components/lang-switcher"
import { ModeToggle } from "@/components/modeToggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/contactUs", label: "Contact us" },
  { href: "/aboutUs", label: "About us" },
];

export function AgentNavBar() {
  const pathname = usePathname();
  
  return (
      <header className="container z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden text-lg font-medium md:w-full md:flex md:flex-row md:justify-between md:gap-5 md:text-sm lg:gap-6">  
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >                  
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-sm ">
                <LucideHome className="h-6 w-6" />
                <span className="sr-only">Logo</span> 
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col items-center" >
              <DropdownMenuItem><LangSwitcher /></DropdownMenuItem>
              <DropdownMenuItem><span className="sr-only">dark-light mode</span><ModeToggle /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </Link>

          <div className="flex w-1/2 justify-between">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                  pathname === item.href && "bg-background text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/agent"
            className={cn(
              "p-4 font-bold hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
              pathname === "/advertise" && "bg-background text-foreground"
            )}
          >
            Advertise
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <LucideHome className="h-6 w-6" />
                <span className="sr-only">Logo</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Separator />
              <Link
                href="/agent"
                className="font-bold text-muted-foreground hover:text-foreground"
              >
                Advertise
              </Link>
              <Separator />
            </nav>
          </SheetContent>
        </Sheet>
      </header>
  )
}

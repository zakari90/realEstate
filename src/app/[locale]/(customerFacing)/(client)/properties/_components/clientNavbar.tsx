"use client"

import {
  ChevronDown,
  LucideHome,
  Menu
} from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import LangSwitcher from "@/components/lang-switcher"
import { ModeToggle } from "@/components/modeToggle"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { isAgent } from "@/_actions/client/actions"

export interface NavItem {
  href: string;
  name: string;
}

const defaultItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About us", href: "/aboutUs" },
]

export function NavBar({navItems = defaultItems } : {navItems? : NavItem[]}) {
  const [isOpen, setIsOpen] = useState(false)
  const [agent, checkAgent] = useState(false);
  const router = useRouter();

  const handleAdvertise = () => {
    if (agent) {
      router.push('/agent');
    } else {
      router.push('/login');
    }
  } 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await isAgent();
        checkAgent(response);
      } catch (err) {
        // Handle error
      } 
    };
    fetchData();
  }, []);

  return (
    <header className="bg-white">
      
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
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
          </div> */}
          <div className="flex md:flex md:items-center md:gap-12">
            <LangSwitcher />
            <ModeToggle />
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className=" transition hover:text-gray-500/75"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
              <Link href="/agent" >
              <Button 
                  onClick={handleAdvertise}
                  variant={agent ? "default" : "outline"} 
                  className={agent ? "hidden sm:flex bg-teal-600 text-white" : "bg-red-700 text-white"}
                >
                  {/* TODO : CHANGE THE TEXT BELOW */}
                  {agent ? "Advertise" : "Login to Advertise"}
                </Button>
              </Link>
              </div>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden"
                    aria-label="Open menu"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium  hover:text-gray-900"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

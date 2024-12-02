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
  { name: "الرئيسية", href: "/" },
  { name: "الملكيات", href: "/properties" },
  { name: "الاستثمارات", href: "/investments" },
  { name: "من نحن", href: "/aboutUs" },
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
            </div>
          </div>
        </div>
     
    </header>
  )
}

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

interface NavItem {
  href: string;
  label: string;
}

interface ClientNavBarProps {
  navItems?: NavItem[];
  agentText?: string;
  agentAddText?: string;
}

const defaultNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/aboutUs", label: "About us" },
];

export function NavBar({
  navItems = defaultNavItems,
  agentText = "Advertise",
  agentAddText = "Add Property"
}: ClientNavBarProps) {
  const [agent, checkAgent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await isAgent();
        console.log(response)
        checkAgent(response);
      } catch (err) {
        // Handle error
      } 
    };
    fetchData();
  }, []);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

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
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/agent"
        >
          {agent ? <p>Add Property</p> : <p>Advertise</p>}
        </Link>
      </nav>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              onClick={() => setIsOpen(false)}
            >
              <LucideHome className="h-6 w-6" />
              <span className="sr-only">Logo</span>
            </Link>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <Separator />
            <a
              href="/agent/properties"
              className="font-bold text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/agent/properties');
              }}
            >
              {agent ? <p>Add Property</p> : <p>Advertise</p>}
            </a>
            <Separator />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
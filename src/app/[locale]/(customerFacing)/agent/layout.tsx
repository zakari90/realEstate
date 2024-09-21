import LangSwitcher from "@/components/lang-switcher";
import { ModeToggle } from "@/components/modeToggle";
import { Nav, NavLink } from "@/components/Nav";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { NavBar } from "../(client)/_components/clientNavbar";
export const dynamic = "force-dynamic"

//TODO : translate this navigation use my navbar
export default function AgentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const navItems = [
      { href: "/agent", label: "Dashboard" },
      { href: "/agent/properties", label: "Properties" },
      // { href: "/aboutUs", label: "About us" },
    ];
    
  return (
    <>
    <ClerkProvider>
   
    <div className="w-full relative">
    <SignedIn>
    
      {/* <LangSwitcher />
      <Nav>
        <NavLink href="/agent">Dashboard</NavLink>
        <NavLink href="/agent/properties">properties</NavLink>
        <NavLink href="/agent/customers">Customers</NavLink>
        <NavLink href="/agent/profile">Profile</NavLink>
      </Nav>
      <ModeToggle/> */}
      <div className="absolute top-5 right-2">
        <UserButton />
      </div>
      <NavBar navItems={navItems}/>
        {children}
    </SignedIn>
    <div className="m-auto w-1/2 flex justify-center">
      <SignedOut >
        <SignIn routing="hash" />
      </SignedOut>
    </div>

    </div>
    </ClerkProvider>

    </>
    ); 
  }
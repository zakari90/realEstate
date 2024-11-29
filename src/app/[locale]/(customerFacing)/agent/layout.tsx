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
import { NavBar, NavItem } from "../(client)/properties/_components/clientNavbar";
import AnalyticsTracker from "@/components/analyticsTracker";
export const dynamic = "force-dynamic"

//TODO : translate this navigation use my navbar
export default function AgentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const agnetNavItems: NavItem[]  = [
      { href: "/agent", name: "Dashboard" },
      { href: "/agent/properties", name: "Properties" },
      { href: "/agent/investors", name: "Investors" },
      // { href: "/aboutUs", label: "About us" },
    ];
    
  return (
    <>
    <ClerkProvider>
   
    <div className="w-full relative">
    <SignedIn>
    {/* <LangSwitcher /> */}
    <UserButton />
  
      {/* <div className="absolute -bottom-full right-1/2">
        <UserButton />
      </div> */}
      <NavBar navItems={agnetNavItems}/>
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
import LangSwitcher from "@/components/lang-switcher";
import { ModeToggle } from "@/components/modeToggle";
import { Nav, NavLink } from "@/components/Nav";
import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
export const dynamic = "force-dynamic"

//TODO : translate this navigation use my navbar
export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
    <div className="w-full">
      
    <div className="m-auto w-1/2 flex justify-center">
      <SignedOut >
        <SignIn routing="hash" />
      </SignedOut>
    </div>
      <SignedIn>
    <div className="flex justify-around">
    <UserButton />
      <LangSwitcher />
      <Nav>
        <NavLink href="/agent">Dashboard</NavLink>
        <NavLink href="/agent/properties">properties</NavLink>
        <NavLink href="/agent/customers">Customers</NavLink>
        <NavLink href="/agent/profile">Profile</NavLink>
      </Nav>
      <ModeToggle/>
      
      </div> 
      {children}
      </SignedIn>
    </div>
    </>
    ); 
  }
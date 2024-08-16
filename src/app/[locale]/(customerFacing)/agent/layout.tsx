import LangSwitcher from "@/components/lang-switcher";
import { ModeToggle } from "@/components/modeToggle";
import { Nav, NavLink } from "@/components/Nav";
import {
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
    <SignedOut>
            <SignInButton />
    </SignedOut>
      <SignedIn>
    <div className="flex justify-around">
    <UserButton />
      <LangSwitcher />
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>
      </Nav>
      <ModeToggle/>
      </div> 
      {children}
      </SignedIn>
    </div>
    </>
    ); 
  }
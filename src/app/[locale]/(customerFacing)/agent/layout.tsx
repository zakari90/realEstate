import LangSwitcher from "@/components/lang-switcher";
import { ModeToggle } from "@/components/modeToggle";
import { Nav, NavLink } from "@/components/Nav";

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
 <div className="flex justify-around">

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
    </div>
     
    </>
    ); 
  }
import { ourFileRouter } from "@/app/[locale]/api/uploadthing/core";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { NavBar, NavItem } from "../../../../components/_1inUseComponents/clientNavbar";

export const dynamic = "force-dynamic"

//TODO : translate this navigation use my navbar
export default function AgentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const agnetNavItems: NavItem[]  = [
      { href: "/agent", name: "لوحة المعلومات" },
      { href: "/agent/properties", name: "الملكيات" },
      { href: "/agent/investors", name: "الاستثمار" },
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
      <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
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
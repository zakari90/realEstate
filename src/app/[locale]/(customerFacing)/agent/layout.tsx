import { ourFileRouter } from "@/app/[locale]/api/uploadthing/core";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { NavBar, NavItem } from "../../../../components/clientNavbar";
import { NotificationBell } from "@/components/notificationBell";

export const dynamic = "force-dynamic";

//TODO : translate this navigation use my navbar
export default function AgentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const agnetNavItems: NavItem[] = [
    { href: "/agent", name: "لوحة المعلومات" },
    { href: "/agent/properties", name: "الملكيات" },
    { href: "/agent/investors", name: "الاستثمار" },
    // { href: "/aboutUs", label: "About us" },
  ];

  return (
    <>
      <ClerkProvider>
        <SignedIn>
          <div className="w-full flex">
            <NavBar navItems={agnetNavItems} />
            <div className="flex items-center gap-3">
              <NotificationBell />
              <UserButton
                userProfileMode="modal"
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-10 h-10 border-2 border-white shadow-sm",
                  },
                }}
              />
            </div>
          </div>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <main className="pb-12">{children}</main>
        </SignedIn>

        <SignedOut>
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-emerald-700">
            <div className="bg-white/90 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20">
              <SignIn routing="hash" />
            </div>
          </div>
        </SignedOut>
      </ClerkProvider>
    </>
  );
}

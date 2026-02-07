"use client";
import { isAgent } from "@/_actions/client/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface NavItem {
  href: string;
  name: string;
}

const defaultItems: NavItem[] = [
  { name: "الرئيسية", href: "/" },
  { name: "الملكيات", href: "/properties" },
  { name: "الاستثمارات", href: "/investments" },
  { name: "من نحن", href: "/aboutUs" },
];

export function NavBar({ navItems = defaultItems }: { navItems?: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgentUser, setIsAgentUser] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleAdvertise = () => {
    if (isAgentUser) {
      router.push("/agent");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const fetchAgentStatus = async () => {
      try {
        const response = await isAgent();
        setIsAgentUser(response);
      } catch (error) {
        console.error("Failed to check agent status:", error);
      }
    };
    fetchAgentStatus();
  }, [pathname]);

  const shouldHideButton = pathname.includes("agent");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-2 transition-colors hover:text-teal-600",
                        isActive ? "text-teal-600" : "text-gray-600",
                      )}
                    >
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {!shouldHideButton ? (
                <Link href="/agent">
                  <Button
                    onClick={handleAdvertise}
                    variant={isAgentUser ? "default" : "outline"}
                    className={cn(
                      "transition-all duration-300 shadow-sm hover:shadow-md",
                      isAgentUser
                        ? "bg-teal-600 hover:bg-teal-700 text-white"
                        : "border-red-600 text-red-600 hover:bg-red-50",
                    )}
                  >
                    {isAgentUser ? "إنشاء إعلان" : "أعلن معنا"}
                  </Button>
                </Link>
              ) : (
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="hover:bg-teal-50 text-teal-700"
                  >
                    الرئيسية
                  </Button>
                </Link>
              )}
            </div>

            <Separator orientation="vertical" className="h-6 hidden md:block" />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-gray-100"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-72 p-0 border-r-0" side="right">
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-teal-800">القائمة</h2>
                  </div>
                  <nav className="flex-1 px-4 py-8 space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center p-4 rounded-xl text-lg font-semibold transition-all duration-200 hover:translate-x-2",
                          pathname === item.href
                            ? "bg-teal-50 text-teal-700"
                            : "text-gray-600 hover:bg-gray-50",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

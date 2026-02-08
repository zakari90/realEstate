"use client";

import { cn } from "@/lib/utils";
import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  Users,
  UserSquare2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const dynamic = "force-dynamic";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    href: "/admin",
    label: "لوحة التحكم",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/properties",
    label: "العقارات",
    icon: Building2,
  },
  {
    href: "/admin/investments",
    label: "الاستثمارات",
    icon: TrendingUp,
  },
  {
    href: "/admin/agents",
    label: "الوكلاء",
    icon: Users,
  },
  {
    href: "/admin/clients",
    label: "العملاء",
    icon: UserSquare2,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Extract locale from pathname (e.g., /ar/admin/dashboard -> ar)
  const locale = pathname.split("/")[1] || "ar";

  return (
    <ClerkProvider>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          {/* Sidebar */}
          <aside
            className={cn(
              "fixed top-0 right-0 z-40 h-screen transition-all duration-300 ease-in-out",
              "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
              "border-l border-slate-200/50 dark:border-slate-700/50",
              "shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50",
              isCollapsed ? "w-20" : "w-72",
            )}
          >
            {/* Logo Section */}
            <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200/50 dark:border-slate-700/50">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/30">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg text-slate-800 dark:text-white">
                    لوحة الإدارة
                  </span>
                </div>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                  "p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
                  isCollapsed && "mx-auto",
                )}
              >
                {isCollapsed ? (
                  <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname.includes(item.href);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      isActive &&
                        "bg-gradient-to-l from-teal-500/10 to-emerald-500/10 border border-teal-500/20",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/30"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {!isCollapsed && (
                      <span
                        className={cn(
                          "font-medium",
                          isActive
                            ? "text-teal-700 dark:text-teal-400"
                            : "text-slate-700 dark:text-slate-300",
                        )}
                      >
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50",
                  isCollapsed && "justify-center",
                )}
              >
                <UserButton
                  userProfileMode="modal"
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-10 h-10 border-2 border-teal-500 shadow-lg",
                    },
                  }}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                      المسؤول
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      مدير النظام
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main
            className={cn(
              "transition-all duration-300 ease-in-out min-h-screen",
              isCollapsed ? "mr-20" : "mr-72",
            )}
          >
            <div className="p-8">{children}</div>
          </main>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-emerald-700">
          <div className="bg-white/90 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20">
            <SignIn routing="hash" />
          </div>
        </div>
      </SignedOut>
    </ClerkProvider>
  );
}

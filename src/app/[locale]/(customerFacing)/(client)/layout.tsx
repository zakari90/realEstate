import ClientFooter from "@/components/clientFootre";
import { NavBar } from "@/components/clientNavbar";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Real State",
  description: "website for a Real State",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  // const t = useTranslations("navigation");

  // const clientNavItems: NavItem[] = [
  //   { href: "/", name: t("home") },
  //   { href: "/properties", name: t("properties") },
  //   { href: "/investments", name: t("investments") },
  //   { href: "/aboutUs", name: t("aboutUs") },
  // ];
  return (
    <>
      {/* <Header locale={locale} navLinks= {navLinks}  />         */}
      <NavBar />
      <div className="flex-grow">{children}</div>
      <ClientFooter />
      {/* <Footer locale={locale} navLinks= {navLinks} /> */}
    </>
  );
}

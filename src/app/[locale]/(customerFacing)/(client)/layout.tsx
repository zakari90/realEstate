import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Inter as FontSans } from "next/font/google";
import ClientFooter from '@/components/_1inUseComponents/clientFootre';
import { NavBar, NavItem } from '@/components/_1inUseComponents/clientNavbar';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: 'Real State',
  description: 'website for a Real State',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {

  const Navigation = useTranslations('navigation');
  console.log("--------------------------------" + Navigation('home'));
  
  const navLinks:[string, string][] = [
    [Navigation('home'), 'home'],
    [Navigation('services'), 'services'],
    [Navigation('pr'), 'products'],
    [Navigation('about'), 'about'],
    [Navigation('contact'), 'contact']
  ];
  const clientNavItems:NavItem[] = [
    { href: "/", name: "الرئيسية" },
    { href: "/properties", name: "الملكيات" },
    { href: "/investments", name: "الاستثمارات" },
    { href: "/aboutUs", name: "من نحن" },

  ];
  return (
  <>
    {/* <Header locale={locale} navLinks= {navLinks}  />         */}
    <NavBar navItems={clientNavItems} />
      <div className='flex-grow'>{children}</div>
      <ClientFooter/>
    {/* <Footer locale={locale} navLinks= {navLinks} /> */}
  </>

  );
}

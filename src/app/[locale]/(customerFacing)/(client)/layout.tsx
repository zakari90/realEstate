import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Inter as FontSans } from "next/font/google";
import ClientFooter from './properties/_components/clientFootre';
import { NavBar, NavItem } from './properties/_components/clientNavbar';

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
  params: { locale },
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
    { href: "/", name: "Home" },
    { href: "/properties", name: "Properties" },
    { href: "/investors", name: "Investment" },
    { href: "/aboutUs", name: "About us" },

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

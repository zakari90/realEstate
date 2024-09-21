import Footer from '@/components/footer';
import Header from '@/components/header';
import { rubik } from '@/lib/fonts';
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Inter as FontSans } from "next/font/google";
import Link from 'next/link';
import { NavBar } from './_components/clientNavbar';
import { ClientOfferForm } from './_components/property/clientOfferForm';
import ClientFooter from './_components/clientFootre';

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
  const navLinks:[string, string][] = [
    [Navigation('home'), 'home'],
    [Navigation('services'), 'services'],
    [Navigation('pr'), 'products'],
    [Navigation('about'), 'about'],
    [Navigation('contact'), 'contact']
  ];
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/aboutUs", label: "About us" },
  ];
  return (
  <>
    {/* <Header locale={locale} navLinks= {navLinks}  />         */}
    <NavBar navItems={navItems} />
      <div className='flex-grow'>{children}</div>
      <ClientFooter/>
    {/* <Footer locale={locale} navLinks= {navLinks} /> */}
  </>

  );
}

import Footer from '@/components/footer';
import Header from '@/components/header';
import { rubik } from '@/lib/fonts';
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Inter as FontSans } from "next/font/google";

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

  const font = locale === 'ar' ? rubik.className :  fontSans.variable;
  const documentDirection = locale === 'ar' ? "rtl" :  "ltr";

  const Navigation = useTranslations('navigation');
  const navLinks:[string, string][] = [
    [Navigation('home'), 'home'],
    [Navigation('services'), 'services'],
    [Navigation('pr'), 'products'],
    [Navigation('about'), 'about'],
    [Navigation('contact'), 'contact']
  ];

  return (
  <>
    <Header locale={locale} navLinks= {navLinks}  />        
      <div className='flex-grow'>{children}</div>
    <Footer locale={locale} navLinks= {navLinks} />
  </>

  );
}

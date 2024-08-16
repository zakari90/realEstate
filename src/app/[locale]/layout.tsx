import Footer from '@/components/footer';
import Header from '@/components/header';
import { rubik } from '@/lib/fonts';
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { Inter as FontSans } from "next/font/google";
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/modeToggle';
import LangSwitcher from '@/components/lang-switcher';
import Navbar from '@/components/navbar';
import { ClerkProvider } from '@clerk/nextjs';
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
    <ClerkProvider>

    <html lang={locale} dir={documentDirection} suppressHydrationWarning>

      <body 
      className={cn(
        "min-h-screen bg-background font-sans antialiased ",
        font
      )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

          {children}
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>

  );
}

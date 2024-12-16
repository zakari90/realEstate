import { ThemeProvider } from '@/components/_1inUseComponents/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { rubik } from '@/lib/fonts';
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { Inter as FontSans } from "next/font/google";
import './globals.css';

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
}: RootLayoutProps) {

  const font = locale === 'ar' ? rubik.className :  fontSans.variable;
  const documentDirection = locale === 'ar' ? "rtl" :  "ltr";

  return (
    <html lang={locale} dir={documentDirection} suppressHydrationWarning>
      <body 
      className={cn(
        "min-h-screen bg-background font-sans antialiased ",
        font
      )}
      // style={{
      //   backgroundImage: "url('/bg2.jpg'),  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
      //   backgroundSize: 'cover', 
      //   backgroundPosition: 'center',
      //   backgroundAttachment: 'fixed', 
      // }}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>

  );
}

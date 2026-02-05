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
  title: "Crowdfunding and Property Sales | بيع وشراء العقارات عبر التمويل الجماعي",
  description: "Join our real estate crowdfunding platform to buy, sell, and invest in properties. Secure your future with property investments today! | انضم إلى منصتنا للتمويل الجماعي لشراء وبيع العقارات. تأمين مستقبلك من خلال الاستثمارات العقارية اليوم!",
  keywords: [
    "real estate crowdfunding", "property investment", "buy property", "sell property", 
    "real estate investment platform", "crowdfunding platform for real estate", 
    "buy and sell real estate online", "property crowdfunding",
    "التمويل الجماعي العقاري", "استثمار العقارات", "شراء وبيع العقارات"
  ],
  // generator: "Next.js",
  // manifest: "/manifest.json",
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Zakaria Zinedine" },
    {
      name: "Zakaria Zinedine",
      url: "zakariazinedine1@gmail.com",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-icon", url: "icons/icon.png" },
    { rel: "icon", url: "icons/icon.png" },
  ],
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

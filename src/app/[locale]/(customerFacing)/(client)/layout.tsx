import ClientFooter from "@/components/clientFootre";
import { NavBar } from "@/components/clientNavbar";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <div className="max-w-full">
      <NavBar />
      <div className="flex-grow">{children}</div>
      <ClientFooter />
    </div>
  );
}

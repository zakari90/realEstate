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
      <div>{children}</div>
      <ClientFooter />
    </div>
  );
}

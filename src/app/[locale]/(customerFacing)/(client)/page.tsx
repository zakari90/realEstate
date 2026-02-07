import HeroSection from "@/components/heroSection";
import RecentInvestmentSection from "@/components/recentInvestementSection";
import RecentPropertiesSection from "@/components/recentPropertiesSection";
import ServiceSection from "@/components/servicesSection";
import { ResetDemoButton } from "@/components/resetDemoButton";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <>
      {/* hero   */}
      <HeroSection />
      {/* <Products/> */}
      <RecentPropertiesSection />
      <RecentInvestmentSection />
      {/* services */}
      <ServiceSection />
      <ResetDemoButton />
    </>
  );
}

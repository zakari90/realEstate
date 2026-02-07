import HeroSection from "@/components/heroSection";
import RecentInvestmentSection from "@/components/recentInvestementSection";
import RecentPropertiesSection from "@/components/recentPropertiesSection";
import { ResetDemoButton } from "@/components/resetDemoButton";
import ServiceSection from "@/components/servicesSection";

export default function Home() {
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

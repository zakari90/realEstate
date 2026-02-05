import HeroSection from '@/components/_1inUseComponents/heroSection';
import RecentInvestmentSection from '@/components/_1inUseComponents/recentInvestementSection';
import RecentPropertiesSection from '@/components/_1inUseComponents/recentPropertiesSection';
import ServiceSection from '@/components/_1inUseComponents/servicesSection';


export default function Home({params} :{
  params:{locale : string}
}) {

  return (
    <>
      {/* hero   */}
      <HeroSection/>
    {/* <Products/> */}
    <RecentPropertiesSection/>
    <RecentInvestmentSection/>
      {/* services */}
      <ServiceSection/>
    </>
  );
}

import ServiceSection from '@/components/servicesSection';
import { useTranslations } from 'next-intl';
import RecentInvestmentSection from '@/components/_1inUseComponents/recentInvestementSection';
import HeroSection from '@/components/_1inUseComponents/heroSection';
import RecentPropertiesSection from '@/components/_1inUseComponents/recentPropertiesSection';


export default function Home({params} :{
  params:{locale : string}
}) {
  const heroSection = useTranslations('heroSection');
  const servicesSection = useTranslations('servicesSection');
  const contactSection = useTranslations("contactSection");
  const productsSection = useTranslations('productsSection');
  return (
    <>
      {/* hero   */}
      <HeroSection/>
    {/* <Banner/> */}
    
    <RecentPropertiesSection/>
    <RecentInvestmentSection/>
      {/* services */}
      <ServiceSection/>
    </>
  );
}

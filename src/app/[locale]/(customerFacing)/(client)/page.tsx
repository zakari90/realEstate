import ContactSection from '@/components/contactSection';
import { useTranslations } from 'next-intl';
import Banner from './_components/banner';
import ServiceSection from '@/components/servicesSection';
import RecentPropertiesSection from './_components/property/propertiesSection';
import HeroSection from './_components/heroSection';




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

      {/* --------------------- */}
      {/* services */}
      <ServiceSection/>
      {/* contact */}      
      {/* <ContactSection title={contactSection("title")} description={contactSection("description")} /> */}
      {/* --------------------- */}
    </>
  );
}

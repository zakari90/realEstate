import ContactSection from '@/components/contactSection';
import { useTranslations } from 'next-intl';
import Banner from './_components/banner';
import PropertiesSectionProvider from './_components/property/propertiesSectionprovider';
import ServiceSection from '@/components/servicesSection';




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
      
    <Banner/>
    <PropertiesSectionProvider/>

      {/* --------------------- */}
      {/* services */}
      <ServiceSection/>
      {/* contact */}      
      {/* <ContactSection title={contactSection("title")} description={contactSection("description")} /> */}
      {/* --------------------- */}
    </>
  );
}

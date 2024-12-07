import ContactSection from '@/components/contactSection';
import { useTranslations } from 'next-intl';
import Banner from './properties/_components/banner';
import ServiceSection from '@/components/servicesSection';
import RecentPropertiesSection from './properties/_components/recentPropertiesSection';
import HeroSection from './properties/_components/heroSection';
import RecentInvestmentSection from './investments/_components/recentInvestementSection';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '../../api/uploadthing/core';




export default function Home({params} :{
  params:{locale : string}
}) {
  const heroSection = useTranslations('heroSection');
  const servicesSection = useTranslations('servicesSection');
  const contactSection = useTranslations("contactSection");
  const productsSection = useTranslations('productsSection');
  // middlewareTest()
  return (
    <>
      {/* hero   */}
      <UploadButton<OurFileRouter, "imagesUploader">
  endpoint="imagesUploader"
  onClientUploadComplete={(res) => console.log(res)}
  onUploadError={(err) => console.log(err)}
/>
      <HeroSection/>
    {/* <Banner/> */}
    <RecentPropertiesSection/>
    <RecentInvestmentSection/>
      {/* --------------------- */}
      {/* services */}
      <ServiceSection/>
      {/* contact */}      
      {/* <ContactSection title={contactSection("title")} description={contactSection("description")} /> */}
      {/* --------------------- */}
    </>
  );
}

import AboutSection from '@/components/aboutSection';
import ContactSection from '@/components/contactSection';
import HeroSection from '@/components/heroSection';
import ProductsSection from '@/components/productsSection';
import ServicesSection from '@/components/servicesSection';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';



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
      <HeroSection title={heroSection("title")} description={heroSection("description")} />

      {/* --------------------- */}
      {/* services */}
      <ServicesSection title={servicesSection("title")} services={servicesSection.raw('servicesList')}/>
      <Separator className="my-1 w-1/3 mr-auto" />
      {/* --------------------- */}

      {/* about */}
      <AboutSection/>
      <Separator className="my-1 w-1/3 mx-auto" />

      {/* --------------------- */}


      {/* products */}
      <ProductsSection title={productsSection("title")} locale= {params.locale} products={productsSection.raw('productsList')}/>
      <Separator className="my-1 w-1/3 mt-auto" />
      {/* --------------------- */}

      {/* contact */}      
      <ContactSection title={contactSection("title")} description={contactSection("description")} />
      <Separator className="my-1" />

      {/* --------------------- */}
    </>
  );
}

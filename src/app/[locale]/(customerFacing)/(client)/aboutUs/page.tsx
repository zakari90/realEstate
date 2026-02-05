import EmailLink from "@/components/_1inUseComponents/emailComponent";
import PhoneCallLink from "@/components/_1inUseComponents/phoneCallComponent";
import StepsComponent from "@/components/_1inUseComponents/stepsComponent";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppLink from "@/components/_1inUseComponents/whatsAppComponents";
import Head from 'next/head';
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* SEO Meta Tags */}
      <Head>
        <meta name="description" content="About ZProperty - Ethical Real Estate Investment" />
        <meta name="keywords" content="real estate, investment, ZProperty, ethical investment, property" />
        <meta name="author" content="ZProperty" />
        <meta property="og:title" content="About Us - ZProperty" />
        <meta property="og:description" content="Learn more about ZProperty's mission and ethical approach to real estate investment." />
        <meta property="og:image" content="https://example.com/og-image.jpg" />
        <meta property="og:url" content="https://example.com/about-us" />
        <title>About Us - ZProperty</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-[400px] bg-[url('https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">ZProperty</h1>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <h3 className="text-3xl font-semibold mb-6">هل تبحث عن ملكية بالتقسيط؟</h3>
        <p className="text-lg mb-4"> نحن في Zproperty نقدم لك الحل الأمثل لتحقيق حلمك بامتلاك العقار الذي ترغب فيه مع خيارات دفع مرنة ومريحة. نحن نساعدك في تأمين أفضل العروض التي تناسب ميزانيتك، حيث يمكنك تحديد شروط الدفع التي تناسبك. سواء كنت تبحث عن شقة سكنية، فيلا، أو عقار تجاري، لدينا العديد من الخيارات التي تتيح لك التملك بالتقسيط بسهولة وأمان. دعنا نكون شريكك في رحلتك العقارية لتحقيق استثمار آمن وناجح.        </p>
        <h3 className="text-3xl font-semibold mb-6">هل تبحث عن ملكية مشتركة؟</h3>
        <p className="text-lg mb-4"> في Zproperty، نقدم لك فرصًا رائعة للاستثمار في الملكيات بنظام الملكية المشتركة. من خلال هذه الخدمة، يمكنك شراكة مع مستثمرين آخرين لامتلاك عقار مشترك، مما يتيح لك الاستفادة من عوائد استثمارية مربحة مع تقاسم المخاطر والتكاليف. سواء كنت تبحث عن عقار سكني أو تجاري، لدينا العديد من الخيارات التي تناسب احتياجاتك. نحن هنا لمساعدتك في العثور على شريك مناسب وتقديم كل الدعم اللازم لتحقيق استثمار ناجح وآمن.</p>
        <h3 className="text-3xl font-semibold mb-6">هل تبحث عن مستثمر أو شريك؟</h3>
        <p className="text-lg mb-4"> في Zproperty، نساعدك في العثور على الشريك المثالي أو المستثمر الذي يدعم مشروعك العقاري. سواء كنت تخطط لتطوير مشروع جديد أو تحتاج إلى تمويل لمشروع قائم، نحن هنا لتوفير الفرص التي تتيح لك النجاح. من خلال شبكة واسعة من المستثمرين والشركاء المحتملين، يمكننا مساعدتك في تحقيق أهدافك وتحقيق النمو والتوسع في قطاع الملكيات. دعنا نكون شريكك الموثوق في كل خطوة نحو تحقيق النجاح المشترك.</p>      
      </section>

      {/* Team Section */}

      <section className="ml-auto mr-auto">
      <Card className="max-w-sm">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl text-center font-semibold">المؤسس</h2>
              <Image
                width={200}
                height={200}
                src={"https://utfs.io/f/5fc9f0eb-0403-4072-9003-ca31cdab076d-24goo2.jpg"}
                alt="Agent"
                className="w-24 h-24 rounded-full mx-auto"
              />
              <div className="text-center">
                <p className="font-semibold"></p>
                {/* TODO: add agent description to db */}
                {/* <p className="text-sm text-muted-foreground">Luxury Real Estate Specialist</p> */}
              </div>
              <div className="space-y-2 flex justify-around items-center">
                <PhoneCallLink phone={ ""}/>
                <WhatsAppLink productName={ " "} />
                <EmailLink />
   
            </div>
            </CardContent>
      </Card>
      </section>
      <StepsComponent />
    </div>
  );
}

import EmailLink from "@/components/emailComponent";
import PhoneCallLink from "@/components/phoneCallComponent";
import StepsComponent from "@/components/stepsComponent";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppLink from "@/components/whatsAppComponents";
import {
  Building2,
  Handshake,
  Users2,
  ShieldCheck,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import Head from "next/head";
import Image from "next/image";

export default function AboutUs() {
  const features = [
    {
      icon: <Building2 className="w-10 h-10 text-teal-600" />,
      title: "ملكية بالتقسيط",
      description:
        "نحن في Zproperty نقدم لك الحل الأمثل لتحقيق حلمك بامتلاك العقار الذي ترغب فيه مع خيارات دفع مرنة ومريحة. سواء كنت تبحث عن شقة سكنية، فيلا، أو عقار تجاري، لدينا العديد من الخيارات التي تتيح لك التملك بالتقسيط بسهولة وأمان.",
    },
    {
      icon: <Users2 className="w-10 h-10 text-teal-600" />,
      title: "ملكية مشتركة",
      description:
        "نقدم لك فرصًا رائعة للاستثمار في العقارات بنظام الملكية المشتركة. يمكنك شراكة مع مستثمرين آخرين لامتلاك عقار مشترك، مما يتيح لك الاستفادة من عوائد استثمارية مربحة مع تقاسم المخاطر والتكاليف.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-teal-600" />,
      title: "شراكة استثمارية",
      description:
        "نساعدك في العثور على الشريك المثالي أو المستثمر الذي يدعم مشروعك العقاري. من خلال شبكة واسعة من المستثمرين والشركاء، يمكننا مساعدتك في تحقيق أهدافك وتحقيق النمو والتوسع في قطاع العقارات.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-teal-100 selection:text-teal-900">
      <Head>
        <meta
          name="description"
          content="About ZProperty - Ethical Real Estate Investment"
        />
        <meta
          name="keywords"
          content="real estate, investment, ZProperty, ethical investment, property"
        />
        <meta name="author" content="ZProperty" />
        <title>من نحن - ZProperty</title>
      </Head>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-fixed bg-center"
          style={{ transform: "scale(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />

        <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight text-wrap drop-shadow-2xl">
            ZProperty
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium text-wrap max-w-2xl mx-auto leading-relaxed">
            نغير مفهوم الاستثمار العقاري لنجعله متاحاً، أخلاقياً، ومربحاً
            للجميع.
          </p>
          <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-none shadow-lg bg-card/50 backdrop-blur hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="mx-auto w-20 h-20 bg-teal-50 flex items-center justify-center rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-teal-900">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-wrap">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-card rounded-[3rem] p-8 md:p-12 shadow-2xl border border-teal-100/50">
            <div className="relative group">
              <div className="absolute -inset-4 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all" />
              <Image
                width={300}
                height={300}
                src="/founder.jpg"
                alt="Founder"
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] object-cover shadow-xl border-4 border-white"
              />
            </div>

            <div className="flex-1 space-y-6 text-center md:text-right">
              <div className="space-y-2">
                <span className="text-teal-600 font-bold tracking-widest uppercase text-sm">
                  المؤسس والمدير التنفيذي
                </span>
                <h2 className="text-4xl font-black text-gray-900">
                  زكرياء زين الدين
                </h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed text-wrap">
                رؤيتنا تتجاوز مجرد بيع العقارات؛ نحن نبني مجتمعاً من المستثمرين
                الناجحين ونسهل الطريق لامتلاك منزل الأحلام بأكثر الطرق مرونة
                وشفافية في السوق.
              </p>

              <div className="flex flex-wrap justify-center md:justify-end gap-4 pt-4">
                <div className="hover:scale-105 transition-transform">
                  <WhatsAppLink productName="استفسار من صفحة من نحن" />
                </div>
                <div className="hover:scale-105 transition-transform">
                  <PhoneCallLink phone="+212600000000" />
                </div>
                <div className="hover:scale-105 transition-transform">
                  <EmailLink />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="pb-24">
        <div className="max-w-6xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">كيف نبدأ العمل؟</h2>
          <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full" />
        </div>
        <StepsComponent />
      </div>
    </div>
  );
}

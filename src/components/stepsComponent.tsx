"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Book,
  ChevronLeft,
  ChevronRight,
  FileText,
  Handshake,
  Home,
  LucideIcon,
} from "lucide-react";
import { useState } from "react";

type Step = {
  title: string;
  icon: LucideIcon;
  content: string;
};

const steps: Step[] = [
  // TODO:create a page to educate the use on how to purchase a property leagy paperwork

  {
    title: "تعلم ما تحتاج إلى معرفته",
    icon: Book,
    content:
      "قبل أن تبدأ رحلتك في شراء المنزل، من الضروري أن تقوم بتثقيف نفسك حول العملية. ابدأ بالبحث عن سوق العقارات المحلي وتعرف على الشروط القانونية للمعاملات العقارية. يمكنك مشاهدة مقاطع فيديو تعليمية على يوتيوب أو استشارة مختص في العقارات للحصول على رؤى قيمة. ستساعدك هذه التحضيرات على اتخاذ قرارات مدروسة أثناء العملية.",
  },
  {
    title: "اختر العقار الذي يعجبك",
    icon: Home,
    content:
      "بمجرد أن تكون على دراية بالمعلومات، ابدأ في استكشاف العقارات المتاحة. قم بإنشاء قائمة بالميزات الأساسية والمرافق التي ترغب فيها. استخدم منصات العقارات عبر الإنترنت أو تعاون مع وكيل عقاري. لا تتعجل في هذه العملية - خصص وقتًا للعثور على منزل يناسب احتياجاتك وميزانيتك.",
  },
  {
    title: "قدم عرضك للبائع",
    icon: FileText,
    content:
      "عندما تجد العقار المناسب، حان الوقت لتقديم عرضك. يجب أن يعكس عرضك—الذي يحدد السعر وفترة الدفع—قيمة عادلة بناءً على العقارات المماثلة في المنطقة. بعد تقديم العرض، سيتواصل معك البائع عادةً في غضون ثلاثة إلى خمسة أيام لإبلاغك ما إذا كان قد قبل عرضك.",
  },
  {
    title: "إتمام عملية الشراء",
    icon: Handshake,
    content:
      "إذا قبل البائع عرضك، ستستمر في عملية الشراء. تتضمن هذه المرحلة عدة خطوات: جدولة فحص للعقار، مراجعة وتوقيع الوثائق القانونية، وربما التفاوض بشأن الإصلاحات أو إلغاء الصفقة بناءً على نتائج الفحص. بمجرد تلبية جميع الشروط، ستحضر عملية الإغلاق، حيث ستوقع الوثائق النهائية وتستلم العقار رسميًا.",
  },
];

export default function StepsComponent() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-4xl h-[600px] flex flex-col">
        {/* <CardHeader>
          <CardTitle className="text-3xl font-bold text-center"> Process</CardTitle>
        </CardHeader> */}
        <CardContent className="flex-grow flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-1/4 h-2 rounded-full ${
                    index <= currentStep ? "bg-primary" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col"
          > */}
          <Card className="flex-grow flex flex-col">
            <CardHeader>
              <CardTitle className="ml-2 flex items-center text-2xl font-semibold">
                {steps[currentStep]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-full">
                <p className="text-muted-foreground">
                  {steps[currentStep]?.content}
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
          {/* </motion.div> */}

          <div className="flex justify-between mt-8">
            <Button onClick={prevStep} disabled={currentStep === 0}>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

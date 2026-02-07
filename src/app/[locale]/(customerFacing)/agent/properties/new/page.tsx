import PropertyListingForm from "@/components/propertyListingForm";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function NewProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link
              href="/agent/properties"
              className="hover:text-teal-600 transition-colors"
            >
              العقارات
            </Link>
            <span>/</span>
            <span className="text-slate-600 font-medium">إضافة جديد</span>
          </div>
          {/* <PageHeader>إضافة ملكية</PageHeader> */}
        </div>

        <Button
          variant="outline"
          asChild
          className="gap-2 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl hidden md:flex"
        >
          <Link href="/agent/properties">
            <ArrowRight className="w-4 h-4 ml-2" />
            عودة للقائمة
          </Link>
        </Button>
      </div>

      <PropertyListingForm />
    </div>
  );
}

export default NewProductPage;

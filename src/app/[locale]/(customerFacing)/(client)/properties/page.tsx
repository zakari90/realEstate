"use client";

import { getAllProperties, PropertyDTO } from "@/_actions/client/actions";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight, Home, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import CardSkeleton from "@/components/cardSkeleton";
import PropertyCard from "@/components/propertyCard";
import { PageHeader } from "@/components/pageHeader";
import { motion } from "framer-motion";

export default function MainPropertiesSection() {
  const rowsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [properties, setProperties] = useState<PropertyDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const p = await getAllProperties();
      setProperties(p);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const endIndex = Math.min(startIndex + rowsPerPage, properties.length);
  const totalPages = Math.ceil(properties.length / rowsPerPage);
  const currentPage = Math.floor(startIndex / rowsPerPage) + 1;

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(prev - rowsPerPage, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + rowsPerPage, properties.length - rowsPerPage),
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Premium Header Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-900 py-20 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent"></div>

        <div className="container relative mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-2xl ring-1 ring-white/20">
            <Home className="w-8 h-8 text-indigo-300" />
          </div>

          <div className="text-white drop-shadow-md">
            <PageHeader>عقارات مميزة للبيع</PageHeader>
          </div>

          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            تصفح مجموعتنا المختارة من العقارات الفاخرة والمميزة التي تلبي جميع
            احتياجاتك
          </p>
        </div>
      </div>

      <section id="properties" className="container mx-auto px-4 z-20 relative">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="transform scale-100 opacity-100">
                <CardSkeleton />
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {properties.slice(startIndex, endIndex).map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>

            {/* Premium Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <Pagination className="bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 rounded-full px-4 py-2 inline-flex w-auto">
                  <PaginationContent className="gap-4">
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNext}
                        disabled={endIndex >= properties.length}
                        className="rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all disabled:opacity-30"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    </PaginationItem>

                    <div className="flex items-center gap-2 px-4 font-medium text-gray-600">
                      <span className="text-indigo-600 font-bold text-lg">
                        {currentPage}
                      </span>
                      <span className="text-gray-300">/</span>
                      <span>{totalPages}</span>
                    </div>

                    <PaginationItem>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handlePrevious}
                        disabled={startIndex === 0}
                        className="rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all disabled:opacity-30"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl shadow-sm border border-gray-100 mx-auto max-w-2xl">
            <div className="bg-gray-50 p-6 rounded-full mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-100/50 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
              <SearchX className="w-16 h-16 text-gray-400 relative z-10 transition-colors group-hover:text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              لا توجد عقارات حاليا
            </h3>
            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              لم نتمكن من العثور على أي عقارات متاحة في الوقت الحالي. يرجى
              التحقق مرة أخرى لاحقًا أو التواصل معنا.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

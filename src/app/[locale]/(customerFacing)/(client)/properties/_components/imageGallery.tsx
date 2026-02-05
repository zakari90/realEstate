"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function ImageGallery({ images = [] }: { images?: any[] }) {
  
  const [selectedImage, setSelectedImage] = useState<any>(null);

  return (
    <>
        {Array.isArray(images) && images.length > 0 ? 
        <div className="grid grid-cols-2 gap-2">
        {
          images.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                "relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]",
                "shadow-md hover:shadow-xl"
              )}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={`${image}?auto=format&fit=crop&w=800&q=80`}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 font-medium"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
         : (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">لا توجد صور متاحة</p>
          </div>

        )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0">
          {selectedImage && (
            <div className="relative w-full max-h-[90vh] flex items-center justify-center">
              <Image
                src={`${selectedImage}?auto=format&fit=crop&w=1600&q=90`}
                alt=""
                width={300 * 2}
                height={300 * 2}
                className="object-contain max-h-[90vh] rounded-lg"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

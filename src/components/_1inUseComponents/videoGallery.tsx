"use client";

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function VideoGallery({ propertyUrl, youtubeUrl}: { propertyUrl?: string, youtubeUrl?: string  }) {
  
  function transformToEmbedUrl(url: string): string | null {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }  
    return null;
  }
  const embedUrl = youtubeUrl? transformToEmbedUrl(youtubeUrl) : ""
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const listv = [propertyUrl, embedUrl]
  return (
    <>
        {Array.isArray(listv) && listv.length > 0 ? 
        <div className="grid grid-cols-2 gap-2">
        {
          listv.map((v, index) => (
            <div
              key={index}
              className={cn(
                "relative group cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]",
                "shadow-md hover:shadow-xl"
              )}
              onClick={() => setSelectedImage(v)}
            >
              <div className="aspect-[4/3] relative">
              <iframe
          width="100%"
          height="100%"
          src={v || ""}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          title="Property Video Tour"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 font-medium"></p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
         : (
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">لا يوجد فيديو </p>
          </div>

        )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-transparent border-0">
          {selectedImage && (
            <div className="relative w-full max-h-[90vh] flex items-center justify-center">
          <iframe
          width="100%"
          height="100%"
          src={selectedImage}
          className="object-contain max-h-[90vh] rounded-lg"
          title="Property Video Tour"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

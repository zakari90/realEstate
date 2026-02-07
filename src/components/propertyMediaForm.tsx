"use client";

import { addPropertyPanorama, addytVideo } from "@/_actions/agent/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import UploadImagesButton from "./uploadImagesButton";
import UploadVideoButton from "./uploadvideoButton";
import {
  HelpCircle,
  Image as ImageIcon,
  Video,
  Youtube,
  Globe,
  Loader2,
  PlayCircle,
  Eye,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PropertyMediaForm({ propertyId }: { propertyId: string }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [panoramaUrl, setPanoramaUrl] = useState<string>("");
  const [ytVideo, setytVideo] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (url: string) => {
    setVideoUrl(url || "");
  };

  const handlePanorama = (url: string) => {
    setPanoramaUrl(url || "");
  };

  const handleytVideo = (url: string) => {
    setytVideo(url || "");
  };

  const handleImagesUpload = (urls: string[]) => {
    setImagesUrl(urls);
  };

  async function addytPanorama() {
    if (imagesUrl.length === 0) {
      toast({
        title: "تنبيه",
        description: "يرجى إضافة صورة واحدة على الأقل.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await addytVideo(propertyId, ytVideo);
      await addPropertyPanorama(propertyId, panoramaUrl);

      toast({
        title: "تم نشر الملكية",
        description: "تم نشر الملكية بنجاح.",
        duration: 2000,
      });
      redirect(`/agent/properties`); // Redirect to list instead of details for now
    } catch (error) {
      console.log(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ البيانات.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function transformToEmbedUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    // Handle short urls like youtu.be
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch && shortMatch[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }
    return null;
  }
  const embedUrl = ytVideo ? transformToEmbedUrl(ytVideo) : "";

  const removeImage = (indexToRemove: number) => {
    setImagesUrl(imagesUrl.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Photos Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-bold">
            1
          </span>
          صور الملكية
        </h3>

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 transition-all hover:bg-slate-50/80">
          {imagesUrl.length > 0 ? (
            <div className="space-y-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md group">
                <Image
                  alt="الصورة الرئيسية"
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                  fill
                  src={imagesUrl[0] || ""}
                />
                <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                  الصورة الرئيسية
                </div>
                <button
                  onClick={() => removeImage(0)}
                  className="absolute top-4 left-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagesUrl.slice(1).map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm group"
                  >
                    <Image
                      alt={`صورة ${index + 1}`}
                      className="object-cover w-full h-full"
                      fill
                      src={url}
                    />
                    <button
                      onClick={() => removeImage(index + 1)}
                      className="absolute top-2 left-2 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}

                {/* Add more button placeholder */}
                <div className="aspect-square flex flex-col items-center justify-center bg-white rounded-lg border border-slate-200">
                  <UploadImagesButton
                    onImagesUpload={(urls) =>
                      handleImagesUpload([...imagesUrl, ...urls])
                    }
                    propertyId={propertyId}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h4 className="text-lg font-medium text-slate-700 mb-2">
                أضف صور عالية الجودة
              </h4>
              <p className="text-slate-500 max-w-sm mb-6">
                احرص على إضافة صور واضحة وجذابة لزيادة فرص بيع العقار.
              </p>
              <UploadImagesButton
                onImagesUpload={handleImagesUpload}
                propertyId={propertyId}
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. Video Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-bold">
              2
            </span>
            الفيديو التعريفي
          </h3>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm h-full">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
              <Video className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-slate-700">
                رفع فيديو مباشر
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>فيديو قصير يظهر تفاصيل العقار</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="p-6">
              {videoUrl ? (
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                  <video controls className="w-full h-full object-contain">
                    <source src={videoUrl} type="video/mp4" />
                    متصفحك لا يدعم الفيديو.
                  </video>
                  <button
                    onClick={() => setVideoUrl("")}
                    className="absolute top-2 left-2 p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors">
                  <UploadVideoButton
                    onVideoUpload={handleVideoUpload}
                    propertyId={propertyId}
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    MP4, WebM (Max 50MB)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 text-sm font-bold">
              3
            </span>
            يوتيوب وجولة افتراضية
          </h3>

          <div className="space-y-4">
            {/* Youtube */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-3 bg-red-50 border-b border-red-100 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" />
                <span className="font-medium text-slate-700">رابط يوتيوب</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="relative">
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={ytVideo}
                    onChange={(e) => handleytVideo(e.target.value)}
                    className="pl-10 h-11"
                    dir="ltr"
                  />
                  <Youtube className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
                {embedUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-100">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>

            {/* Panorama */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-slate-700">جولة 3D</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="relative">
                  <Input
                    placeholder="https://matterport.com/..."
                    value={panoramaUrl}
                    onChange={(e) => handlePanorama(e.target.value)}
                    className="pl-10 h-11"
                    dir="ltr"
                  />
                  <Globe className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                </div>
                {panoramaUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 relative group">
                    <iframe
                      src={panoramaUrl}
                      className="w-full h-full"
                    ></iframe>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="text-white font-medium flex items-center">
                        <Eye className="w-4 h-4 mr-2" /> معاينة
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex justify-end">
        <Button
          onClick={addytPanorama}
          className="w-full md:w-1/3 h-14 text-lg bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-xl rounded-xl transition-all duration-300 transform hover:-translate-y-1"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
              جارٍ النشر...
            </>
          ) : (
            <>
              <PlayCircle className="ml-2 h-5 w-5" />
              نشر العقار النهائي
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

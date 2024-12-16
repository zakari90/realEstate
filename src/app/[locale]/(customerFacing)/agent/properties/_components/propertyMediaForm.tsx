'use client'

import { addPropertyPanorama, addytVideo } from '@/_actions/agent/actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import UploadImagesButton from '@/components/uploadImagesButton'
import UploadVideoButton from '@/components/uploadvideoButton'
import { HelpCircle } from "lucide-react"
import Image from 'next/image'
import { useState } from 'react'



export function PropertyMediaForm({ propertyId, setstep} : {propertyId : string, setstep: (step: number) => void }) {
    

    const [videoUrl, setVideoUrl] = useState("");
    const [imagesUrl, setImagesUrl] = useState<string[]>([]);
    const [panoramaUrl, setPanoramaUrl] = useState<string>("");
    const [ytVideo, setytVideo] = useState<string>("");
  
    const examlepost = "http://localhost:3000/en/agent/properties/new?area=&city=&description=&landmark=&price=&propertyState=&propertyType=&streetAddress=&zip="
    const examplePanoramaUrl = "https://3dwarehouse.sketchup.com/embed/ca842bc2-6275-4a17-8e58-7d04f72b66be?token=JV26vmLOK4g=&binaryName=s22"
    const exampleVideoUrl = "https://utfs.io/f/814e6598-026c-49a8-8039-d6eac77fcc9c-castku.mp4"
  
    const handleVideoUpload = (url: string) => {
      console.log(url);
      const videoUrl = url || ""
      setVideoUrl(videoUrl);
    };
  
    const handlePanorama = (url: string) => {
      console.log(url);
      const panoramaUrl = url || ""
      setPanoramaUrl(panoramaUrl);
    };
    const handleytVideo= (url: string) => {
      console.log(url);
      const ytVideo = url || ""
      setytVideo(ytVideo);
    };
    const handleImagesUpload = (urls: string[]) => {
      console.log(urls);
      setImagesUrl(urls);
    };
  
    async function addytPanorama() {
      await addytVideo(propertyId, videoUrl)
      await addPropertyPanorama(propertyId, panoramaUrl);
    }
  
    function goBack() {
      setstep(1)
    }
  
    return (
    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
  {/* photos */}
      <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>صور العقار</CardTitle>
          </CardHeader>
          <CardContent>
                {imagesUrl?.length ? (
                <div className="grid gap-2">
            <Input type="url" id="imagesUrls" name="imagesUrls" className="hidden w-0 h-0" value={imagesUrl.join(', ')}/>
            <Image
              alt="صورة المنتج"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={imagesUrl[0] || ""}
              width="300"
            />
            <div className="grid grid-cols-3 gap-2">
              {imagesUrl.map((url, index) => (
                <button key={index}>
                  <Image
                    alt={`صورة المنتج ${index}`}
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={url}
                    width="84"
                  />
                </button>
              ))}
            </div>
          </div>
          ) : (
          <div className="space-y-2 flex flex-col items-center justify-center">
          <UploadImagesButton onImagesUpload={handleImagesUpload} propertyId={propertyId} />
          </div>
          )}
          </CardContent>
      </Card>
  {/* video */}
      <Card className="overflow-hidden" >
        <CardHeader>
          <CardTitle>فيديو العقار</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
          <Input type="url" id="video" name="video" className="hidden w-0 h-0" 
          readOnly value={videoUrl} />
          {videoUrl ? 
          <video controls className="aspect-square w-full rounded-md object-cover">
          <source 
          src={videoUrl}
          type="video/mp4" />
          متصفحك لا يدعم الفيديو.
        </video>
          :    
            <div className="space-y-2 flex flex-col items-center justify-center">
            <Label htmlFor="video">رابط الفيديو</Label>
            <UploadVideoButton onVideoUpload={handleVideoUpload} propertyId={propertyId}/>
          </div>}
        </div>
        </CardContent>
      </Card>
  {/* ytVideo */}
      <Card className="overflow-hidden">
        <CardHeader >
          <div className='flex gap-3'>
          <CardTitle>Youtube </CardTitle>
          <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                  <p>اضف رابط اليوتوب</p>
              </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
          <Input className={ytVideo ? `` : `hidden w-0 h-0`}  type="url" id="ytVideo" name="ytVideo" 
          value={ytVideo} onChange={(event) => handleytVideo(event.target.value)}/>
  
          {ytVideo ? 
          <div className="aspect-square rounded-md ">
          <iframe src={ytVideo} className="w-full h-full"></iframe>
          </div>
  
          :    
            <div className="space-y-2 flex flex-col items-center justify-center">
            <Label htmlFor="ytVideo">ytVideo</Label>
            <Input type="url" id="ytVideo" name="ytVideo" value={ytVideo} onChange={(event) => handleytVideo(event.target.value)}/>
          </div>}
        </div>
        </CardContent>
      </Card>
  {/* 3d */}
      <Card className="overflow-hidden">
        <CardHeader >
          <div className='flex gap-3'>
          <CardTitle>العرض ثلاثي الأبعاد</CardTitle>
          <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                  <p>أضف رابطًا لجولة افتراضية 360° للعقار إذا كانت متوفرة</p>
              </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
          <Input className={panoramaUrl ? `` : `hidden w-0 h-0`}  type="url" id="panorama" name="panorama" value={panoramaUrl} onChange={(event) => handlePanorama(event.target.value)}/>
  
          {panoramaUrl ? 
          <div className="aspect-square rounded-md ">
          <iframe src={panoramaUrl} className="w-full h-full"></iframe>
          </div>
  
          :    
            <div className="space-y-2 flex flex-col items-center justify-center">
            <Label htmlFor="panorama">رابط العرض ثلاثي الأبعاد</Label>
            <Input type="url" id="panorama" name="panorama" value={panoramaUrl} onChange={(event) => handlePanorama(event.target.value)}/>
          </div>}
        </div>
        </CardContent>
      </Card>
      <div>
      <Button onClick={addytPanorama} className="w-full">
        إرسال
      </Button>
      </div>
    </div>)
  }
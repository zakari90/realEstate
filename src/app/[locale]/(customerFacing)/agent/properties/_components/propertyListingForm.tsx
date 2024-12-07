'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle, Minus, Plus } from "lucide-react"
import { useState } from 'react'
import { useFormState } from "react-dom"
import { addProperty, addPropertyPanorama, AgentPropertyData, updateProperty } from '@/_actions/agent/actions'
import UploadImagesButton from '@/components/uploadImagesButton'
import UploadVideoButton from '@/components/uploadvideoButton'
import Image from 'next/image'

const initialState = {
    message: "",
  };
  interface InputField {
    id: number;
    value: string;
  }
export default function PropertyListingForm({property} : { property?: AgentPropertyData | null }) {
  

  const [propertyId, setPropertyId] = useState<string>("");
  const [step, setStep] = useState(1)

  const getPropertyId = (id: string) => {
    setPropertyId(id);
  };
  const setstep = (step: number) => {
    setStep(step);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>إضافة إعلان عقاري جديد</CardTitle>
      </CardHeader>
      <CardContent>
        { step === 1 ? 
        <InfoForm setstep={setstep} getPropertyId={getPropertyId} property={property}/> 
        : 
        <MediaForm propertyId={propertyId} setstep={setstep}/>
        }
      </CardContent>
    </Card>
  )
}
  
function InfoForm({property, getPropertyId , setstep } : { property?: AgentPropertyData | null, getPropertyId: (id: string) => void, setstep: (step: number) => void  }) {
     
  const[message, action ] = useFormState(property == null ? addProperty : updateProperty.bind(null,property.id) ,initialState)
  const [fields, setFields] = useState<InputField[]>([{ id: 0, value: '' }])
  
  const addField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 0
    setFields([...fields, { id: newId, value: '' }])
  }

  const removeField = (id: number) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const updateField = (id: number, value: string) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, value } : field
    ))
  }

  if (message.message[0] === "-") {
    getPropertyId(message.message.slice(1))
    setstep(2)
  }

  return(
    <>
    <form action={action} 
       className="space-y-6">
          <div className="space-y-2">
            <span className='flex gap-2'>
            <Label htmlFor="propertyType">نوع العقار</Label>
            <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>شقة، أرض، منزل ... </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
          <Input
              placeholder="نوع العقار..."
              name='propertyType'
              defaultValue={property?.type || ""}
          />
          </div>
          <div className="space-y-2">
          <span className='flex gap-2'>
          <Label htmlFor="propertyState">حالة العقار</Label>
            <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>إيجار، بيع، استثمار ... </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>

            <Input
              placeholder="حالة العقار..."
              name='propertyState'
              defaultValue={property?.state || ""}
              
          />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">السعر</Label>
            <Input  id="price" name='price' type="number" placeholder="450000 درهم" defaultValue={property?.price || ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">العنوان</Label>
            <Input id="address" name="address" placeholder="رقم 3، شارع، الدار البيضاء" required defaultValue={property?.address || ""} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="mapLink">رابط الخريطة</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className='aspect-square'>
                    <Image
                      width={200}
                      height={200}
                      src="/mapHelper/phonemap2.png" 
                      alt="مساعد الخريطة" />
                    <p>أضف رابطًا إلى خرائط جوجل أو خدمة خرائط أخرى توضح موقع العقار</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input name='mapLink' id="mapLink" type="url" placeholder="https://maps.google.com/..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">غرف النوم</Label>
              <Input id="bedrooms" name="bedrooms" type="number" placeholder="3" defaultValue={property?.bedrooms || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">الحمامات</Label>
              <Input id="bathrooms" name="bathrooms" type="number" placeholder="2" defaultValue={property?.bathrooms || ""}/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">المساحة م<sup>2</sup></Label>
            <Input id="area" name='area' type="number" placeholder="1500" defaultValue={property?.area || ""} />
          </div> 
          <div className="space-y-2">
            <Label htmlFor="description">الوصف</Label>
            <Textarea id="description" name='description' placeholder="صف العقار..." defaultValue={property?.description || ""} />
          </div>
          <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-grow">
                <Label htmlFor={`field-${field.id}`} className="sr-only">
                  إدخال {index + 1}
                </Label>
                <Input
                  id={`field-${field.id}`}
                  name='feature'
                  value={field.value}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={`أدخل القيمة ${index + 1}`}
                />
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeField(field.id)}
                  aria-label={`إزالة الإدخال ${index + 1}`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addField}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" /> إضافة إدخال
          </Button>
          </div>
          <Button type="submit" className="w-full" >إضافة إعلان عقاري</Button>
    </form>
    </>
  )
}

function MediaForm({property, propertyId, setstep} : { property?: AgentPropertyData | null , propertyId : string, setstep: (step: number) => void }) {
    

  const [videoUrl, setVideoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [panoramaUrl, setPanoramaUrl] = useState<string>("");

  const examlepost = "http://localhost:3000/en/agent/properties/new?area=&city=&description=&landmark=&price=&propertyState=&propertyType=&streetAddress=&zip="
  const examplePanoramaUrl = "https://3dwarehouse.sketchup.com/embed/ca842bc2-6275-4a17-8e58-7d04f72b66be?token=JV26vmLOK4g=&binaryName=s22"
  const exampleVideoUrl = "https://utfs.io/f/814e6598-026c-49a8-8039-d6eac77fcc9c-castku.mp4"

  const handleVideoUpload = (url: string) => {
    console.log(url);
    const videoUrl = url ? url : property?.video || ""
    setVideoUrl(videoUrl);
  };

  const handlePanorama = (url: string) => {
    console.log(url);
    const panoramaUrl = url ? url : property?.panorama || ""
    setPanoramaUrl(panoramaUrl);
  };
  
  const handleImagesUpload = (urls: string[]) => {
    console.log(urls);
    setImagesUrl(urls);
  };

  async function addPanorama() {
    await addPropertyPanorama(propertyId, panoramaUrl);
  }

  function goBack() {
    setstep(1)
  }

  return (
  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
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
    <Button onClick={addPanorama} className="w-full">
      إرسال
    </Button>
    </div>
  </div>)
}



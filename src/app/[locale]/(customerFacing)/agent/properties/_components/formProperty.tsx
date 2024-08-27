"use client"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import UploadImagesButton from "@/components/uploadImagesButton"
import UploadVideoButton from "@/components/uploadvideoButton"
import { useState } from "react"
import { addProperty } from "../../../../../_actions/actions"

export function FormProperty() {
  const [videoUrl, setVideoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [panoramaUrl, setPanoramaUrl] = useState<string>("");

const examlepost = "http://localhost:3000/en/agent/properties/new?area=&city=&description=&landmark=&price=&propertyStatus=&propertyType=&streetAddress=&zip="
  const examplePanoramaUrl = "https://3dwarehouse.sketchup.com/embed/ca842bc2-6275-4a17-8e58-7d04f72b66be?token=JV26vmLOK4g=&binaryName=s22"
  const exampleVideoUrl = "https://utfs.io/f/814e6598-026c-49a8-8039-d6eac77fcc9c-castku.mp4"
  const handleVideoUpload = (url: string) => {
    console.log(url);
    setVideoUrl(url);
  };

  const handleImagesUpload = (urls: string[]) => {
    console.log(urls);
    setImagesUrl(urls);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <form action={addProperty}>
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Add Property
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                {/* <Button  variant="outline" size="sm">
                  Discard
                </Button> */}
                <Button type="submit" size="sm">Save Product</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="mt-2">
                    <Select required name="propertyType">
                      <SelectTrigger>
                        <SelectValue placeholder="Property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-2">
                    <Select required name="propertyStatus">
                      <SelectTrigger>
                        <SelectValue placeholder="Property Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forSale">For Sale</SelectItem>
                        <SelectItem value="forRent">For Rent</SelectItem>
                        <SelectItem value="forInvestment">For Investment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="area">Area (m²)</Label>
                    <Input required type="number" id="area" name="area" />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="price">Price</Label>
                    <Input required type="number" id="price" name="price" />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" />
                  </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Property Address </CardTitle>
                  </CardHeader>
                  <CardContent>
                  <div className="mt-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input required type="text" id="streetAddress" name="streetAddress" />
                  </div>

                  <div className="mt-2">
                    <Label htmlFor="city">City</Label>
                    <Input required type="text" id="city" name="city" />
                  </div>
                  <div className="mt-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input type="text" id="zip" name="zip" />
                  </div>

                  <div className="mt-2">
                    <Label htmlFor="landmark">LandMark</Label>
                    <Textarea id="landmark" name="landmark" />
                  </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Proprety Features</CardTitle>
                    <CardDescription>
                      select proprety features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:space-x-2">
                    <div className="flex space-x-2 mt-2">
                      <Checkbox id="parkingSpot" name="parkingSpot" />
                      <label htmlFor="parkingSpot" className="text-sm font-medium">
                        Parking Spot
                      </label>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      <Checkbox id="swimmingPool" name="swimmingPool" />
                      <label htmlFor="swimmingPool" className="text-sm font-medium">
                        Swimming Pool
                      </label>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      <Checkbox id="gardenYard" name="gardenYard" />
                      <label htmlFor="gardenYard" className="text-sm font-medium">
                        Garden/Yard
                      </label>
                    </div>

                    <div className="flex space-x-2 mt-2">
                      <Checkbox id="balcony" name="balcony" />
                      <label htmlFor="balcony" className="text-sm font-medium">
                        Balcony
                      </label>
                    </div>
                    </div>                    

                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Proprety Images</CardTitle>
                  </CardHeader>
                  <CardContent>
  {imagesUrl?.length ? (
    <div className="grid gap-2">
        <Input required type="url" id="imagesUrl" name="imagesUrl" className="hidden w-0 h-0" 
        value={imagesUrl.join(', ')}
        readOnly
      />
      <Image
        alt="Product image"
        className="aspect-square w-full rounded-md object-cover"
        height="300"
        src={imagesUrl[0]}
        width="300"
      />
      <div className="grid grid-cols-3 gap-2">
        {imagesUrl.map((url, index) => (
          <button key={index}>
            <Image
              alt={`Product image ${index}`}
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
      <UploadImagesButton onImagesUpload={handleImagesUpload} />
    </div>
  )}
</CardContent>
                </Card>
                <Card
                  className="overflow-hidden"
                >
                  <CardHeader>
                    <CardTitle>Proprety Video</CardTitle>
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
                    Your browser does not support the video tag.
                  </video>
                    :    
                      <div className="space-y-2 flex flex-col items-center justify-center">
                      <Label htmlFor="video">Video URL</Label>
                      <UploadVideoButton onVideoUpload={handleVideoUpload} />
                    </div>}
                  </div>
                  </CardContent>
                </Card>

                <Card
                  className="overflow-hidden"
                >
                  <CardHeader>
                    <CardTitle>3D Presetation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                    <Input className={panoramaUrl ? `` : `hidden w-0 h-0`}  type="url" id="panorama" name="panorama" value={panoramaUrl} onChange={(event) => setPanoramaUrl(event.target.value)}/>

                    {panoramaUrl ? 
                    <div className="aspect-square w-full h-full rounded-md ">
                    <iframe src={panoramaUrl} className="w-full h-full"></iframe>
                    </div>

                    :    
                      <div className="space-y-2 flex flex-col items-center justify-center">
                      <Label htmlFor="panorama">3D Presetation Link</Label>
                      <Input type="url" id="panorama" name="panorama" value={panoramaUrl} onChange={(event) => setPanoramaUrl(event.target.value)}/>
                    </div>}
                  </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              {/* <Button variant="outline" size="sm">
                Discard
              </Button> */}
              <Button size="sm">Save Product</Button>
            </div>
            </form>

          </div>
        </main>
      </div>
    </div>
  )
}

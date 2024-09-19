'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus, Minus, HelpCircle } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"
import { addProperty, updateProperty } from '@/app/_actions/agent/actions'
import UploadVideoButton from '@/components/uploadvideoButton'
import Image from 'next/image'
import UploadImagesButton from '@/components/uploadImagesButton'

const initialState = {
    message: "",
  };
  interface InputField {
    id: number;
    value: string;
  }
export default function PropertyListingForm({property} : { property?: any | null }) {
    
  const[error, action ] = useFormState(property == null ? addProperty : updateProperty.bind(null,property.id) ,initialState)

  const [videoUrl, setVideoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [panoramaUrl, setPanoramaUrl] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("")
  const [propertyStatus, setPropertyStatus] = useState<string>("")
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


  const [fields, setFields] = useState<InputField[]>([{ id: 0, value: '' }])
  const [storedValues, setStoredValues] = useState<string[]>([])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newValues = fields.map(field => field.value).filter(value => value.trim() !== '')
    setStoredValues(prevValues => [...prevValues, ...newValues])
    setFields([{ id: 0, value: '' }]) // Reset to a single empty field after submission
  }
  const [selectedValue, setSelectedValue] = useState("")

  const handleValueChange = (value: string) => {
    setSelectedValue(value)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Property Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action}  
       className="space-y-6">
  
          <div className="space-y-2">
            <span className='flex gap-2'>
            <Label htmlFor="propertyType">Property Type</Label>
            <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Apartment, Land, House ... </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>

          <Input
              placeholder="Property Type..."
              name='propertyType'
              value={propertyType}
              onChange={(e)=>setPropertyType(e.target.value)}
          />
          </div>
          <div className="space-y-2">
          <span className='flex gap-2'>
          <Label htmlFor="propertyStatus">Property Status</Label>
            <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Rent, Sale, Investment ... </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>

            <Input
              placeholder="Property Status..."
              name='propertyStatus'
              value={propertyStatus}
              onChange={(e)=>setPropertyStatus(e.target.value)}
          />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input  id="price" name='price' type="number" placeholder="450000 DH" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="123 Main St, Anytown, USA 12345" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input id="bedrooms" name="bedrooms" type="number" placeholder="3"  />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" name="bathrooms" type="number" placeholder="2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">area m<sup>2</sup></Label>
            <Input id="area" name='area' type="number" placeholder="1500" />
          </div> 
          {/*
        TODO: when changing the uploadThing service 
          <div className="space-y-2">
            <Label>Images</Label>
            {images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={image}
                  onChange={(e) => handleFieldChange(index, e.target.value, setImages)}
                  placeholder="Image URL"
                />
                {index === images.length - 1 ? (
                  <Button type="button" size="icon" onClick={() => addField(setImages)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" size="icon" variant="destructive" onClick={() => removeField(index, setImages)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoLink">Video Tour Link</Label>
            <Input id="videoLink" type="url" placeholder="https://youtube.com/..." />
          </div>
          */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name='description' placeholder="Describe the property..." />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Proprety Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                  {imagesUrl?.length ? (
                  <div className="grid gap-2">
              <Input type="url" id="imagesUrls" name="imagesUrls" className="hidden w-0 h-0" 
                    value={imagesUrl.join(', ')}
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
                  <CardHeader >
                    <div className='flex gap-3'>
                    <CardTitle>3D Presetation</CardTitle>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Add a link to a 360° virtual tour of the property, if available</p>
                        </TooltipContent>
                    </Tooltip>
                    </TooltipProvider>
                    </div>
                 
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                    <Input className={panoramaUrl ? `` : `hidden w-0 h-0`}  type="url" id="panorama" name="panorama" value={panoramaUrl} onChange={(event) => setPanoramaUrl(event.target.value)}/>

                    {panoramaUrl ? 
                    <div className="aspect-square rounded-md ">
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
          <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <div className="flex-grow">
                <Label htmlFor={`field-${field.id}`} className="sr-only">
                  Input {index + 1}
                </Label>
                <Input
                  id={`field-${field.id}`}
                  name='feature'
                  value={field.value}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={`Enter value ${index + 1}`}
                />
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeField(field.id)}
                  aria-label={`Remove input ${index + 1}`}
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
            <Plus className="h-4 w-4 mr-2" /> Add Input
          </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="mapLink">Map Link</Label>
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
                      alt="map helper"                    />
                    <p>Add a link to Google Maps or another mapping service showing the property&apos;s location</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input name='mapLink' id="mapLink" type="text" placeholder="https://maps.google.com/..." />
          </div>
          <Button type="submit" className="w-full">Add Property Listing</Button>
        </form>
      </CardContent>
    </Card>
  )
}


interface Option {
  value: string
  label: string
}

interface InputWithDropdownProps {
  options?: Option[]
  placeholder?: string
  name?: string
}

export function InputWithDropdown({
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  placeholder = "Enter or select an option...",
  name = "name",
}: InputWithDropdownProps) {
  const [value, setValue] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSelectChange = (newValue: string) => {
    setValue(newValue)
  }

  const displayValue = options.find(option => option.value === value)?.label || value

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          name={name}
          onChange={handleInputChange}
          placeholder={placeholder}
          value={displayValue}
          className="flex-grow"
          aria-label={placeholder}
        />
        <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
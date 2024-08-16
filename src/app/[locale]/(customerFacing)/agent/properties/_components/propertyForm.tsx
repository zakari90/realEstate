"use client";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addProperty } from "../../_actions/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import UploadImagesButton from "@/components/uploadImagesButton";
import UploadVideoButton from "@/components/uploadvideoButton";
import { useState } from "react";

export function PropertyForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);

  const handleVideoUpload = (url: string) => {
    console.log(url);
    setVideoUrl(url);
  };

  const handleImagesUpload = (urls: string[]) => {
    console.log(urls);
    setImagesUrl(urls);
  };

  return (
    <form action={addProperty} className="space-y-8 m-auto md:w-1/2">
      <div className="space-y-2">
        <Select name="propertyType">
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
      <div className="space-y-2">
        <Select name="propertyStatus">
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

      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input type="text" id="price" name="price" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input type="text" id="streetAddress" name="streetAddress" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" name="city" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Input type="text" id="state" name="state" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="zip">Zip Code</Label>
        <Input type="text" id="zip" name="zip" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <Input type="number" id="bedrooms" name="bedrooms" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bathrooms">Bathrooms</Label>
        <Input type="number" id="bathrooms" name="bathrooms" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="area">Area (m²)</Label>
        <Input type="number" id="area" name="area" />
      </div>

      <div className="flex items-center space-x-2 space-y-2">
        <Checkbox id="parkingSpots" name="parkingSpots" />
        <label htmlFor="parkingSpots" className="text-sm font-medium">
          Has Parking Spots
        </label>
      </div>

      <div className="flex items-center space-x-2 space-y-2">
        <Checkbox id="swimmingPool" name="swimmingPool" />
        <label htmlFor="swimmingPool" className="text-sm font-medium">
          Has Swimming Pool
        </label>
      </div>

      <div className="flex items-center space-x-2 space-y-2">
        <Checkbox id="gardenYard" name="gardenYard" />
        <label htmlFor="gardenYard" className="text-sm font-medium">
          Has Garden/Yard
        </label>
      </div>

      <div className="flex items-center space-x-2 space-y-2">
        <Checkbox id="balcony" name="balcony" />
        <label htmlFor="balcony" className="text-sm font-medium">
          Has Balcony
        </label>
      </div>

      <div className="space-y-2 flex flex-col">
        <Label htmlFor="imagesUrl">Image URLs</Label>
        <UploadImagesButton onImagesUpload={handleImagesUpload} />
        <Input type="url" id="imagesUrl" name="imagesUrl" className="hidden" value={imagesUrl.join(', ')} />
        <div>{imagesUrl?.length ? `Images uploaded successfully` : "No images uploaded yet"}</div>
      </div>

      <div className="space-y-2 flex flex-col">
        <Label htmlFor="video">Video URL</Label>
        <UploadVideoButton onVideoUpload={handleVideoUpload} />
        <Input type="url" id="video" name="video" className="hidden" value={videoUrl} />
        <div>{videoUrl ? `Video uploaded successfully` : "No video uploaded yet"}</div>
        {videoUrl}
      </div>

      <div className="space-y-2">
        <Label htmlFor="panorama">Panorama URL</Label>
        <Input type="url" id="panorama" name="panorama" />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Rotate3DIcon, Video } from "lucide-react";
import ImageGallery from "./imageGallery";

interface MediaCardProps {
  propertyUrl?: string;
  youtubeUrl?: string;
  panoramaUrl?: string;
  images?: string[];
}
export default function MediaCard(
  {
    propertyUrl,
    youtubeUrl,
    panoramaUrl,
    images = [],
  }: MediaCardProps
) {

  function transformToEmbedUrl(url: string): string | null {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }  
    return null;
  }
  const embedUrl = youtubeUrl? transformToEmbedUrl(youtubeUrl) : ""

  return (
    <Card>
    <CardContent className="p-6">
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="images">
            <Video className="w-4 h-4 mr-2" />
            Images
          </TabsTrigger>
          <TabsTrigger value="video">
            <Video className="w-4 h-4 mr-2" />
            Video Tour
          </TabsTrigger>
          <TabsTrigger value="panorama">
            <Rotate3DIcon className="w-4 h-4 mr-2" />
            360° View
          </TabsTrigger>
          {/* <TabsTrigger value="map">
            <Map className="w-4 h-4 mr-2" />
            Map
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="images" className="mt-4">
            <ImageGallery images={images}/>
        </TabsContent>
        <TabsContent value="video" className="mt-4">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        {
      propertyUrl ? (
        <iframe
          width="100%"
          height="100%"
          src={propertyUrl}
          title="Property Video Tour"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : embedUrl ? (
        <iframe 
          width="560" 
          height="315" 
          src={embedUrl}
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
          <p className="text-muted-foreground">No videos available</p>
      )
    }
        </div>
        </TabsContent>
        <TabsContent value="panorama" className="mt-4">
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        {
      panoramaUrl ? (
        <iframe
          width="100%"
          height="100%"
          src={panoramaUrl}
          title="Property Video Tour"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>) : (
          <p className="text-muted-foreground">360° Panorama View Placeholder</p>
      )
    }
        </div>
        </TabsContent>
        {/* <TabsContent value="map" className="mt-4">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Google Maps Embed Placeholder</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1574.3173229769047!2d-5.687383368973645!3d33.87584251621207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDUyJzMyLjMiTiA1wrA0MScxNS42Ilc!5e1!3m2!1sen!2sma!4v1726392154192!5m2!1sen!2sma" width="600" height="450" 
             loading="lazy"></iframe>
          </div>
        </TabsContent> */}
      </Tabs>
    </CardContent>
  </Card>
)
}

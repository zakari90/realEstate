import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { addPropertyImages} from "@/_actions/agent/actions";

interface UploadImagesButtonProps {
  onImagesUpload: (urls: string[]) => void;
  propertyId: string
}
function UploadImagesButton({ onImagesUpload, propertyId }: UploadImagesButtonProps) {

  const uploadPropertyImages = propertyId ?
   <UploadButton<OurFileRouter,"imagesUploader">
    endpoint="imagesUploader"
    onClientUploadComplete={(res) => {
    const newUrls = res.map((file) => file.url);
    addImages(newUrls)
    onImagesUpload(newUrls);
    console.log("----------------" + newUrls + "Upload Completed: " +  newUrls.join(', '))
    // alert("Upload Completed: " + newUrls.join(', '));
  }}
  onUploadError={(error: Error) => {
    // Handle the error
    alert(`ERROR! ${error.message}`);
  }}
/>: 
""
  async function addImages(urls: string[]) {
    const urlString = urls.join(',');
    await addPropertyImages(propertyId, urlString);
  }
  
  return ( 
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
    {uploadPropertyImages}
  </div>);
}
export default UploadImagesButton
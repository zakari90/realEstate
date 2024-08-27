import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { Button } from "./ui/button";

interface UploadImagesButtonProps {
  onImagesUpload: (urls: string[]) => void;
}
function UploadImagesButton({ onImagesUpload }: UploadImagesButtonProps) {


  return (
      <Button className="bg-blue-600 p-2 w-[120px] h-[90px] hover:cursor-pointer rounded-sm">
      <UploadButton<OurFileRouter,"imagesUploader">
          endpoint="imagesUploader"
          onClientUploadComplete={(res) => {
            const newUrls = res.map((file) => file.url);
            onImagesUpload(newUrls); // Send the URLs to the parent component
            console.log("----------------" + newUrls + "Upload Completed: " +  newUrls.join(', '))
            // alert("Upload Completed: " + newUrls.join(', '));
          }}
          onUploadError={(error: Error) => {
            // Handle the error
            alert(`ERROR! ${error.message}`);
          }}
        />
      </Button>
  );
}
export default UploadImagesButton
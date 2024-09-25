import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { utapi } from "@/_actions/agent/actions";


function UploadImagesButton({ onImagesUpload, cancelUpload }: {onImagesUpload: (urls: string[]) => void, cancelUpload: () => void}) {


  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Upload Images</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
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
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button onClick={cancelUpload} type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  );
}
export default UploadImagesButton
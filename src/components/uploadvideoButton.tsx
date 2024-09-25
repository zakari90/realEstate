 import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
 
interface UploadVideoButtonProps {
  onVideoUpload: (url: string) => void;
}

function UploadVideoButton({ onVideoUpload }: UploadVideoButtonProps) {

  return (
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
      <UploadButton<OurFileRouter , "videoUploader">
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          onVideoUpload(res[0].url); // Send the URLs to the parent component
          console.log("----------------" + res + "Upload Completed: " + res[0].url)
          // alert("Upload Completed: " + res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default UploadVideoButton;

 import { addPropertyVideos } from "@/_actions/agent/actions";
import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
 
interface UploadVideoButtonProps {
  onVideoUpload: (url: string) => void;
  propertyId: string
}

function UploadVideoButton({ onVideoUpload, propertyId }: UploadVideoButtonProps) {

  async function addVideo(videoUrl: string) {
    await addPropertyVideos(propertyId, videoUrl);
  }

  return (
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
      <UploadButton<OurFileRouter , "videoUploader">
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          addVideo(res[0].url)
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

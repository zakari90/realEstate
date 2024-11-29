import { addPropertyVideos } from "@/_actions/agent/actions";
import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

interface UploadVideoButtonProps {
  onVideoUpload: (url: string) => void;
  propertyId: string;
}

function UploadVideoButton({ onVideoUpload, propertyId }: UploadVideoButtonProps) {

  async function addVideo(videoUrl: string) {
    await addPropertyVideos(propertyId, videoUrl);
  }

  return (
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
      <UploadButton<OurFileRouter, "videoUploader">
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0  && res[0]) { // Check if `res` is not empty
            const videoUrl = res[0].url;
            addVideo(videoUrl);
            onVideoUpload(videoUrl); // Send the URL to the parent component
            console.log("----------------" + res + " Upload Completed: " + videoUrl);
          } else {
            console.error("No files uploaded.");
          }
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}

export default UploadVideoButton;

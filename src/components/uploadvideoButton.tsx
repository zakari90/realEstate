import { addPropertyVideos } from "@/_actions/agent/actions";
import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";
import { useRef } from "react";

interface UploadVideoButtonProps {
  onVideoUpload: (url: string) => void;
  propertyId: string;
}

export default function UploadVideoButton({ onVideoUpload, propertyId }: UploadVideoButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Video selected:", file);
      // You can use the file URL locally or process the file here
      onVideoUpload(URL.createObjectURL(file)); // Example: using file URL locally
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Manually triggering file input click
    }
  };

  // Function to handle adding the video to the property
  async function addVideo(videoUrl: string) {
    await addPropertyVideos(propertyId, videoUrl);
  }

  return (
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
      {/* Hidden file input triggered by the button click */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden" // Hide default input element
        accept="video/*"
        onChange={handleFileSelect}
      />
      {/* Custom button that triggers the file input */}
      <button
        onClick={handleButtonClick}
        className="w-full h-full bg-blue-600 text-white rounded-sm"
      >
        Upload Video
      </button>

      <UploadButton<OurFileRouter, "videoUploader">
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          if (res && res.length > 0 && res[0]) {
            const videoUrl = res[0].url;
            addVideo(videoUrl); 
            onVideoUpload(videoUrl);
            console.log("Upload Completed: " + videoUrl);
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

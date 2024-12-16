"use client"
import { addPropertyVideos } from "@/_actions/agent/actions";
import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

interface UploadVideoButtonProps {
  onVideoUpload: (url: string) => void;
  propertyId: string;
}

export default function UploadVideoButton({ onVideoUpload, propertyId }: UploadVideoButtonProps) {

  async function addVideo(videoUrl: string) {
    try {
      await addPropertyVideos(propertyId, videoUrl);
      console.log("Video added successfully: " + videoUrl);
    } catch (error) {
      console.error("Error adding video: ", error);
    }
  }

  const uploadPropertyVideo = propertyId ? (
    <UploadButton<OurFileRouter, "videoUploader">
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          const videoUrl = res[0]?.url; 
          if (videoUrl) {
            addVideo(videoUrl);
            onVideoUpload(videoUrl); 
            console.log("Upload Completed: ", videoUrl);
          } else {
            console.error("Video URL is undefined or missing.");
          }
        } else {
          console.error("No files uploaded or response is empty.");
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  ) : null

  return (
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
      {uploadPropertyVideo}
    </div>
  );
}

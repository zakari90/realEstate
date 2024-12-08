"use client"

import { addPropertyVideos } from "@/_actions/agent/actions";
import { OurFileRouter } from "@/app/[locale]/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

interface UploadVideoButtonProps {
  onVideoUpload: (url: string) => void;
  propertyId: string;
}

import { useRef } from "react";

export default function UploadVideoButton({ onVideoUpload, propertyId }: UploadVideoButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Video selected:", file);
      // You can use the file URL or handle the upload
      onVideoUpload(URL.createObjectURL(file)); // Example: using file URL locally
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Manually triggering file input click
    }
  };

  return (
    <div className="bg-blue-600 p-2 w-[120px] h-[80px] hover:cursor-pointer rounded-sm">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden" // Hide default input element
        accept="video/*"
        onChange={handleFileSelect}
      />
      <button
        onClick={handleButtonClick}
        className="w-full h-full bg-blue-600 text-white rounded-sm"
      >
        Upload Video
      </button>
    </div>
  );
}


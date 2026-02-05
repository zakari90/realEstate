import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest } from 'next';

const f = createUploadthing();

export const ourFileRouter = {
  imagesUploader: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
  })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      
      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),

  videoUploader: f({
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req); // Get user ID from Clerk
      
      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),

  profilePicture: f(["image"])
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId };
    })
    .onUploadComplete((data) => console.log("file", data)),

  messageAttachment: f(["image", "video"])
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId };
    })
    .onUploadComplete((data) => console.log("file", data)),

  strictImageAttachment: f({
    image: { maxFileSize: "2MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId };
    })
    .onUploadComplete((data) => console.log("file", data)),

  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const { userId } = getAuth(req);
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId };
    })
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

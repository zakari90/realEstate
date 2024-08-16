import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imagesUploader: f({ image: { maxFileSize: "4MB" , maxFileCount: 5} })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);
 
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
        // Define as many FileRoutes as you like, each with a unique routeSlug
        videoUploader: f({video: { maxFileSize: "256MB", maxFileCount: 1 },})
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
          // This code runs on your server before upload
          const user = await auth(req);
     
          // If you throw, the user will not be able to upload
          if (!user) throw new UploadThingError("Unauthorized");
     
          // Whatever is returned here is accessible in onUploadComplete as `metadata`
          return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
          // This code RUNS ON YOUR SERVER after upload
          console.log("Upload complete for userId:", metadata.userId);
     
          console.log("file url", file.url);
     
          // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
          return { uploadedBy: metadata.userId };
        }),

  // Example "profile picture upload" route - these can be named whatever you want!
  profilePicture: f(["image"])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
 
  // This route takes an attached image OR video
  messageAttachment: f(["image", "video"])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
 
  // Takes exactly ONE image up to 2MB
  strictImageAttachment: f({
    image: { maxFileSize: "2MB", maxFileCount: 1, minFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
 
  // Takes up to 4 2mb images and/or 1 256mb video
  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 4 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    // .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
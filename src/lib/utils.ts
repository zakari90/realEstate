import { trackVisit } from "@/_actions/admin/admin";
import { type ClassValue, clsx } from "clsx"
import { NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function websiteVisitsTracker(req: NextRequest) {
  try {
    // Exclude visits to static assets and API routes
    if (!req.nextUrl.pathname.startsWith('/_next') && !req.nextUrl.pathname.includes('api')) {
      const pagePath = req.nextUrl.pathname;
      const location = "country: " + req.geo?.country + "region: " + req.geo?.region + "city: " + req.geo?.city
      // Get the page path (e.g., "/home", "/product/123")
      console.log("websiteVisitsTracker");
      console.log(pagePath);
      console.log(location)
      
      
      // Log the visit to the database
      await trackVisit(pagePath, location);
    }
  } catch (error) {
    console.error("Error tracking website visit:", error);
  }
  return NextResponse
}
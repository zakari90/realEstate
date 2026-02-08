"use server";

import db from "@/db/db";
import { analytics } from "@/lib/analytics";
import { headers } from "next/headers";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// ============= TRACKING FUNCTIONS =============

export async function trackPageVisit(pathname: string) {
  try {
    const headersList = headers();
    const country = headersList.get("x-vercel-ip-country") || "Unknown";
    const userAgent = headersList.get("user-agent") || "Unknown";

    await analytics.track(
      "pageviews",
      {
        pathname,
        country,
        userAgent,
      },
      {
        persist: false,
      },
    );
  } catch (error) {
    console.error("Tracking error:", error);
  }
}

export async function trackVisit(pagePath: string, location: string) {
  const visit = await db.visits.upsert({
    where: { pagePath },
    update: { totalVisits: { increment: 1 } },
    create: {
      pagePath,
      totalVisits: 1,
    },
  });

  await db.webVisitLog.create({
    data: {
      location,
      visitsId: visit.id,
    },
  });
}

export async function trackPageVisit2(page: string, ip: string) {
  return await db.analytics.create({
    data: {
      page,
      ip,
      createdAt: new Date(),
    },
  });
}

// ============= ADMIN DELETE FUNCTIONS =============

export async function deletePropertyAdmin(
  propertyId: string,
): Promise<{ success: boolean }> {
  try {
    // Get property to find associated files
    const property = await db.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new Error("Property not found");
    }

    // Delete images from uploadthing
    const images = property.images
      ? property.images
          .split(",")
          .map((image: string) =>
            image.replace("https://utfs.io/f/", "").trim(),
          )
          .filter(Boolean)
      : [];

    const video = property.video
      ? property.video.replace("https://utfs.io/f/", "")
      : "";

    if (video.length > 0) {
      await utapi.deleteFiles(video);
    }

    if (images.length > 0) {
      for (const image of images) {
        await utapi.deleteFiles(image);
      }
    }

    // Delete property (cascades to offers)
    await db.property.delete({
      where: { id: propertyId },
    });

    console.log("Admin: Property deleted successfully:", propertyId);
    return { success: true };
  } catch (error) {
    console.error("Admin: Error deleting property:", error);
    return { success: false };
  }
}

export async function deleteInvestmentAdmin(
  investmentId: string,
): Promise<{ success: boolean }> {
  try {
    // Delete investment (cascades to offers)
    await db.investment.delete({
      where: { id: investmentId },
    });

    console.log("Admin: Investment deleted successfully:", investmentId);
    return { success: true };
  } catch (error) {
    console.error("Admin: Error deleting investment:", error);
    return { success: false };
  }
}

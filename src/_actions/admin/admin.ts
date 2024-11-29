import db from "@/db/db";

export async function trackVisit(pagePath: string, location: string) {
    const visit = await db.visits.upsert({
      where: { pagePath },
      update: { totalVisits: { increment: 1 } },  // Increment visit count
      create: {
        pagePath,
        totalVisits: 1,
      },
    });
  
    // Log individual visit in WebVisitLog table
    await db.webVisitLog.create({
      data: {
        location,  // You can extract actual location from headers or geo info
        visitsId: visit.id,  // Link to the corresponding Visits table entry
      },
    });
  }

  export async function trackPageVisit(page: string, ip: string) {
    return await db.analytics.create({
      data: {
        page,
        ip,
        createdAt: new Date()
      }
    })
  }
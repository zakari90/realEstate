'use server';
import db from "@/db/db";
import { analytics } from '@/lib/analytics'; 
import { headers } from 'next/headers';

export async function trackPageVisit(pathname: string) {
  try {
    const headersList = headers();
    const country = headersList.get('x-vercel-ip-country') || 'Unknown';
    const userAgent = headersList.get('user-agent') || 'Unknown';

    await analytics.track('pageviews', {
      pathname,
      country,
      userAgent
    }, { 
      // Use default daily persistence 
      persist: false 
    });
  } catch (error) {
    console.error('Tracking error:', error);
  }
}




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

export async function trackPageVisit2(page: string, ip: string) {
  return await db.analytics.create({
    data: {
      page,
      ip,
      createdAt: new Date()
    }
  })
}
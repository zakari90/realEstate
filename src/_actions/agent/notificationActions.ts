"use server";

import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Hardcoded notification threshold
const VISIT_THRESHOLD = 3;

// Types
export interface NotificationData {
  id: string;
  type: string;
  message: string;
  entityId: string;
  entityType: string;
  isRead: boolean;
  createdAt: Date;
}

// =============================================
// Visit Tracking Functions
// =============================================

/**
 * Track a property visit and check if notification should be generated
 */
export async function trackPropertyVisit(propertyId: string) {
  try {
    // Get property to check if it exists and get agentId
    const property = await db.property.findUnique({
      where: { id: propertyId },
    });

    if (!property || !property.agentId) return;

    // Create visit log entry
    await db.propertyVisitLog.create({
      data: {
        propertyId,
        location: null,
      },
    });

    // Check engagement and potentially create notification
    await checkPropertyEngagement(propertyId, property.agentId);
  } catch (error) {
    console.error("Error tracking property visit:", error);
  }
}

/**
 * Track an investment visit and check if notification should be generated
 */
export async function trackInvestmentVisit(investmentId: string) {
  try {
    // Get investment to check if it exists and get agentId
    const investment = await db.investment.findUnique({
      where: { id: investmentId },
    });

    if (!investment || !investment.agentId) return;

    // Create visit log entry
    await db.investmentVisitLog.create({
      data: {
        investmentId,
        location: null,
      },
    });

    // Check engagement and potentially create notification
    await checkInvestmentEngagement(investmentId, investment.agentId);
  } catch (error) {
    console.error("Error tracking investment visit:", error);
  }
}

// =============================================
// Engagement Check & Notification Generation
// =============================================

/**
 * Check property engagement and create notification if visits >= threshold and no offers
 */
async function checkPropertyEngagement(propertyId: string, agentId: string) {
  try {
    // Count total visits
    const visitCount = await db.propertyVisitLog.count({
      where: { propertyId },
    });

    // If visits less than threshold, no notification needed
    if (visitCount < VISIT_THRESHOLD) return;

    // Check if property has any offers (interactions)
    const offerCount = await db.propertyOffer.count({
      where: { propertyId },
    });

    // If there are offers, no notification needed
    if (offerCount > 0) return;

    // Check if notification already exists for this property
    const existingNotification = await db.agentNotification.findFirst({
      where: {
        agentId,
        entityId: propertyId,
        entityType: "PROPERTY",
        isRead: false,
      },
    });

    // Don't create duplicate notifications
    if (existingNotification) return;

    // Get property address for message
    const property = await db.property.findUnique({
      where: { id: propertyId },
      select: { address: true },
    });

    // Create notification
    await db.agentNotification.create({
      data: {
        agentId,
        type: "LOW_ENGAGEMENT_PROPERTY",
        message: `La propriété "${property?.address || "Sans adresse"}" a reçu ${visitCount} visites sans aucune offre.`,
        entityId: propertyId,
        entityType: "PROPERTY",
      },
    });
  } catch (error) {
    console.error("Error checking property engagement:", error);
  }
}

/**
 * Check investment engagement and create notification if visits >= threshold and no offers
 */
async function checkInvestmentEngagement(
  investmentId: string,
  agentId: string,
) {
  try {
    // Count total visits
    const visitCount = await db.investmentVisitLog.count({
      where: { investmentId },
    });

    // If visits less than threshold, no notification needed
    if (visitCount < VISIT_THRESHOLD) return;

    // Check if investment has any offers (interactions)
    const offerCount = await db.investmentOffer.count({
      where: { investmentId },
    });

    // If there are offers, no notification needed
    if (offerCount > 0) return;

    // Check if notification already exists for this investment
    const existingNotification = await db.agentNotification.findFirst({
      where: {
        agentId,
        entityId: investmentId,
        entityType: "INVESTMENT",
        isRead: false,
      },
    });

    // Don't create duplicate notifications
    if (existingNotification) return;

    // Get investment title for message
    const investment = await db.investment.findUnique({
      where: { id: investmentId },
      select: { title: true },
    });

    // Create notification
    await db.agentNotification.create({
      data: {
        agentId,
        type: "LOW_ENGAGEMENT_INVESTMENT",
        message: `L'investissement "${investment?.title || "Sans titre"}" a reçu ${visitCount} visites sans aucune offre.`,
        entityId: investmentId,
        entityType: "INVESTMENT",
      },
    });
  } catch (error) {
    console.error("Error checking investment engagement:", error);
  }
}

// =============================================
// Agent Notification Management
// =============================================

/**
 * Get all notifications for the current agent
 */
export async function getAgentNotifications(): Promise<NotificationData[]> {
  try {
    const user = await currentUser();
    if (!user) return [];

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return [];

    const agent = await db.agent.findUnique({
      where: { email },
    });

    if (!agent) return [];

    const notifications = await db.agentNotification.findMany({
      where: { agentId: agent.id },
      orderBy: { createdAt: "desc" },
    });

    return notifications.map((n) => ({
      id: n.id,
      type: n.type,
      message: n.message,
      entityId: n.entityId,
      entityType: n.entityType,
      isRead: n.isRead,
      createdAt: n.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching agent notifications:", error);
    return [];
  }
}

/**
 * Get unread notification count for the current agent
 */
export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const user = await currentUser();
    if (!user) return 0;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return 0;

    const agent = await db.agent.findUnique({
      where: { email },
    });

    if (!agent) return 0;

    const count = await db.agentNotification.count({
      where: {
        agentId: agent.id,
        isRead: false,
      },
    });

    return count;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
}

/**
 * Mark a single notification as read
 */
export async function markNotificationAsRead(
  notificationId: string,
): Promise<boolean> {
  try {
    await db.agentNotification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    revalidatePath("/agent");
    return true;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
}

/**
 * Clear all notifications for the current agent
 */
export async function clearAllNotifications(): Promise<boolean> {
  try {
    const user = await currentUser();
    if (!user) return false;

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) return false;

    const agent = await db.agent.findUnique({
      where: { email },
    });

    if (!agent) return false;

    await db.agentNotification.deleteMany({
      where: { agentId: agent.id },
    });

    revalidatePath("/agent");
    return true;
  } catch (error) {
    console.error("Error clearing notifications:", error);
    return false;
  }
}

"use server";

import { PropertyFormData } from "@/components/propertyInfoForm";
import db from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { Client, Investment, InvestmentOffer } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import {
  agentFormSchema,
  InvestmentForm,
  propertyFormSchema,
} from "../zodSchema";
const utapi = new UTApi();

interface PropertyOffer {
  id: string;
  amount: number;
  period: string; // The offer period (e.g., loan period, lease period, etc.)
  propertyId: string | null; // The ID of the related Property (nullable if no property is linked)
  clientId: string | null; // The ID of the related Client (nullable if no client is linked)
  createdAt: Date; // The timestamp when the offer was created
  client?: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
  } | null;
  property?: {
    id: string;
    type: string | null;
    available: string | null;
    address: string | null;
    price: number | null;
  } | null; // The property details, optional if property doesn't exist
}

export interface AgentPropertyData {
  id: string;
  type: string | null;
  sellingBy: string | null;
  available: boolean | null;
  numContributors: number | null;
  address: string | null;
  mapUrl: string | null;
  description: string | null;
  price: number | null;
  area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  agentId: string | null;
  video: string | null;
  ytVideo: string | null;
  panorama: string | null;
  images: string | null;
  features: string | null;
  createdAt: Date;
  updatedAt: Date;
  offers: PropertyOffer[] | null;
  status: boolean | null;
  state: string | null;
}

//-----------------------------------------------------------investment-------------------------------

export interface investmentData {
  id: string;
  title: string;
  description: string;
  status: boolean | null;
  price: number | null;
  contribution: number | null;
  acceptedContributions: number | null;
  numContributors: number | null;
  location: string | null;
  purpose: string | null;
  createdAt: Date;
  updatedAt: Date;
  agentId: string | null;
  offers: {
    id: string;
    client: Client | null;
    createdAt: Date;
    clientName: string;
    clientEmail: string | null;
    clientPhone: string | null;
    offerAmount: number;
    accepted: boolean | null;
  }[];
}

const investmentDTO = (
  investmentData: Investment & { offers: InvestmentOffer[] },
): investmentData => {
  return {
    id: investmentData.id,
    title: investmentData.title,
    description: investmentData.description,
    status: investmentData.status,
    price: investmentData.price,
    contribution: investmentData.contribution,
    acceptedContributions: investmentData.acceptedContributions,
    numContributors: investmentData.numContributors,
    location: investmentData.location,
    purpose: investmentData.purpose,
    createdAt: investmentData.createdAt,
    updatedAt: investmentData.updatedAt,
    agentId: investmentData.agentId,
    // @ts-ignore
    offers: investmentData.offers.map((offer: InvestmentOffer) => ({
      id: offer.id,
      // @ts-ignore
      createdAt: offer.client?.createdAt ?? "Unknown",
      // @ts-ignore
      clientName: offer.client?.name ?? "Unknown",
      // @ts-ignore
      clientEmail: offer.client?.email ?? null,
      // @ts-ignore
      clientPhone: offer.client?.phone ?? null,
      offerAmount: offer.amount,
      accepted: offer.accepted ?? false,
    })),
  };
};

export async function getAgentInvestments(): Promise<{
  investment: investmentData[];
}> {
  try {
    // Assuming the agent is registered and we fetch the agent using a helper function
    const agent = await registerClerkUserAsAgent();
    if (!agent) {
      console.log("Agent not found");
      return { investment: [] };
    }

    // Fetch investments associated with the agent
    const investments = await db.investment.findMany({
      where: { agentId: agent.id },
      include: {
        offers: {
          include: {
            client: true, // Ensure client info is included in each offer
          },
        },
      },
    });

    // Map over the investments and format them using the DTO
    const formattedInvestments = investments.map((investment) =>
      investmentDTO(investment),
    );

    // Return the formatted investments
    return { investment: formattedInvestments };
  } catch (error) {
    console.error("Error fetching investments for agent:", error);
    throw new Error("Error fetching investments");
  }
}

export async function createInvestment(params: InvestmentForm) {
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error("User email not found");
    }

    const investment = await db.investment.create({
      data: {
        title: params.title,
        description: params.description,
        price: params.price,
        contribution: params.contribution,
        numContributors: params.numContributors,
        location: params.location,
        purpose: params.purpose,
        agentId: clerkAgent.id,
        acceptedContributions: 0,
        status: true,
      },
    });
    return { message: `${investment.id}` };
  } catch (error) {
    return { message: "Failed to create investment", error };
  } finally {
    await db.$disconnect();
  }
}

export async function createInvestmentOffer(
  params: any,
): Promise<{ message: boolean }> {
  try {
    const newClient = await db.client.create({
      data: {
        phone: params.clientPhone,
        email: params.clientEmail || "",
        name: params.clientName || "",
      },
    });

    const i = await db.investmentOffer.create({
      data: {
        investmentId: params.investmentId,
        clientId: newClient.id,
        amount: params.clientOffer,
        accepted: false,
      },
    });

    console.log("/////////////////////" + i.amount);

    return { message: true };
  } catch (error) {
    console.error("An unexpected error occurred while creating offer:", error);
    return { message: false };
  } finally {
    await db.$disconnect();
  }
}

async function updateAcceptedContributions(investmentId: string) {
  try {
    const acceptedOffers = await db.investmentOffer.findMany({
      where: {
        investmentId: investmentId,
        accepted: true, // Only consider accepted offers
      },
    });
    const totalAcceptedContributions = acceptedOffers.reduce(
      (sum, offer) => sum + offer.amount,
      0,
    );

    await db.investment.update({
      where: { id: investmentId },
      data: {
        acceptedContributions: totalAcceptedContributions,
      },
    });
    console.log(
      `Updated acceptedContributions for investment ${investmentId} to ${totalAcceptedContributions}`,
    );
  } catch (error) {
    console.error("Error updating accepted contributions:", error);
  }
}

export async function updateInvestementOfferStatus(
  investmentOfferId: string,
  status: boolean,
) {
  console.log("/// updateInvestementOfferStatus");
  console.log(investmentOfferId);

  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error("User email not found");
    }

    const updatedOffer = await db.investmentOffer.update({
      where: { id: investmentOfferId },
      data: { accepted: status },
    });

    await updateAcceptedContributions(updatedOffer.investmentId);

    console.log("Investment offer updated successfully");

    return {
      success: true,
      message: "Investment offer updated successfully.",
      offer: updatedOffer,
    };
  } catch (error) {
    console.error("Error updating investment offer:", error);
    return {
      success: false,
      message: "Failed to update investment offer: " + error,
    };
  }
}

export async function deleteInvestementById(
  id: string,
): Promise<{ success: boolean }> {
  try {
    await db.investment.delete({
      where: { id: id },
    });

    console.log("Property deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("Error deleting files or property:", error);
    return { success: false };
  } finally {
    // Ensure redirect is properly handled outside this function
    redirect("/agent/investors");
  }
}

//------------------------------------------------------------- property------------------------------------
export async function addProperty(params: PropertyFormData) {
  console.log("**********************************************************");
  console.log(typeof params.features);
  console.log(params.features);
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error("User email not found");
    }
    const features = JSON.stringify(params.features);
    const property = await db.property.create({
      data: {
        type: params.type,
        sellingBy: params.sellingBy,
        address: params.address,
        numContributors: params.numContributors,
        mapUrl: params.mapLink,
        description: params.description,
        price: params.price,
        area: params.area,
        agentId: clerkAgent.id,
        bedrooms: params.bedrooms,
        bathrooms: params.bathrooms,
        ytVideo: "",
        video: "",
        panorama: "",
        images: "",
        features: features,
        available: true,
      },
    });
    return { message: property.id };
  } catch (error) {
    return { message: "Failed to create investment", error };
  } finally {
    await db.$disconnect();
  }
}

export async function updatePropertyStatus(
  propertyId: string,
  available: boolean,
) {
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error("User email not found");
    }

    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new Error("Property not found");
    }
    console.log(property.available);

    const updatedProperty = await db.property.update({
      where: { id: propertyId },
      data: { available },
    });
    console.log(property.available);
    console.log("-----------------------------------------------------");

    console.log("Property updated successfully");
    return {
      success: true,
      message: "Property updated successfully.",
      property: updatedProperty,
    };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, message: "Failed to update property: " + error };
  } finally {
    db.$disconnect();
  }
}

export async function addPropertyPanorama(
  propertyId: string,
  panoramaUrl: string,
) {
  try {
    if (!panoramaUrl) {
      return { message: "Panorama URL is required." };
    }

    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error("User email not found");
    }

    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new Error("Property not found");
    }

    await db.$transaction(async (tx) => {
      await db.property.update({
        where: { id: propertyId },
        data: { panorama: panoramaUrl },
      });

      console.log("Property updated successfully");
    });

    return { message: property.id };
  } catch (error) {
    console.error("Error updating property:", error); // Log the error for debugging
    return { message: "Failed to update property: " + error }; // Return error message
  } finally {
    // Ensure redirect is properly defined or handled outside this function
    redirect("/agent/properties");
  }
}

export async function addytVideo(propertyId: string, ytVideo: string) {
  try {
    if (!ytVideo) {
      return { message: "Panorama URL is required." };
    }

    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error("User email not found");
    }

    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new Error("Property not found");
    }

    await db.$transaction(async (tx) => {
      await db.property.update({
        where: { id: propertyId },
        data: { ytVideo },
      });
    });

    return { message: property.id };
  } catch (error) {
    console.error("Error updating property:", error); // Log the error for debugging
    return { message: "Failed to update property: " + error }; // Return error message
  } finally {
    redirect("/agent/properties");
  }
}
export async function addPropertyImages(
  propertyId: string,
  imagesUrls: string,
) {
  try {
    if (!imagesUrls) {
      // Return the errors to be displayed in the form
      return { message: "Failed to update todo" };
    }

    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error("User email not found");
    }
    await db.$transaction(async (tx) => {
      if (!clerkAgent) {
        throw new Error("agent not found");
      }

      const property = await db.property.findUnique({
        where: { id: propertyId },
      });
      if (!property) {
        throw new Error("Property not found");
      }
      // Update the property
      await db.property.update({
        where: { id: propertyId },
        data: {
          images: imagesUrls,
        },
      });

      return { message: property.id };
    });
  } catch (error) {
    return { message: "Failed to update todo" + error };
  } finally {
    db.$disconnect();
  }
}

export async function addPropertyVideos(propertyId: string, videoUrl: string) {
  try {
    if (!videoUrl) {
      return { message: "Failed to update todo" };
    }

    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error("User email not found");
    }

    await db.$transaction(async (tx) => {
      if (!clerkAgent) {
        throw new Error("agent not found");
      }

      const property = await db.property.findUnique({
        where: { id: propertyId },
      });
      if (!property) {
        throw new Error("Property not found");
      }

      await db.property.update({
        where: { id: propertyId },
        data: {
          video: videoUrl,
        },
      });
    });
  } catch (error) {
    return { message: "Failed to update todo" + error };
  } finally {
    db.$disconnect();
  }
}

export async function updateProperty(
  propertyId: string,
  prevState: { message: string } | undefined,
  formData: FormData,
): Promise<any> {
  const propertyType = formData.get("propertyType") as string | null;
  const propertyState = formData.get("propertyState") as string | null;
  const propertyStatus = formData.get("propertyStatus") as boolean | null;
  const address = formData.get("address") as string | null;
  const mapLink = formData.get("mapLink") as string | null;
  const price = formData.get("price") as string | null;
  const area = formData.get("area") as string | null;
  const bedrooms = formData.get("bedrooms") as string | null;
  const bathrooms = formData.get("bathrooms") as string | null;
  const description = formData.get("description") as string | null;
  const imagesUrls = formData.get("imagesUrls") as string | null;
  const video = formData.get("video") as string | null;
  const panorama = formData.get("panorama") as string | null;
  const featureArray = formData.getAll("feature") as string[];
  const feature = featureArray.length > 0 ? featureArray.join(",") : null;

  try {
    const result = propertyFormSchema.safeParse({
      propertyType,
      propertyState,
      propertyStatus,
      price,
      address,
      bedrooms,
      bathrooms,
      area,
      video,
      panorama,
      feature,
      mapLink,
      imagesUrls,
      description,
    });
    if (!result) {
      // Return the errors to be displayed in the form
      return { message: "Failed to update todo" };
    }

    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error("User email not found");
    }
    await db.$transaction(async (tx) => {
      if (!clerkAgent) {
        throw new Error("agent not found");
      }

      const data = result.data;
      if (!data) {
        throw new Error("formdata input error");
      }

      const property = await db.property.findUnique({
        where: { id: propertyId },
      });
      if (!property) {
        throw new Error("Property not found");
      }
      // Update the property
      await db.property.update({
        where: { id: propertyId },
        data: {
          type: data.propertyType,
          available: data.propertyStatus,
          address: data.address,
          mapUrl: data.mapLink,
          description: data.description,
          price: data.price,
          area: data.area,
          agentId: clerkAgent.id,
          video: data.video,
          panorama: data.panorama,
          images: data.imagesUrls,
          features: data.feature,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
        },
      });

      console.log("property updated successfully");

      db.$disconnect();
      redirect("/agent/properties");
      // return { message: "Property updated successfully" };
    });
  } catch (error) {
    return { message: "Failed to update todo" + error };
  }
}

export async function getPropertyById(propertyId: string): Promise<any> {
  try {
    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new Error("Property not found");
    }
    console.log("getPropertyById successfully");
    return property;
  } catch (error) {
    return { message: "Failed to update todo" + error };
  }
}

export async function registerClerkUserAsAgent() {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      throw new Error("User email not found");
    }
    const email = user.emailAddresses[0]?.emailAddress;
    let agent = await db.agent.findUnique({
      where: { email: email },
    });

    if (!agent) {
      agent = await db.agent.create({
        data: {
          email: email,
          clerkId: user.id,
          image: user.imageUrl,
          name: user.fullName,
        },
      });
    }

    return agent; // Returns the agent data
  } catch (error) {
    console.error("Error fetching or creating agent data:", error);
    throw error; // Re-throw error for higher-level handling
  }
}

export async function updateAgentData(phoneNumber: string) {
  console.log("//////////////////////////////////////////////");
  console.log(phoneNumber);

  try {
    const user = await currentUser();
    if (!phoneNumber) {
      throw new Error("Phone number is missing");
    }
    console.log(user);
    const result = agentFormSchema.safeParse({ phoneNumber });

    if (!result.success) {
      console.log("Agent phone number error:", result.error);
      throw new Error("Invalid phone number");
    }
    await db.agent.update({
      where: { clerkId: user?.id },
      data: {
        phone: result.data.phoneNumber,
      },
    });
    redirect("/agent/properties");
  } catch (error) {
    console.error("Error updating agent data:", error);
    throw error; // Re-throw error for higher-level handling
  }
}

export async function createPropertyOffer(
  params: any,
): Promise<{ message: boolean }> {
  console.log("**********************************************************");
  console.log("createPropertyOffer function");
  console.log("Received params:", typeof params.clientPeriod); // Log the incoming params to make sure they are correct.
  console.log("**********************************************************");

  try {
    // First, create the client record.
    const newClient = await db.client.create({
      data: {
        phone: params.clientPhone,
        email: params.clientEmail || "",
        name: params.clientName || "",
      },
    });
    console.log("Client created:", newClient);
    const period = params.clientPeriod + "";
    // Then, create the property offer.
    const propertyOffer = await db.propertyOffer.create({
      data: {
        propertyId: params.propertyId,
        clientId: newClient.id,
        amount: params.clientOffer,
        period: period,
      },
    });
    console.log("Property offer created:", propertyOffer);

    return { message: true };
  } catch (error) {
    console.error("An unexpected error occurred while creating offer:", error);
    // Return false if anything goes wrong.
    return { message: false };
  }
}

export async function deletePropertyById(id: string) {
  try {
    const property = await getPropertyById(id);

    // Extract images and video from the property
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
        console.log("Deleting image successfully:", image);
      }
    }
    await db.property.delete({
      where: { id: property.id },
    });

    console.log("Property deleted successfully");
    return { success: true };
  } catch (error) {
    console.error("Error deleting files or property:", error);
    return { success: false, error: "Failed to delete property or files" };
  } finally {
    // Ensure redirect is properly handled outside this function
    redirect("/agent/properties");
  }
}

export async function getPropertyOffers(
  propertyId: string,
): Promise<{ propertyOffers: any[] }> {
  try {
    const propertyOffers = await db.propertyOffer.findMany({
      where: { propertyId: propertyId },
      include: {
        client: true,
      },
    });

    return { propertyOffers };
  } catch (error) {
    // Log the error or handle it accordingly
    console.error("Error fetching property offers:", error);

    // Return an empty array or handle the error as needed
    return { propertyOffers: [] };
  }
}

export async function getAgentProperties(): Promise<{ properties: any[] }> {
  try {
    const agent = await registerClerkUserAsAgent();
    if (!agent) {
      console.log("Agent not found");
      return { properties: [] };
    }
    const properties = await db.property.findMany({
      where: { agentId: agent.id },
      include: {
        offers: {
          include: {
            client: true,
          },
        },
        agent: true,
      },
    });

    return { properties };
  } catch (error) {
    console.error("Error fetching properties with details for agent:", error);
    throw new Error("Error fetching properties");
  }
}

export async function getAgentPropertyOffers(propertyId: string) {
  try {
    const propertyImages = await db.propertyOffer.findMany({
      where: {
        propertyId: propertyId,
      },
    });
    return propertyImages;
  } catch (error) {
    console.error(
      "Error fetching property OFFERS with details for agent:",
      error,
    );

    throw error; // Handle the error appropriately
  }
}

export async function getAgentClients() {
  const agent = await registerClerkUserAsAgent();
  if (!agent) {
    console.log("agent not found");
    return notFound();
  }
  const agentId = agent.id;
  const data = await db.client.aggregate({
    where: {
      offers: {
        property: {
          agentId: agentId,
        },
      },
    },
    _count: true,
  });
  return {
    numberOfOffers: data._count || 0,
  };
}

export async function updateInvestmentStatus(id: string, status: boolean) {
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error("User email not found");
    }

    const investment = await db.investment.findUnique({ where: { id } });
    if (!investment) {
      throw new Error("Property not found");
    }

    const updateInvestment = await db.investment.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      message: "Property updated successfully.",
      property: updateInvestment,
    };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, message: "Failed to update property: " + error };
  } finally {
    redirect("/agent/investors");
  }
}

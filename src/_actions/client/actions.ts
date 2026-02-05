"use server"

import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { Agent, InvestmentOffer } from "@prisma/client";
import { notFound } from "next/navigation";

export async function isAgent(): Promise<boolean> {
  const { userId } = auth();

  if (!userId) return false;
  return true;
}

export type InvestmentDTO = { 
  id: string;
  title: string | null;
  description: string | null;
  status: boolean | null;
  price: number | null;
  contribution: number | null;
  acceptedContributions: number | null;
  numContributors: number | null;
  location: string | null;
  purpose: string | null;
  createdAt: Date;
  updatedAt: Date;
  agent: Agent | null; 
};

const createInvestmentDTO = (investmentData: InvestmentDTO) => {
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
    agent: investmentData.agent,
  };
};

export const searchInvestmentsByLocation = async (location: string) => {
  console.log("---------------------");
  console.log("searchInvestmentsByLocation ")
  
  const investments = await db.investment.findMany({
      where: {
          location: {
              contains: location,
          },
      },
      include:{
        agent: true, 
      }
  });
  return investments.map(investment => createInvestmentDTO(investment));

};

export async function getAllInvestments() {
  try {
    const investments = await db.investment.findMany({
      include: {
        agent: true, 
      },
      where:{
        status:true
      }
    });

    return investments.map(investment => createInvestmentDTO(investment));

  } catch (error) {
    console.error('Error fetching investments with details for agent:', error);
    throw error; 
  }
}

export async function getInvestmentWithId(investmentId: string) {
  try {
    const investment = await db.investment.findUnique({
      where: { id: investmentId },
      include: { agent: true },
    });

    if (!investment) {
      return notFound()
    }

    return createInvestmentDTO(investment);

  } catch (error) {
    console.error('Error fetching investment with details for agent:', error);
    throw error; 
  }
}
export async function getAcceptedInvestmentOffersSum(investmentId: string): Promise<number> {
  try {
    const result = await db.investmentOffer.aggregate({
      _sum: {
        amount: true,  // Sum the 'amount' field
      },
      where: {
        investmentId: investmentId,  // Filter by the provided investmentId
        // accepted: true,               // Only include accepted offers
      },
    });

    // If the result doesn't contain a sum, return 0
    return result._sum.amount ?? 0;
  } catch (error) {
    console.error('Error fetching sum of accepted investment offers:', error);
    throw error;  // Rethrow the error after logging it
  }
}

export async function getInvestmentOffersId(Id: string): Promise<InvestmentOffer[] | null> {
  try {
    if (!Id) {
      return null; 
    }

    const investmentOffers = await db.investmentOffer.findMany({
      where: {
        investmentId: Id,
        // accepted:true
      },
    });

    if (investmentOffers.length === 0) {
      return null;
    }

    return investmentOffers;  
  } catch (error) {
    console.error('Error fetching investment details for agent:', error);
    throw error;  // Re-throw the error after logging it
  }
}

// -----------------------------------------------Property

export type PropertyDTO = {
  id: string;
  type: string | null;
  sellingBy: string | null; // Added from Prisma model
  available: boolean | null; // Corresponds to 'available' in Prisma model, instead of 'status'
  numContributors: number | null; // Added from Prisma model
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
  agent: Agent | null;
};

const createPropertyDTO = (propertyData: PropertyDTO) => {
  return {
    id: propertyData.id,
    type: propertyData.type,
    sellingBy :propertyData.sellingBy,
    numContributors :propertyData.numContributors,
    available: propertyData.available,
    address: propertyData.address,
    mapUrl: propertyData.mapUrl,
    description: propertyData.description,
    price: propertyData.price,
    area: propertyData.area,
    bedrooms: propertyData.bedrooms,
    bathrooms: propertyData.bathrooms,
    agentId: propertyData.agentId,
    video: propertyData.video,
    ytVideo: propertyData.ytVideo,
    panorama: propertyData.panorama,
    images: propertyData.images,
    features: propertyData.features,
    createdAt: propertyData.createdAt,
    updatedAt: propertyData.updatedAt,
    agent: propertyData.agent, // Include agent mapping
  };
}

export const searchPropertiesByLocation = async (location: string) => {
  console.log("******************************************")
  console.log(location);
  
  const properties = await db.property.findMany({
      where: {
          address: {
              contains: location,
              // mode: 'insensitive',
          },
      }, 
      include :{
        agent : true
      }
  });
  return properties.map(property => createPropertyDTO(property));

};

export async function getAllProperties() {
  try {
    const properties = await db.property.findMany({
      include: {
        agent: true, 
      },
      where:{
        available:true
      }
    });

    return properties.map(property => createPropertyDTO(property));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; 
  }
}

export async function getPropertyWithId(propertyId: string) {
  try {
    const property = await db.property.findUnique({
      where: { id: propertyId },
      include: { agent: true },
    });

    if (!property) {
      return notFound();
    }

    return createPropertyDTO(property);

  } catch (error) {
    console.error('Error fetching property with details for agent:', error);
    throw error; 
  }
}

export async function getAgentWithPropertyId(agentId : string):Promise<Agent | null> {
  try {
    const agent = await db.agent.findUnique(
      {where: {id : agentId}});
    if (!agent) {
      return null;
    }
    return (agent);

  } catch (error) {
    console.error('Error fetching agent:', error);
    throw error; 
  }
}
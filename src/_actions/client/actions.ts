"use server"

import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import { Agents, Property } from "@prisma/client";
import { notFound } from "next/navigation";
import { boolean } from "zod";



export type ClientProperty = {
  id: string
  type: string | null
  status: string | null
  address: string | null
  mapUrl: string | null
  description: string | null
  price: number | null
  area: number | null
  bedrooms: number | null
  bathrooms: number | null
  agentId: string | null
  video: string | null
  panorama: string | null
  images: string | null
  features: string | null
  createdAt: Date
  updatedAt: Date
}

export async function isAgent(): Promise<boolean> {
  const { userId } = auth();

  if (!userId) return false;
  return true;
}
const createPropertyDTO = (propertyData:ClientProperty) =>{
  return{        
      id: propertyData.id,
      type: propertyData.type,
      status: propertyData.status,
      address: propertyData.address,
      mapUrl:propertyData.mapUrl,
      description: propertyData.description,
      price: propertyData.price,
      area: propertyData.area,
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      agentId: propertyData.agentId,
      video: propertyData.video,
      panorama: propertyData.panorama,
      images: propertyData?.images,
      features: propertyData.features,

      createdAt: propertyData.createdAt,
      updatedAt: propertyData.updatedAt,

    }
  
}

export async function getAllProperties() {
  try {
    const properties = await db.property.findMany();

    return properties.map(property => (createPropertyDTO(property)
));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; // Handle the error appropriately
  }
}

export async function getRecentProperties() {
try {
  const properties = await db.property.findMany({
    take:6
    
  });

  return properties.map(property => (createPropertyDTO(property)));

} catch (error) {
  console.error('Error fetching properties with details for agent:', error);
  throw error; // Handle the error appropriately
}
}

export async function getPropertyWithId(propertyyId : string) {
  try {
    const property = await db.property.findUnique(
      {where: {id : propertyyId}});
    if (!property) {
      return notFound()
    }
    return (createPropertyDTO(property));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; // Handle the error appropriately
  }
}

export async function getAgentWithPropertyId(agentId : string):Promise<Agents | null> {
  try {
    const agent = await db.agents.findUnique(
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
"use server"

import db from "@/db/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { agentFormSchema, clientFormSchema, offerFormSchema, propertyFormSchema } from "../zodSchema"
import { Client, Investment, InvestmentOffer } from "@prisma/client"
import { count, error } from "console"
import { UTApi } from "uploadthing/server"
import { useRouter } from "next/router"
import { boolean } from "zod"
import { title } from "process"
const utapi = new UTApi();

interface PropertyOffer {
  id: string;
  amount: number;         // The amount offered for the property
  period: string;         // The offer period (e.g., loan period, lease period, etc.)
  propertyId: string | null;  // The ID of the related Property (nullable if no property is linked)
  clientId: string | null;    // The ID of the related Client (nullable if no client is linked)
  createdAt: Date;        // The timestamp when the offer was created
  client?: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
  } | null;                // The client details, optional if client doesn't exist
  property?: {
    id: string;
    type: string | null;
    state: string | null;
    address: string | null;
    price: number | null;
    area: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
  } | null;                // The property details, optional if property doesn't exist
}


export interface AgentPropertyData {
  id: string;
  type: string | null; 
  description: string | null; 
  price: number | null;
  agentId: string | null;
  address: string | null; 
  area: number | null; 
  bathrooms: number | null; 
  bedrooms: number | null; 
  createdAt: Date;
  features: string | null; 
  images: string | null; 
  mapUrl: string | null; 
  offers: PropertyOffer[] | null; 
  panorama: string | null; 
  status: boolean | null;  
  state: string | null;
  updatedAt: Date;
  video: string | null; 
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
    id:string
    client: Client | null ;
    createdAt: Date;
    clientName: string;
    clientEmail: string | null;
    clientPhone: string | null;
    offerAmount: number;
    accepted: boolean | null;
  }[];
}

const investmentDTO = (investmentData: Investment & { offers: InvestmentOffer[] }): investmentData => {
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
      offers: investmentData.offers.map((offer:InvestmentOffer) => ({
        id : offer.id,
        // @ts-ignore
        createdAt: offer.client?.createdAt ?? 'Unknown',  
        // @ts-ignore
        clientName: offer.client?.name ?? 'Unknown',
        // @ts-ignore
        clientEmail: offer.client?.email ?? null,
        // @ts-ignore
        clientPhone: offer.client?.phone ?? null,  
        offerAmount: offer.amount,
        accepted: offer.accepted ?? false,
      })),
    };
};

export async function getAgentInvestments(): Promise<{ investment: investmentData[] }> {
  try {
    // Assuming the agent is registered and we fetch the agent using a helper function
    const agent = await registerClerkUserAsAgent();
    if (!agent) {
      console.log('Agent not found');
      return { investment: [] }; 
    }

    // Fetch investments associated with the agent
    const investments = await db.investment.findMany({
      where: { agentId: agent.id },
      include: {
        offers: {
          include: {
            client: true,  // Ensure client info is included in each offer
          },
        },
      },
    });

    // Map over the investments and format them using the DTO
    const formattedInvestments = investments.map((investment) => investmentDTO(investment));

    // Return the formatted investments
    return { investment: formattedInvestments };
    
  } catch (error) {
    console.error('Error fetching investments for agent:', error);
    throw new Error('Error fetching investments');
  }
}

interface InvestmentInfo {
  title: string;
  description: string;
  price: number;
  contribution: number;
  numContributors: number;
  location: string;
  purpose: string;
}

export async function createInvestment(params: InvestmentInfo) {
  console.log("**********************************************************");
  console.log("createInvestment function");
  console.log(typeof params.price);
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error('User email not found');
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
        acceptedContributions: 0, // Initialize acceptedContributions
      },
    });

    console.log("Investment created successfully:", investment);

    return { message: `${investment.id}` };

  } catch (error) {
    console.log("/////////////////////////////////////////////////////////");
    
    console.error("Error creating investment:", error);
    return { message: "Failed to create investment", error };
  } finally {
    await db.$disconnect(); // Ensure disconnection happens regardless of success or failure
  }
}
export async function createInvestmentOffer(params: any) : Promise<{ message: boolean }> {
  console.log("**********************************************************");
  console.log("createInvestmentOffer function");
  console.log(params.clientOffer);
  try {
    const newClient = await db.client.create({
      data: {
        phone: params.clientPhone,
        email: params.clientEmail || "", 
        name: params.clientName || "",   
      },
    });

    await db.investmentOffer.create({
      data: {
        investmentId: params.investmentId,
        clientId: newClient.id, 
        amount: params.clientOffer,
        accepted: false
      },
    });
    return { message: true };
  
  } catch (error) {
  
    console.error("An unexpected error occurred while creating offer:", error);
    return { message: false };
  }finally {

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
  const totalAcceptedContributions = acceptedOffers.reduce((sum, offer) => sum + offer.amount, 0);

  await db.investment.update({
    where: { id: investmentId },
    data: {
      acceptedContributions: totalAcceptedContributions,
    },
  });
  console.log(`Updated acceptedContributions for investment ${investmentId} to ${totalAcceptedContributions}`);
} catch (error) {
  console.error('Error updating accepted contributions:', error);
}}

export async function updateInvestementOfferStatus(investmentOfferId: string, status: boolean) {
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error('User email not found');
    }

    const updatedOffer = await db.investmentOffer.update({
      where: { id: investmentOfferId },
      data: { accepted: status }
    });
    
    await updateAcceptedContributions(updatedOffer.investmentId)

    console.log("Investment offer updated successfully");    

    return { 
      success: true, 
      message: "Investment offer updated successfully.",
      offer: updatedOffer 
    };

  } catch (error) {
    console.error("Error updating investment offer:", error);
    return { 
      success: false, 
      message: "Failed to update investment offer: " + error 
    };
  }
}

export async function deleteInvestementById(id: string) : Promise<{success : boolean}>  {
  try {
    await db.investment.delete({
      where: { id: id }
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
export async function addProperty(
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ message: string }>{
  console.log("**********************************************************")
  console.log("addProperty function")

  const propertyType = formData.get('propertyType') as string | null;
  const propertyState = formData.get('propertyState') as string | null;
  const propertyStatus = formData.get('propertyStatus') as boolean | null;
  const address = formData.get('address') as string | null;
  const mapLink = formData.get('mapLink') as string | null;
  const price = formData.get('price') as string | null;
  const area = formData.get('area') as string | null;
  const bedrooms = formData.get('bedrooms') as string | null;
  const bathrooms = formData.get('bathrooms') as string | null;
  const description = formData.get('description') as string | null;
  const imagesUrls = formData.get('imagesUrls') as string | null;
  const video = formData.get('video') as string | null;
  const panorama = formData.get('panorama') as string | null;
  const featureArray = formData.getAll('feature') as string[];
  const feature = featureArray.length > 0 ? featureArray.join(',') : null;
    console.log(formData)
  try {
    const result = propertyFormSchema.safeParse(
      {    
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
        description
      }); 
    if (!result) {
      // Return the errors to be displayed in the form
      return {message:"Failed to create property"} ;
    }
    const clerkAgent =  await registerClerkUserAsAgent()
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error('User email not found');
    }
    const data = result.data
    if (!data) {
      throw new Error('formdata input error');
    }
    const property =  await db.property.create({
        data: {
          type : data.propertyType,        
          status :data.propertyStatus   ,  
          address :data.address ,   
          mapUrl    :data.mapLink  ,
          description :data.description,
          price       :data.price ,
          area       :data.area,
          agentId     :clerkAgent.id,
          video       :data.video,
          panorama    :data.panorama,
          images   :data.imagesUrls,
          features    :data.feature,
          bedrooms: data.bedrooms,
          bathrooms : data.bathrooms
        },
      });

      console.log("property added successfully")

      db.$disconnect()
      
      // return { message: `property added successfully ${db.property.count}` };
      return { message: `-${property.id}` };


  } catch (error) {
   
    return {message:"Failed to create todo"} ;

  }finally{
    // redirect("/agent/properties")
  }
  
} 

export async function updatePropertyStatus(propertyId: string, status: boolean) {
  console.log("-----------------------------------------------------");
  console.log("updatePropertyStatus");
  
  try {
    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error('User email not found');
    }

    const property = await db.property.findUnique({ where: { id: propertyId } });
    if (!property) {
      throw new Error('Property not found');
    }
    console.log(property.status);
    
    const updatedProperty = await db.property.update({
      where: { id: propertyId },
      data: { status },
    });
    console.log(property.status);
    console.log("-----------------------------------------------------");

    console.log("Property updated successfully");
    return { success: true, message: "Property updated successfully.", property: updatedProperty };

  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, message: "Failed to update property: " + error };
  }finally{
    redirect("/agent/properties")
  }
  
}

export async function addPropertyPanorama(propertyId: string, panoramaUrl: string) {
  try {
    if (!panoramaUrl) {
      return { message: "Panorama URL is required." };
    }

    const clerkAgent = await registerClerkUserAsAgent();
    if (!clerkAgent || !clerkAgent.email) {
      throw new Error('User email not found');
    }

    const property = await db.property.findUnique({ where: { id: propertyId } });
    if (!property) {
      throw new Error('Property not found');
    }

    await db.$transaction(async (tx) => {
      await db.property.update({
        where: { id: propertyId },
        data: { panorama: panoramaUrl },
      });

      console.log("Property updated successfully");
    });

    return { message: "Property updated successfully." };

  } catch (error) {
    console.error("Error updating property:", error); // Log the error for debugging
    return { message: "Failed to update property: " + error }; // Return error message
  } finally {
    // Ensure redirect is properly defined or handled outside this function
    redirect("/agent/properties");
  }
}

export async function addPropertyImages(propertyId: string, imagesUrls : string){
  try {
    if (!imagesUrls) {
      // Return the errors to be displayed in the form
      return { message: "Failed to update todo" };
    }

      const clerkAgent = await registerClerkUserAsAgent();
      if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
        throw new Error('User email not found');
      }
      await db.$transaction(async (tx) => {


        if (!clerkAgent) {
          throw new Error('agent not found');
        }


        const property = await db.property.findUnique({ where: { id: propertyId } });
        if (!property) {
          throw new Error('Property not found');
        }
        // Update the property
        await db.property.update({
          where: { id: propertyId },
          data: {
            images   :imagesUrls,
          },
        });

        console.log("property updated successfully");
        
        db.$disconnect();
        redirect("/agent/properties")
        // return { message: "Property updated successfully" };
        
      });
    } catch (error) {
      return { message: "Failed to update todo" + error };
    }

}

export async function addPropertyVideos(propertyId: string, videoUrl : string){
  try {
    if (!videoUrl) {
      // Return the errors to be displayed in the form
      return { message: "Failed to update todo" };
    }

      const clerkAgent = await registerClerkUserAsAgent();
      if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
        throw new Error('User email not found');
      }
      await db.$transaction(async (tx) => {


        if (!clerkAgent) {
          throw new Error('agent not found');
        }


        const property = await db.property.findUnique({ where: { id: propertyId } });
        if (!property) {
          throw new Error('Property not found');
        }
        // Update the property
        await db.property.update({
          where: { id: propertyId },
          data: {
            video   :videoUrl,
          },
        });

        console.log("property updated successfully");
        
        db.$disconnect();
        redirect("/agent/properties")
        // return { message: "Property updated successfully" };
        
      });
    } catch (error) {
      return { message: "Failed to update todo" + error };
    }

}

export async function updateProperty(propertyId: string, prevState: { message: string } | undefined, formData: FormData): Promise<any>{
  const propertyType = formData.get('propertyType') as string | null;
  const propertyState = formData.get('propertyState') as string | null;
  const propertyStatus = formData.get('propertyStatus') as boolean | null;
  const address = formData.get('address') as string | null;
  const mapLink = formData.get('mapLink') as string | null;
  const price = formData.get('price') as string | null;
  const area = formData.get('area') as string | null;
  const bedrooms = formData.get('bedrooms') as string | null;
  const bathrooms = formData.get('bathrooms') as string | null;
  const description = formData.get('description') as string | null;
  const imagesUrls = formData.get('imagesUrls') as string | null;
  const video = formData.get('video') as string | null;
  const panorama = formData.get('panorama') as string | null;
  const featureArray = formData.getAll('feature') as string[];
  const feature = featureArray.length > 0 ? featureArray.join(',') : null;
    
  try {
    const result = propertyFormSchema.safeParse(
      {    
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
        description
      }); 
    if (!result) {
      // Return the errors to be displayed in the form
      return { message: "Failed to update todo" };

    }

      const clerkAgent = await registerClerkUserAsAgent();
      if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
        throw new Error('User email not found');
      }
      await db.$transaction(async (tx) => {


        if (!clerkAgent) {
          throw new Error('agent not found');
        }

        const data = result.data;
        if (!data) {
          throw new Error('formdata input error');
        }

        const property = await db.property.findUnique({ where: { id: propertyId } });
        if (!property) {
          throw new Error('Property not found');
        }
        // Update the property
        await db.property.update({
          where: { id: propertyId },
          data: {
            type : data.propertyType,        
            status :data.propertyStatus   ,  
            address :data.address ,   
            mapUrl    :data.mapLink  ,
            description :data.description,
            price       :data.price ,
            area       :data.area,
            agentId     :clerkAgent.id,
            video       :data.video,
            panorama    :data.panorama,
            images   :data.imagesUrls,
            features    :data.feature,
            bedrooms: data.bedrooms,
            bathrooms : data.bathrooms
          },
        });

        console.log("property updated successfully");
        
        db.$disconnect();
        redirect("/agent/properties")
        // return { message: "Property updated successfully" };
        
      });
    } catch (error) {
      return { message: "Failed to update todo" + error };
    }

}

export async function getPropertyById(propertyId: string): Promise<any>{
  
  try {
        const property = await db.property.findUnique({ where: { id: propertyId } });
        if (!property) {
          throw new Error('Property not found');
        }
        console.log("getPropertyById successfully");
        return property
    } catch (error) {
      return { message: "Failed to update todo" + error };
    }

}

export async function registerClerkUserAsAgent() {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      throw new Error('User email not found');
    }
    const email = user.emailAddresses[0].emailAddress;
    let agent = await db.agent.findUnique({
      where: { email: email }
    });
  
    if (!agent) {
      agent = await db.agent.create({
        data: {
          email: email,
          clerkId: user.id,
          image:user.imageUrl,
          name: user.fullName,
        }
      });
    }

    return agent; // Returns the agent data
  } catch (error) {
    console.error("Error fetching or creating agent data:", error);
    throw error; // Re-throw error for higher-level handling
  }
}

export async function updateAgentData(formData: FormData) {
  console.log(formData);

  try {
    const user = await currentUser();
    const phoneNumber = formData?.get("phoneNumber") as string; // Ensure it's treated as a string

    if (!phoneNumber) {
      throw new Error('Phone number is missing');
    }

    console.log(user);

    // Validate phoneNumber using agentFormSchema
    const result = agentFormSchema.safeParse({ phoneNumber });

    if (!result.success) {
      console.log("Agent phone number error:", result.error);
      throw new Error('Invalid phone number');
    }

    // Proceed with updating the database
    await db.agent.update({
      where: { clerkId: user?.id },
      data: {
        phone: result.data.phoneNumber
      }
    });
    redirect("/agent/properties")
  } catch (error) {
    console.error("Error updating agent data:", error);
    throw error; // Re-throw error for higher-level handling
  }
}

export async function createPropertyOffer( params: any) : Promise<{ message: boolean }> {
  console.log("**********************************************************");
  console.log("createPropertyOffer function");
  console.log(params);
  try {    
    const newClient = await db.client.create({
      data: {
        phone: params.clientPhone,
        email: params.clientEmail || "", 
        name: params.clientName || "",   
      },
    });

    await db.propertyOffer.create({
      data: {
        propertyId: params.propertyId,
        clientId: newClient.id,
        amount: params.clientOffer,
        period: params.clientPeriod
      },
    });

    return { message: true };
  } catch (error) {

    console.error("An unexpected error occurred while creating offer:", error);
    return { message: false };
  }
}

export async function deletePropertyById(id: string) {

  try {
    const property = await getPropertyById(id);
  
    // Extract images and video from the property
    const images = property.images 
      ? property.images.split(",").map((image: string) => image.replace("https://utfs.io/f/", "").trim()).filter(Boolean) 
      : [];
    const video = property.video ? property.video.replace("https://utfs.io/f/", "") : "";  
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
      where: { id: property.id }
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

export async function getPropertyOffers(propertyId: string): Promise<{ propertyOffers: any[] }> {
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
    console.error('Error fetching property offers:', error);
    
    // Return an empty array or handle the error as needed
    return { propertyOffers: [] };
  }
}

export async function getAgentProperties(): Promise<{ properties: AgentPropertyData[] }> {
  try {
    // Register the clerk user as an agent and handle the case where the agent is not found
    const agent = await registerClerkUserAsAgent();
    if (!agent) {
      console.log("Agent not found");
      return { properties: [] }; // Returning an empty array for consistency
    }

    // Fetch properties associated with the agent
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

    // Process and format the properties
    const formattedProperties = properties.map(property => ({
      id: property.id,
      type: property.type,
      description: property.description,
      price: property.price,
      agentId: property.agentId,
      status: property.status,
      video: property.video,
      panorama: property.panorama,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      features: property.features,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      images: property.images,
      mapUrl: property.mapUrl || null, // Ensure mapUrl is included
      area: property.area || null, // Ensure area is included
      offers: property.offers.map(offer => ({
        id: offer.id,
        amount: offer.amount,
        createdAt: offer.createdAt,
        clientName: offer.client?.name || null,
        clientEmail: offer.client?.email || null,
      })),
    }));

    // Return the formatted properties
    return { properties };

  } catch (error) {
    // Log the error and handle it as needed
    console.error('Error fetching properties with details for agent:', error);
    throw new Error('Error fetching properties'); // Optionally customize error handling
  }
}

export async function getAgentPropertyOffers(propertyId:string) {
    try {
        const propertyImages = await db.propertyOffer.findMany({
          where: {
            propertyId: propertyId,
          },
         })
         return propertyImages
    } catch (error) {
      console.error('Error fetching property OFFERS with details for agent:', error);
    
      throw error; // Handle the error appropriately
    
    }
      
    }
  
export async function getAgentClients() {
  const agent = await registerClerkUserAsAgent();
    if (!agent) {
      console.log("agent not found")
      return notFound()
    }
    const agentId = agent.id
  const data = await db.client.aggregate({
     where: {
       offers: {
           property: {
             agentId: agentId
           }
         
       }
     },
     _count:true
   });
   return{
     numberOfOffers : data._count || 0}
   
 }


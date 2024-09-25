"use server"

import db from "@/db/db"
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { agentFormSchema, clientFormSchema, offerFormSchema, propertyFormSchema } from "../zodSchema"
import { Offer, Property } from "@prisma/client"
import { count, error } from "console"
import { UTApi } from "uploadthing/server"
import { useRouter } from "next/router"
export const utapi = new UTApi();



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
  offers: Offer[] | null; 
  panorama: string | null; 
  status: boolean | null;  // Updated to boolean
  state: string | null;    // Added state field
  updatedAt: Date;
  video: string | null; 
}


export async function addProperty(
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ message: string }>{
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
      return {message:"Failed to create todo"} ;

    }
    const clerkAgent =  await registerClerkUserAsAgent()
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error('User email not found');
    }
    const data = result.data
    if (!data) {
      throw new Error('formdata input error');
    }
      await db.property.create({
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
      return { message: `property added successfully ${db.property.count}` };


  } catch (error) {
   
    return {message:"Failed to create property"} ;

  }finally{  redirect("/agent/properties")}
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
    let agent = await db.agents.findUnique({
      where: { email: email }
    });
  
    if (!agent) {
      agent = await db.agents.create({
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
    await db.agents.update({
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

export async function createClientOffer(prevState: { status: string; message: string } | undefined, formData: FormData) {
  try {
    // Extract data from the formData object
    const clientPhone = formData.get('clientPhone') as string;
    const clientName = formData.get('clientName') as string;
    const clientEmail = formData.get('clientEmail') as string;
    const propertyId = formData.get('propertyId') as string;
    const clientOffer = formData.get('clientOffer') as string;
    const clientPeriod = formData.get('clientPeriod') as string;

    // Validate the client data using the schema
    const parseClient = clientFormSchema.safeParse({
      clientPhone,
      clientName,
      clientEmail,
      
    });

    // Check if client data is valid
    if (!parseClient.success) {
      // Return error if validation fails
      return { 
        status: 'error', 
        message: 'Invalid client data', 
        errors: parseClient.error.formErrors.fieldErrors 
      };
    }

    // Validate the offer data using the schema
    const parseOffer = offerFormSchema.safeParse({
      propertyId,
      amount: clientOffer,
      period:clientPeriod
    });

    // Check if offer data is valid
    if (!parseOffer.success) {
      // Return error if validation fails
      return { 
        status: 'error', 
        message: 'Invalid offer data', 
        errors: parseOffer.error.formErrors.fieldErrors 
      };
    }

    // Extract validated data
    const clientData = parseClient.data;
    const offerData = parseOffer.data;

    // Create a new client record in the database
    const newClient = await db.client.create({
      data: {
        phone: clientData.clientPhone,
        email: clientData.clientEmail || "", // Default to empty string if no email
        name: clientData.clientName || "",   // Default to empty string if no name
      },
    });

    // Create a new offer record associated with the newly created client
    await db.offer.create({
      data: {
        propertyId: offerData.propertyId,
        clientId: newClient.id, // Use the newly created client ID
        amount: offerData.amount,
        period: offerData.period
      },
    });

    return { 
      status: 'success', 
      message: 'Offer created successfully' 
    };
  } catch (error) {
    // Log unexpected errors and return a generic error message
    console.error("An unexpected error occurred while creating offer:", error);
    return { 
      status: 'error', 
      message: 'An unexpected error occurred' 
    };
  }
}


export async function deletePropertyById(
  id: string,
){
  const property = await getPropertyById(id)
  const images = property.images.split(",").map((image: string) => image.replace("https://utfs.io/f/", "").trim()).filter(Boolean);  
  const video = property.video ? property.video.replace("https://utfs.io/f/", "") : ""
  try {
    if(video.length > 0){ utapi.deleteFiles(video)

    }if(images.length > 0){ 
      for (const image of images) {
        await utapi.deleteFiles(image);
        console.log("Deleting images successfully:", image);
      }
      }else{
        throw new Error("Failed Deleting images and video")
        
      }
      await db.property.delete({
        where: { id: property.id }
      })
    console.log("deletes successfully")
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: "Failed to delete file" };
  }finally{
    await db.$disconnect()
    revalidatePath("/agent/properties")

  }

}
export async function getPropertyOffers(propertyId: string): Promise<{ propertyOffers: Offer[] }> {
  try {
    const propertyOffers = await db.offer.findMany({
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
        const propertyImages = await db.offer.findMany({
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


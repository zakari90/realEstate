"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"
import { Property } from "@prisma/client"


const propertyFormSchema = z.object({
  propertyType: z.string().min(1, { message: "Property type is required" }),
  propertyStatus: z.string().min(1, { message: "Property status is required" }),
  price: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Price is required and must be a positive number" }),
  // price: z.coerce.number().int().min(1),
  description: z.string().optional(),
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  landmark: z.string(),
  zip: z.string(),
  bedrooms: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  bathrooms: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  area: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  parkingSpot: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  swimmingPool: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  gardenYard: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  balcony: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  imagesUrl: z.preprocess((val) => typeof val === 'string' ? val.split(',') : val, z.array(z.string())).optional(),
  video: z.string().optional(),
  panorama: z.string().optional(),
});

export async function addProperty(prevState: any, formData: FormData) {

  try {
    const result = propertyFormSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      // Return the errors to be displayed in the form
      return  result.error.formErrors.fieldErrors ;
    }
    const clerkAgent =  await registerClerkUserAsAgent()
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error('User email not found');
    }
    const email = clerkAgent.email;

    await db.$transaction(async (tx) => 
      {
      const agent = await tx.agents.findUnique({
        where: { email: email },
      });

      if (!agent) {
        throw new Error('agent not found');
      }
      const data = result.data
      if (!data) {
        throw new Error('formdata input error');
      }

      const propertyLocation = await db.propertyLocation.create({
        data: {
          streetAddress: data.streetAddress,
          city: data.city,
          zip: data.zip,
          landmark: data.landmark
        },
      });

      const images = JSON.stringify(data.imagesUrl)
      const imageslist = JSON.parse(images)
      const imagesUrl = imageslist.map((url: string) => ({ url }))

      const propertyFeature = await db.propertyFeature.create({
        data: {
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          parkingSpot: data.parkingSpot,
          area: data.area,
          swimmingPool: data.swimmingPool,
          gardenYard: data.gardenYard,
          balcony: data.balcony,
        },
       })
        await db.property.create({
          data: {
            description: data.description,
            price: data.price,
            agentId: agent.id,
            type: data.propertyType,
            status: data.propertyStatus,
            locationId: propertyLocation.id,
            featureId: propertyFeature.id,
            images: {
              create: imagesUrl,
            },
            video: data.video,
            panorama: data.panorama,
          },
        });
        console.log("property added successfully")

        db.$disconnect()
        
        
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    // Handle the error appropriately...
    console.log("fail to add property")
  }
  redirect("/agent/properties")
} 

export async function updateProperty(propertyId: string, prevState: any, formData: FormData) {
    try {
      const result = propertyFormSchema.safeParse(Object.fromEntries(formData.entries()));
      if (!result.success) {
        // Return the errors to be displayed in the form
        return  result.error.flatten().fieldErrors;
      }

      const clerkAgent = await registerClerkUserAsAgent();
      if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
        throw new Error('User email not found');
      }
      const email = clerkAgent.email;
      await db.$transaction(async (tx) => {
        const agent = await tx.agents.findUnique({
          where: { email: email },
        });

        if (!agent) {
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

        // Update or create property location
        const propertyLocation = await db.propertyLocation.upsert({
          where: { id: property.locationId || "" },
          update: {
            streetAddress: data.streetAddress,
            city: data.city,
            zip: data.zip,
            landmark: data.landmark
          },
          create: {
            streetAddress: data.streetAddress,
            city: data.city,
            zip: data.zip,
            landmark: data.landmark
          },
        });

        const images = JSON.stringify(data.imagesUrl);
        const imageslist = JSON.parse(images);
        const imagesUrl = imageslist.map((url: string) => ({ url }));

        // Update or create property feature
        const propertyFeature = await db.propertyFeature.upsert({
          where: { id: property.featureId || "" },
          update: {
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            parkingSpot: data.parkingSpot,
            area: data.area,
            swimmingPool: data.swimmingPool,
            gardenYard: data.gardenYard,
            balcony: data.balcony,
          },
          create: {
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            parkingSpot: data.parkingSpot,
            area: data.area,
            swimmingPool: data.swimmingPool,
            gardenYard: data.gardenYard,
            balcony: data.balcony,
          },
        });

        // Update the property
        await db.property.update({
          where: { id: propertyId },
          data: {
            description: data.description,
            price: data.price,
            agentId: agent.id,
            type: data.propertyType,
            status: data.propertyStatus,
            locationId: propertyLocation.id,
            featureId: propertyFeature.id,
            images: {
              deleteMany: {}, // Delete all existing images
              create: imagesUrl, // Create new images
            },
            video: data.video,
            panorama: data.panorama,
          },
        });

        console.log("property updated successfully");
        db.$disconnect();
        
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        // return error.flatten().fieldErrors ;
      } else {
        console.error("An unexpected error occurred:", error);
        // return { general: ['An unexpected error occurred'] } ;
      }
    }

}
const agentFormSchema = z.object({
  phoneNumber: z.string().min(10),

})
export async function registerClerkUserAsAgent(formData?: FormData) {
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      throw new Error('User email not found');
    }
    const email = user.emailAddresses[0].emailAddress;
    let agent = await db.agents.findUnique({
      where: { email: email }
    });
    const agentPhoneNumber = agentFormSchema.safeParse(formData?.get("phoneNumber"))

    if (!agent) {
      agent = await db.agents.create({
        data: {
          email: email,
          clerkId: user.id,
          name: user.fullName, // Adjust based on your user object structure
          phone: agentPhoneNumber.success ? agentPhoneNumber.data.phoneNumber : null , // Adjust based on your user object structure
        }
      });
    }

    return agent; // Returns the agent data
  } catch (error) {
    console.error("Error fetching or creating agent data:", error);
    throw error; // Re-throw error for higher-level handling
  }
}



const offerFormSchema = z.object({
  propertyId: z.string().min(1),
  amount: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Amount is required and must be a positive number" }),

});

const clientFormSchema = z.object({
  clientName: z.string().nullable().optional(),
  clientEmail: z.string().nullable().optional(),
  clientPhone: z.string(),
});

export async function createClientOffer(prevState: any,formData: FormData) {


  try {
    const clientPhone = formData.get('clientPhone') ;
    const clientName = formData.get('clientName') ;
    const clientEmail = formData.get('clientEmail') ;
    const propertyId = formData.get('propertyId') ;
    const clientOffer = formData.get('clientOffer') ;
    const parseClient = clientFormSchema.safeParse({
      clientPhone,
      clientName,
      clientEmail,
    });

    if (!parseClient.success) {
      return  parseClient.error.formErrors.fieldErrors ;
    }
    // Validate offer data
    const parseOffer = offerFormSchema.safeParse({
      propertyId,
      amount: clientOffer,
    });

    if (!parseOffer.success) {
      console.error("Offer validation failed:", parseOffer.error.errors);
      return parseOffer.error.formErrors.fieldErrors
    }

    const clientData = parseClient.data;
    const offerData = parseOffer.data;

    // Create client
    const newClient = await db.client.create({
      data: {
        phone: clientData.clientPhone,
        email: clientData.clientEmail || "",
        name: clientData.clientName || "",
      },
    });
    console.log('Created new client:', newClient);

    // Create offer
    const newOffer = await db.offer.create({
      data: {
        propertyId: offerData.propertyId,
        clientId: newClient.id,
        amount: offerData.amount,
      },
    });
    console.log('successfully Create new offer:', newOffer);

  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
  redirect("/")
}

export async function deleteProperty(
  id: string,
  ){
  const product = await db.property.delete({ where: { id } })
  if (product == null) return notFound()
  revalidatePath("/")
  revalidatePath("/products")
  }
export async function getPropertyWithId(propertyyId : string) {
    try {
      const property = await db.property.findUnique(
        {where: {id : propertyyId},
        include: {
          feature: true,
          location: true,
          images: true,
        },
      });
      if (!property) {
        return notFound()
      }
      return ({        
        id: property.id,
        type: property.type,
        description: property.description,
        price: property.price,
        agentId: property.agentId,
        status: property.status,
        locationId: property.locationId,
        featureId: property.featureId,
        video: property.video,
        panorama: property.panorama,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        feature: property.feature,
        location: property.location,
        images: property.images.map(image => image.url),});
  
    } catch (error) {
      console.error('Error fetching properties with details for agent:', error);
      throw error; // Handle the error appropriately
    }
  }
export async function getAllProperties() {
    try {
      const properties = await db.property.findMany({
        include: {
          feature: true,
          location: true,
          images: true,
        },
      });

      return properties.map(property => ({
        id: property.id,
        type: property.type,
        description: property.description,
        price: property.price,
        agentId: property.agentId,
        status: property.status,
        locationId: property.locationId,
        featureId: property.featureId,
        video: property.video,
        panorama: property.panorama,
        createdAt: property.createdAt,
        updatedAt: property.updatedAt,
        feature: property.feature,
        location: property.location,
        images: property.images.map(image => image.url),
      }));
  
    } catch (error) {
      console.error('Error fetching properties with details for agent:', error);
      throw error; // Handle the error appropriately
    }
  }
export async function getRecentProperties() {
  try {
    const properties = await db.property.findMany({
      include: {
        feature: true,
        location: true,
        images: true,
      },
      take:6
      
    });

    return properties.map(property => ({
      id: property.id,
      type: property.type,
      description: property.description,
      price: property.price,
      agentId: property.agentId,
      status: property.status,
      locationId: property.locationId,
      featureId: property.featureId,
      video: property.video,
      panorama: property.panorama,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      feature: property.feature,
      location: property.location,
      images: property.images.map(image => image.url),
    }));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; // Handle the error appropriately
  }
}
export async function getAgentProperties() {
  try {
    const agent = await registerClerkUserAsAgent();
    if (!agent) {
      console.log("agent not found")
      return notFound()
    }
    const properties = await db.property.findMany({
      where: {
        agentId: agent.id,
      },
      include: {
        feature: true,
        location: true,
        images: true,
        offers: {
          include: {
            client: true, // Include client details if needed
          },
        },
      },
    });

    return properties.map(property => ({
      id: property.id,
      type: property.type,
      description: property.description,
      price: property.price,
      agentId: property.agentId,
      status: property.status,
      locationId: property.locationId,
      featureId: property.featureId,
      video: property.video,
      panorama: property.panorama,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      feature: property.feature,
      location: property.location,
      images: property.images.map(image => image.url), // Ensure `url` is non-null
      offers: property.offers.map(offer => ({
        id: offer.id,
        amount: offer.amount,
        createdAt: offer.createdAt,
        clientName: offer.client?.name || null,
        clientEmail: offer.client?.email || null,
      })),
    }));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; // Handle the error appropriately
  }
}
// export  async function getAgentPropertiesWithDetails(): Promise<Property[]> {
//     try {
//     const agent = await registerClerkUserAsAgent();
//     if (!agent) {
//       console.log("agent not found")
//       return notFound()
//     }
//       const properties = await db.property.findMany({
//         where: {
//           agentId: agent.id,
//         },
//         include: {
//           feature: true,
//           location: true,
//         },
//       });
//       return properties.map(property => ({
//         id: property.id,
//         type: property.type,
//         description: property.description,
//         price: property.price,
//         agentId: property.agentId,
//         status: property.status,
//         locationId: property.locationId,
//         featureId: property.featureId,
//         video: property.video,
//         panorama: property.panorama,
//         createdAt: property.createdAt,
//         updatedAt: property.updatedAt,
//         feature: property.feature,
//         location: property.location,
//       }));
  
//     } catch (error) {
//       console.error('Error fetching properties with details for agent:', error);
//       throw error; // Handle the error appropriately
//     }
//   }
  
export async function getAgentPropertyImages(propertyId:string) {
  try {
      const propertyImages = await db.propertyImage.findMany({
        where: {
          propertyId: propertyId,
        },
       })
       return propertyImages
  } catch (error) {
    console.error('Error fetching property images with details for agent:', error);
  
    throw error; // Handle the error appropriately
  
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

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

export async function addProperty(formData: FormData) {

  try {

    const result = propertyFormSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      // Return the errors to be displayed in the form
      return { error: result.error.flatten().fieldErrors };
    }

    const clerkAgent =  await registerClerkUserAsAgent()
    if (!clerkAgent || !clerkAgent.email || clerkAgent.email.length === 0) {
      throw new Error('User email not found');
    }
    const email = clerkAgent.email;

    return await db.$transaction(async (tx) => 
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
export async function registerClerkUserAsAgent(){
  try {
    const user = await currentUser();
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      throw new Error('User email not found');
    }
    const email = user.emailAddresses[0].emailAddress;
    const agent = await db.agents.findUnique({
      where: { email: email }
    });
    return agent; // Returns the agent data or null if not found
  } catch (error) {
    console.error("Error fetching agent data:", error);
    throw error; // Re-throw error for higher-level handling
  }
}



const agentFormSchema = z.object({
  clerkId: z.string(),
  name: z.string(),
  phoneNumber: z.string().min(10, { message: "valde phone number is required" }),
  email: z.string().optional(),
  propertiesUrl: z.preprocess((val) => typeof val === 'string' ? val.split(',') : val, z.array(z.string().url({ message: "Must be a valid URL" }))).optional(),

})
export async function addAgent(formData: FormData) {
  console.log(formData);

  try {
    const result = agentFormSchema.safeParse(Object.fromEntries(formData.entries()));
    console.log(result);
    if (result.success === false) {
      return result.error.formErrors.fieldErrors
    }
  
    // Process the validated data..
    const data =result.data
    if (!data) {
      throw new Error('formdata input error');
    }
   await db.agents.create({
    data: {
      clerkId: data?.clerkId,
      name: data?.name,
      phone: data?.phoneNumber,
      email: data?.email,
    },
  })
    console.log("agent created successfully")
    console.log("-------------------------------------------------------")

    db.$disconnect()
    redirect("/agent/properties")
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    // Handle the error appropriately...
  }
}

const offerFormSchema  = z.object(
  {
    propertyId: z.string(),
    amount: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  }
)
const clientFormSchema  = z.object(
  {
    clientName: z.string().optional(),
    clientEmail: z.string().optional(),
    clientPhone :z.string(),
  }
)
export async function createClientOffer(formData : FormData) {
  console.log("23555555555555555555555555555555")
  console.log(formData)
  const clientPhone = formData.get('clientPhone');
  const clientName = formData.get('clientName');
  const clientEmail = formData.get('clientEmail');
  const propertyId = formData.get('propertyId');
  const clientOffer = formData.get('clientOffer');

  console.log('Client Phone:', clientPhone);
  console.log('Client Offer:', clientOffer);
  console.log('Client Name:', clientName);
  console.log('Client Email:', clientEmail);
  console.log('propertyId :', propertyId);

  console.log("23555555555555555555555555555555")

  try {
    const parse = clientFormSchema.safeParse({
      clientPhone : formData.get('clientPhone'),
      clientName : formData.get('clientName'),
      clientEmail : formData.get('clientEmail'),
    });
  
    if (!parse.success) {
      return { message: "Failed to create ClientOffer" };
    }
    const data = parse.data;

    const newClient = await db.client.create({
      data: {
        phone: data.clientPhone,
        email: data.clientEmail || "",
        name: data.clientName || "",
      },
    });
    console.log('Created new client:', newClient);

    const newOffer = await db.offer.create({
      data: {
        propertyId: 'some-property-id', 
        clientId: newClient.id,
        amount: 2500.00,
      },
    });
  
    console.log('Created new offer:', newOffer);
  } catch (error) {
  }

  console.log("formDataformDataformDataformDataformDataformDataformDataformDataformDataformDataformDataformDataformDataformData");
  console.log(formData);
  console.log("formDataformDataformDataformDataformDataformDataformDataformDataformData");

  // try {
  //   const result = agentFormSchema.safeParse(Object.fromEntries(formData.entries()));
  //   console.log(result);
  //   if (result.success === false) {
  //     return result.error.formErrors.fieldErrors
  //   }
  
  //   // Process the validated data..
  //   const data =result.data
  //   if (!data) {
  //     throw new Error('formdata input error');
  //   }
  //  await db.offer.create({
  //   data: {
  //     clerkId: data?.clerkId,
  //     name: data?.name,
  //     phone: data?.phoneNumber,
  //     email: data?.email,
  //   },
  // })
  //   console.log("agent created successfully")
  //   console.log("-------------------------------------------------------")

  //   db.$disconnect()
  //   redirect("/agent/properties")
    
  // } catch (error) {
  //   if (error instanceof z.ZodError) {
  //     console.error("Validation error:", error.errors);
  //   } else {
  //     console.error("An unexpected error occurred:", error);
  //   }
  //   // Handle the error appropriately...
  // }
  // redirect("/properties")
}

export async function deleteProperty(
  id: string,
  ){
  const product = await db.property.delete({ where: { id } })
  if (product == null) return notFound()
  revalidatePath("/")
  revalidatePath("/products")
  }
export async function getAllPropertiesWithDetails() {
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
export async function getRecentPropertiesWithDetails() {
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
export async function getAgentPropertiesWithDetails() {
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

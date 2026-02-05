import { z } from "zod"

export const propertyFormSchema = z.object({
  propertyType: z.string().min(1),
  propertyState: z.string().optional(),
  propertyStatus: z.boolean().optional().nullable(),
  address: z.string().optional(),
  mapLink: z.string().nullable().optional(),
  price: z.string().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Price must be a positive number" }).optional(),
  area: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Area must be a positive number" }).nullable(),
  bedrooms: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Bedrooms must be a positive number" }).nullable(),
  bathrooms: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined).refine((val) => val === undefined || (!isNaN(val) && val > 0), { message: "Bathrooms must be a positive number" }).nullable(),
  description: z.string().nullable().optional(),
  imagesUrls: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
  panorama: z.string().nullable().optional(),
  feature: z.string().nullable().optional(),
});


export const agentFormSchema = z.object({
    phoneNumber: z.string().min(10),
  
  })

export const offerFormSchema = z.object({
    propertyId: z.string().min(1),
    period: z.string(),
    amount: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Amount is required and must be a positive number" }),
  
  });
  
export const clientFormSchema = z.object({
    clientName: z.string().nullable().optional(),
    clientEmail: z.string().nullable().optional(),
    clientPhone: z.string(),
  });


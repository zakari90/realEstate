"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Define the schema with optional array for imageUrl
// const propertyFormSchema = z.object({
//   propertyType: z.string().min(1, { message: "Property type is required" }),
//   propertyStatus: z.string().min(1, { message: "Property status is required" }),
//   price: z.number().int().positive({ message: "Price is required and must be a positive number" }),
//   description: z.string().optional(),
//   streetAddress: z.string().min(1, { message: "Street address is required" }),
//   city: z.string().min(1, { message: "City is required" }),
//   state: z.string().min(1, { message: "State is required" }),
//   zip: z.string().min(1, { message: "Zip code is required" }),
//   bedrooms: z.number().int().positive({ message: "Must be a positive number" }).optional(),
//   bathrooms: z.number().int().positive({ message: "Must be a positive number" }).optional(),
//   area: z.number().int().positive({ message: "Must be a positive number" }).optional(),
//   parkingSpot: z.boolean().optional(),
//   hasSwimmingPool: z.boolean().optional(),
//   hasGardenYard: z.boolean().optional(),
//   hasBalcony: z.boolean().optional(),
//   video: z.string().url({ message: "Must be a valid URL" }).optional(),
//   panorama: z.string().url({ message: "Must be a valid URL" }).optional(),
//   imagesUrl: z.array(z.string().url({ message: "Must be a valid URL" })).optional(),
// });

const propertyFormSchema = z.object({
  propertyType: z.string().min(1, { message: "Property type is required" }),
  propertyStatus: z.string().min(1, { message: "Property status is required" }),
  price: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Price is required and must be a positive number" }),
  description: z.string().optional(),
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(1, { message: "Zip code is required" }),
  bedrooms: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  bathrooms: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  area: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, { message: "Must be a positive number" }).optional(),
  parkingSpot: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  hasSwimmingPool: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  hasGardenYard: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  hasBalcony: z.preprocess((val) => val === 'true', z.boolean()).optional(),
  video: z.string().url({ message: "Must be a valid URL" }).optional(),
  panorama: z.string().url({ message: "Must be a valid URL" }).optional(),
  imagesUrl: z.preprocess((val) => typeof val === 'string' ? val.split(',') : val, z.array(z.string().url({ message: "Must be a valid URL" }))).optional(),
});
export async function addProperty(formData: FormData) {
  try {
    const result = propertyFormSchema.safeParse(Object.fromEntries(formData.entries()));
    console.log(result);
    // Process the validated data...
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    // Handle the error appropriately...
  }
}
// The addProperty function for handling form submission
export async function addProperty3(formData: FormData) {
  // console.log(formData);
  // console.log(formData.get("panorama"));



  try {
    // Validate the data using the Zod schema
    const result = propertyFormSchema.safeParse(Object.fromEntries(formData.entries()))
    console.log("============")
    console.log(result)

    // Proceed with further handling of the validated data...
  } catch (error) {
    console.error("Validation failed:", error);
    // Handle validation errors appropriately...
  }
}


// prevState param is used by the formsatat hook
export async function addProperty2(formData: FormData) {
  console.log( formData )
  console.log( formData.get("panorama") )

  const parseNumber = (value) => {
    const parsed = Number(value);
    return isNaN(parsed) ? undefined : parsed;
  };

  const convertedData = {
    ...Object.fromEntries(formData.entries()),
    price: parseNumber(formData.get('price')),
    bedrooms: parseNumber(formData.get('bedrooms')),
    bathrooms: parseNumber(formData.get('bathrooms')),
    area: parseNumber(formData.get('area')),
    imagesUrl: formData.getAll('imagesUrl') ?? [], // Ensure items is always an array
  };
  // Validate the data with Zod schema
  const result = propertyFormSchema.parse(convertedData);
  console.log("------------ " + result )

  // const result = propertyFormSchema.safeParse(convertedData);

  // console.log("Parsed result:", result);  
  //   if (result.success === false) {
  //       return result.error.formErrors.fieldErrors
  //     }
    
      //get data from the submited form 
      // const data = result.data
// console.log("------------ " + data.area )

//     //   //save the file to our file systeme with fs nodejs method file systeme
//     // await fs.mkdir("properties",{recursive:true})
//     // const filePath = `properties/${crypto.randomUUID()}-${data.file.name}`
//     // await fs.writeFile(filePath, Buffer.from(await data.file.name))

//     // await fs.mkdir("public/properties", { recursive: true })
//     // const imagePath = `/properties/${crypto.randomUUID()}-${data.image.name}`
//     // await fs.writeFile(
//     //   `public${imagePath}`,
//     //   Buffer.from(await data.image.arrayBuffer())
//     // )
//     // // console.log(result.data)
//     // await db.property.create({
//     //     data: {
//     //       name: data.name,
//     //       description: data.description,
//     //     },
//     //   })
//     console.log("-----------formdata" , typeof formData.entries)
    
 
//     try {
//           // Create PropertyType
//     const propertyType = await db.propertyType.create({
//     data: {
//       value: data.propertyType,
//     },
//   });

//   // // Create PropertyStatus
//   const propertyStatus = await db.propertyStatus.create({
//     data: {
//       value: data.propertyStatus,
//     },
//   });

//   // // Create Property
//   const property = await db.property.create({
//     data: {
//       description: data.description,
//       price: data.price,
//       type: {
//         connect: { id: propertyType.id },
//       },
//       status: {
//         connect: { id: propertyStatus.id },
//       },
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     },
//   });

//   // // Create PropertyImage
//   const propertyImage = await db.propertyImage.create({
//     data: {
//       url: data.imageUrl,
//       property: {
//         connect: { id: property.id },
//       },
//     },
//   });

//   // Create PropertyFeature
//   const propertyFeature = await db.propertyFeature.create({
//     data: {
//       bedrooms: 4,
//       bathrooms: 3,
//       parkingSpots: 2,
//       area: 2500,
//       hasSwimmingPool: true,
//       hasGardenYard: true,
//       hasBalcony: true,
//       property: {
//         connect: { id: property.id },
//       },
//     },
//   });

//   // Create PropertyLocation
//   const propertyLocation = await db.propertyLocation.create({
//     data: {
//       streetAddress: '123 Main St',
//       city: 'Springfield',
//       state: 'IL',
//       zip: '62704',
//       region: 'Midwest',
//       landmark: 'Near Central Park',
//       property: {
//         connect: { id: property.id },
//       },
//     },
//   });

//   console.log('Data added successfully');
//     } catch (error) {
//       console.log('error while create property table ' + error);

//     }

  //   redirect("/admin/properties")
  //   db.$disconnect()
}



// const editSchema = addSchema.extend({
//   file: fileSchema.optional(),
//   image: imageSchema.optional(),
// })


// export async function updateProduct(id:string, prevState: unknown, formData: FormData) {
//   const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
//   if (result.success === false) {
//       return result.error.formErrors.fieldErrors
//     }
  

//     //get data from the submited form 
//     const data = result.data

//     const product = await db.product.findUnique({ where: { id } })
//     if (product == null) return notFound()

//       let filePath = product.filePath
//       if (data.file != null && data.file.size > 0) {
//         await fs.unlink(product.filePath)
//         filePath = `products/${crypto.randomUUID()}-${data.file.name}`
//         await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
//       }
    
//       let imagePath = product.imagePath
//       if (data.image != null && data.image.size > 0) {
//         await fs.unlink(`public${product.imagePath}`)
//         imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
//         await fs.writeFile(
//           `public${imagePath}`,
//           Buffer.from(await data.image.arrayBuffer())
//         )
//       }
    
//       await db.product.update({
//         where: { id },
//         data: {
//           name: data.name,
//           description: data.description,
//           priceInCents: data.priceInCents,
//           filePath,
//           imagePath,
//         },
//       })
    
//       revalidatePath("/") // revalidate cache
//       revalidatePath("/products") // revalidate cache
    
//       redirect("/admin/products")

// }



// export async function toggleProductAvailability(
// id: string,
//   isAvailableForPurchase: boolean
// ){
//     await db.product.update({where:{id}, data:{isAvailableForPurchase}})
//     revalidatePath("/")
//     revalidatePath("/products")
// }


// export async function deleteProduct(
//     id: string,
//     ){
//     const product = await db.product.delete({ where: { id } })
//     if (product == null) return notFound()

//     await fs.unlink(product.filePath)
//     await fs.unlink(`public${product.imagePath}`)
//     revalidatePath("/")
//     revalidatePath("/products")
//     }
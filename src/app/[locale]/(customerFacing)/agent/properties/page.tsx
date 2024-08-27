import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import db from "@/db/db"
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { PageHeader } from "@/components/pageHeader"
import { currentUser } from '@clerk/nextjs/server' // Removed unused 'auth' import
import { Input } from "@/components/ui/input"
import { addAgent, registerClerkUserAsAgent } from "../../../../_actions/actions"
import { MainTableContainer } from "./_components/mainTable/mainTableContainer"
// import { Property } from "../_actions/types"
import MainTableComponent from "./_components/mainTable"
import { Offer, Property, PropertyImage } from "@prisma/client"
// async function getAgentPropertiesWithDetails(agentId: string): Promise<Property[]> {
//   try {
//     const properties = await db.property.findMany({
//       where: {
//         agentId: agentId,
//       },
//       include: {
//         feature: true,
//         location: true,
//         images: true,
//         offers: {
//           include: {
//             client: true, // Include client details if needed
//           },
//         },
//       },
//     });

//     return properties.map(property => ({
//       id: property.id,
//       type: property.type,
//       description: property.description,
//       price: property.price,
//       agentId: property.agentId,
//       status: property.status,
//       locationId: property.locationId,
//       featureId: property.featureId,
//       video: property.video,
//       panorama: property.panorama,
//       createdAt: property.createdAt,
//       updatedAt: property.updatedAt,
//       feature: property.feature,
//       location: property.location,
//       images: property.images.map(image => image.url), // Ensure `url` is non-null
//       offers: property.offers.map(offer => ({
//         id: offer.id,
//         amount: offer.amount,
//         createdAt: offer.createdAt,
//         clientName: offer.client?.name || null,
//         clientEmail: offer.client?.email || null,
//       })),
//     }));

//   } catch (error) {
//     console.error('Error fetching properties with details for agent:', error);
//     throw error; // Handle the error appropriately
//   }
// }

async function getAgentPropertiesWithDetails(agentId: string): Promise<Property[]> {
  try {
    const properties = await db.property.findMany({
      where: {
        agentId: agentId,
      },
      include: {
        feature: true,
        location: true,
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
    }));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; // Handle the error appropriately
  }
}

async function getAgentPropertyImages(propertyId:string) {
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
async function getAgentPropertyOffers(propertyId:string) {
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
async function AdminProductPage() {
  const cUser = await currentUser();

  let agent = null;
  let agentProperties: Property[] = [];
  let agentPropertyImages: PropertyImage[] = [];
  let agentPropertyOffers: Offer[] = [];
  try {
    agent = await registerClerkUserAsAgent();
    if (agent) {
          agentProperties = await getAgentPropertiesWithDetails(agent.id)
          agentPropertyImages = await getAgentPropertyImages(agent.id)
          agentPropertyOffers = await getAgentPropertyOffers(agent.id)
          const test = agentProperties[0]
          console.log("=========================================================================" )
          console.log(agentProperties?.[0]);
          console.log(agentProperties?.[0]);
          console.log(agentProperties?.[0]);
         
          console.log("=========================================================================" )
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
  



  return (
    <>
    <div className="container">

    
    <div className="flex justify-between items-center gap-4">
      {agent ? (
        <div className="flex justify-between w-full ">
        <PageHeader>Properties</PageHeader>
        <Button>
          <Link href="/agent/properties/new">Add Property</Link>
        </Button>
        </div>
      ) : (
        <form action={addAgent} className="m-auto md:w-1/3">
          <div className='flex'>
            <Input type="text" id="phoneNumber" name="phoneNumber" placeholder='Phone Number'/>   
            <Button className='ml-3' type="submit">Submit</Button>
          </div>
        <div className='w-10/12 m-auto'>      
          <Input className='mt-2' type="text" id="name" name="name" defaultValue={cUser?.fullName || ''} readOnly/>   
          <Input className=' my-2' type="email" id="email" name="email" defaultValue={cUser?.emailAddresses[0].emailAddress || ''} readOnly/>   
          <Input className='mt-2' type="text" id="clerkId" name="clerkId" defaultValue={cUser?.id || ''} readOnly/>   
        </div>
      </form>
      )}
    </div>
    {/* AGENT PROPRETIES TABLE */}
    {/* <MainTableContainer data={agentProperties} /> */}
    <MainTableComponent />
    {/* PROPRETY DETAILS TABLE */}
    {/* <PropretyDetailsTable/> */}
    </div>

    </>
  )
}

export default AdminProductPage


// async function PropertiesTable() {
//   const properties = await db.property.findMany({
//     select: {
//       id: true,
//       name: true
//     },
//     orderBy: { name: "asc" },
//   })

//   if (properties.length === 0) return <p>No properties found</p>
//   return(
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-0">
//             <span className="sr-only">Available For Purchase</span>
//           </TableHead>
//           <TableHead>Name</TableHead>
//           <TableHead>Price</TableHead>
//           <TableHead>Orders</TableHead>
//           <TableHead className="w-0">
//             <span className="sr-only">Actions</span>
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {properties.map(product => (
//           <TableRow key={product.id}>
//             <TableCell>
//               {product.isAvailableForPurchase ? (
//                 <>
//                   <span className="sr-only">Available</span>
//                   <CheckCircle2 />
//                 </>
//               ) : (
//                 <>
//                   <span className="sr-only">Unavailable</span>
//                   <XCircle className="stroke-destructive" />
//                 </>
//               )}
//             </TableCell>
//             <TableCell>{product.name}</TableCell>
//             <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
//             <TableCell>{formatNumber(product._count.orders)}</TableCell>
//             <TableCell>
//               <DropdownMenu>
//                 <DropdownMenuTrigger>
//                   <MoreVertical />
//                   <span className="sr-only">Actions</span>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                   <DropdownMenuItem asChild>
//                     <a download href={`/admin/properties/${product.id}/download`}>
//                       Download
//                     </a>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href={`/admin/properties/${product.id}/edit`}>
//                       Edit
//                     </Link>
//                   </DropdownMenuItem>
//                   <ActiveToggleDropdownItem
//                     id={product.id}
//                     isAvailableForPurchase={product.isAvailableForPurchase}
//                   />
//                   <DropdownMenuSeparator />
//                   <DeleteDropdownItem
//                     id={product.id}
//                     disabled={product._count.orders > 0}
//                   />
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }




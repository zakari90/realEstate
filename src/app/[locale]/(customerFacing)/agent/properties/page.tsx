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
import {  getAgentPropertyImages, getAgentPropertyOffers, registerClerkUserAsAgent } from "../../../../_actions/actions"
import { MainTableContainer } from "./_components/mainTable/mainTableContainer"
import MainTableComponent from "./_components/mainTable"

export const agentId = "da6b5e79-d9ff-499e-be0f-557ecdf3644e"
async function getAgentPropertiesWithDetails(agentId: string) {
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


async function AdminProductPage() {
  // const cUser = await currentUser();

  // let agent = null;
  // let agentProperties: Property[] = [];
  // let agentPropertyImages: PropertyImage[] = [];
  // let agentPropertyOffers: Offer[] = [];
  // try {
  //   agent = await registerClerkUserAsAgent();
  //   if (agent) {
  //         agentProperties = await getAgentPropertiesWithDetails(agent.id)
  //         agentPropertyImages = await getAgentPropertyImages(agent.id)
  //         agentPropertyOffers = await getAgentPropertyOffers(agent.id)
  //           }

  // } catch (error) {
  //   console.error('Error fetching data:', error);
  // }
  
  const agentProperties = await getAgentPropertiesWithDetails(agentId)


  return (
    <>
    <div className="container">

    {/* <div className="flex justify-between items-center gap-4">
      {agent ? (
        <div className="flex justify-between w-full ">
        <PageHeader>Properties</PageHeader>
        <Button>
          <Link href="/agent/properties/new">Add Property</Link>
        </Button>
        </div>
      ) : (
        <form action={registerClerkUserAsAgent} className="m-auto md:w-1/3">
          <div className='flex'>
            <Input type="text" id="phoneNumber" name="phoneNumber" placeholder='Phone Number'/>   
            <Button className='ml-3' type="submit">Submit</Button>
          </div>
      </form>
      )}
    </div> */}


    {/* AGENT PROPRETIES TABLE */}
    {/* <MainTableContainer data={agentProperties} /> */}
    <MainTableComponent properties={agentProperties} />
    {/* PROPRETY DETAILS TABLE */}
    {/* <PropretyDetailsTable/> */}
    </div>

    </>
  )
}

export default AdminProductPage






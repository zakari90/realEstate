import { AgentPropertyData, getAgentProperties, registerClerkUserAsAgent, updateAgentData } from "@/app/_actions/agent/actions"
import { PageHeader } from "@/components/pageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import MainTableComponent from "./_components/mainTable"


async function AdminProductPage() {

  let agent = null;

  let agentProperties: { properties: AgentPropertyData[] } = { properties: [] };
  try {
    agent = await registerClerkUserAsAgent();
    if (agent) {
          agentProperties = await getAgentProperties()
            }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
  console.log("-------------------------------------------------------------------")
  console.log(typeof agentProperties)
  console.log(agentProperties?.properties)
  console.log(agent?.phone)

  return (
    <>
    <div className="container">

    <div className="flex justify-between items-center gap-4">
      {agent?.phone ? (
        <div className="w-full">
          <div className="flex justify-between w-full ">
            <PageHeader>Properties</PageHeader>
          <Button>
            <Link href="/agent/properties/new">Add Property</Link>
          </Button>
          </div>
       
        <MainTableComponent properties={agentProperties?.properties} />
        </div>
      ) : (
        <form action={updateAgentData} className="m-auto md:w-1/3">
          <div className='flex'>
            <Input type="text" id="phoneNumber" name="phoneNumber" placeholder='Phone Number'/>   
            <Button className='ml-3' type="submit">Submit</Button>
          </div>
      </form>
      )}
    </div>
    
    </div>

    </>
  )
}

export default AdminProductPage






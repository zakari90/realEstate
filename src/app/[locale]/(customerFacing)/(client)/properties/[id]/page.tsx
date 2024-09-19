
import { getAgentWithPropertyId, getPropertyWithId } from "@/app/_actions/client/actions"
import PropertyListingPage from "./propertyListingPage"

async function PropertyPage({params :{id}}:{
    params:{ id : string}}) {
    const property = await getPropertyWithId(id)
    let agent
    if (property.agentId) {
      agent = await getAgentWithPropertyId(property.agentId)
    }
    console.log("======================================")
    console.log(agent?.image)
    const agentOrNull = agent === undefined ? null : agent;
  return (
  <>
    <div className='container'>PropertyPage</div>
    <PropertyListingPage agent={agentOrNull} property={property}/>
  </>
  )
}

export default PropertyPage

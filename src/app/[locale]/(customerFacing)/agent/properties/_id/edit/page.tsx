
import { PageHeader } from "@/components/pageHeader"
import { AgentPropertyData, getAgentProperties, getPropertyById } from "@/_actions/agent/actions"
import PropertyListingForm from "../../_components/propertyListingForm"

async function EditProductPage({params :{id}}:{
    params:{ id : string}
}) {
//params.id =--->  params :{id} destructive method
    const property:AgentPropertyData = await getPropertyById(id)

  return (
    <>
    <PageHeader>
       Edit Prodcut {id} 
    </PageHeader>
    <PropertyListingForm property={property}/>

    </>

  )
}

export default EditProductPage
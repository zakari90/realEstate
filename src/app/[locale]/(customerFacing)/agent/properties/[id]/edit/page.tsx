
import { PageHeader } from "@/components/pageHeader"
import { getAgentProperties } from "@/app/_actions/agent/actions"
import PropertyListingForm from "../../_components/propertyListingForm"

async function EditProductPage({params :{id}}:{
    params:{ id : string}
}) {
//params.id =--->  params :{id} destructive method
    const property = await getAgentProperties()

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
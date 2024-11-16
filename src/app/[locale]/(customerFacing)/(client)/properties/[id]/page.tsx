
import { getPropertyWithId } from "@/_actions/client/actions"
import PropertyListingPage from "./propertyListingPage"

async function PropertyPage({params :{id}}:{
    params:{ id : string}}) {
    const property = await getPropertyWithId(id)
  return (
  <>
    <PropertyListingPage property={property}/>
  </>
  )
}

export default PropertyPage

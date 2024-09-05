import { getAllProperties } from "@/app/_actions/actions"
import PropertiesSection from "./propertiesSection"


async function PropertiesSectionProvider( ) {
  const properties = await getAllProperties()
  return (
    <PropertiesSection properties={properties}/>
  )
}

export default PropertiesSectionProvider

  

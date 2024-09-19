import { getAllProperties } from '@/app/_actions/client/actions'
import { PageHeader } from '@/components/pageHeader'
import MainPropertiesSection from '../_components/property/mainPropertiesSection'

async function PropertiesPage() {
  const properties = await getAllProperties()

  return (
    <>
    {/* <PageHeader>PropertiesPage</PageHeader> */}
    <MainPropertiesSection properties={properties}/>
</>

  )
}

export default PropertiesPage
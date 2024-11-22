import { getAllProperties } from '@/_actions/client/actions'
import { PageHeader } from '@/components/pageHeader'
import MainPropertiesSection from './_components/mainPropertiesSection'

async function PropertiesPage() {
  const properties = await getAllProperties()

  return (
    <>
    {/* <PageHeader>PropertiesPage</PageHeader> */}
    <MainPropertiesSection/>
</>

  )
}

export default PropertiesPage
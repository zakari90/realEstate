import { PageHeader } from '@/components/pageHeader'
import PropertyListingForm from '../_components/propertyListingForm'

function NewProductPage() {
  return (
    <>
    <div className='container '>

    <PageHeader>
    إضافة المنتج
    </PageHeader>
    {/* <PropertyForm /> */}
    <PropertyListingForm/>
    {/* <FormProperty/> */}
    
    </div>

    </>

  )
}

export default NewProductPage
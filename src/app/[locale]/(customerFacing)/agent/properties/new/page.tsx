import { PageHeader } from '@/components/pageHeader'
import PropertyListingForm from '../_components/propertyListingForm'

function NewProductPage() {
  return (
    <>
    <div className='container '>

    <PageHeader>
    إضافة المنتج
    </PageHeader>
    <PropertyListingForm/>    
    </div>

    </>

  )
}

export default NewProductPage
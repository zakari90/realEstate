import { PageHeader } from '@/components/pageHeader'
import PropertyListingForm from '@/components/_1inUseComponents/propertyListingForm'

function NewProductPage() {
  return (
    <>
    <div className='container '>

    <PageHeader>
    إضافة ملكية 
    </PageHeader>
    <PropertyListingForm/>    
    </div>

    </>

  )
}

export default NewProductPage
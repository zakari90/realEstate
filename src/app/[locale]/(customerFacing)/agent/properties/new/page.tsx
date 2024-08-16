import { PageHeader } from '@/components/pageHeader'
import { PropertyForm } from '../_components/propertyForm'

function NewProductPage() {
  return (
    <>
    <div className='container '>

    <PageHeader>
        Add Prodcut
    </PageHeader>
    <PropertyForm />
    </div>

    </>

  )
}

export default NewProductPage
import { PageHeader } from '@/components/pageHeader'
import { PropertyForm } from '../_components/propertyForm'
import { FormProperty } from '../_components/formProperty'

function NewProductPage() {
  return (
    <>
    <div className='container '>

    <PageHeader>
        Add Prodcut
    </PageHeader>
    {/* <PropertyForm /> */}
    <FormProperty/>
    </div>

    </>

  )
}

export default NewProductPage
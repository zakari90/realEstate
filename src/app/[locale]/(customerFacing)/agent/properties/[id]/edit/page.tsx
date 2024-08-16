import { PageHeader } from "@/app/admin/_components/pageHeader"
import ProductForm from "../../_components/propertyForm"
import db from "@/db/db"


async function EditProductPage({params :{id}}:{
    params:{ id : string}
}) {
//params.id =--->  params :{id} destructive method
    const product = await db.product.findUnique({where: {id} })
  return (
    <>
    <PageHeader>
       Edit Prodcut {id}
    </PageHeader>
    <ProductForm product={product}/>

    </>

  )
}

export default EditProductPage
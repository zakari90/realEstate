
import { PageHeader } from "@/components/pageHeader"
import db from "@/db/db"
import { PropertyForm } from "../../_components/propertyForm"
import { FormProperty } from "../../_components/formProperty"
import { agentId } from "../../page";
async function agentProperties() {
  try {
  
    const properties = await db.property.findMany({
      where: {
        agentId: agentId,
      },
      include: {
        feature: true,
        location: true,
        images: true,
      },
    });

    return properties.map(property => ({
      id: property.id,
      type: property.type,
      description: property.description,
      price: property.price,
      agentId: property.agentId,
      status: property.status,
      locationId: property.locationId,
      featureId: property.featureId,
      video: property.video,
      panorama: property.panorama,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
      feature: property.feature,
      location: property.location,
      images: property.images.map(image => image.url), // Ensure `url` is non-null
    }));

  } catch (error) {
    console.error('Error fetching properties with details for agent:', error);
    throw error; // Handle the error appropriately
  }
}

async function EditProductPage({params :{id}}:{
    params:{ id : string}
}) {
//params.id =--->  params :{id} destructive method
    const property = await agentProperties()

  return (
    <>
    <PageHeader>
       Edit Prodcut {id}
    </PageHeader>
    <FormProperty property={property}/>

    </>

  )
}

export default EditProductPage
import { getPropertyWithId } from "@/app/_actions/actions"
import ProductDetails from "./productDetails"
import PropertyListingPage from "./test"

async function PropertyPage({params :{id}}:{
    params:{ id : string}}) {
      const property = await getPropertyWithId(id)
      console.log("---------------------------------------")
      console.log(property)
      console.log("-----------------------")
  return (<>
    <div className='container'>{id} PropertyPage</div>
    
    <PropertyListingPage property={property}/>
    {/* <ProductDetails product={property}/> */}
    </>
  )
}

export default PropertyPage
// export interface ClientProperty {
//   id: string ,
//   type:string | null,
//   description: string | null,
//   price: number | null,
//   agentId: string | null,
//   status: string | null,
//   locationId: string | null,
//   featureId: string | null,
//   video: string | null,
//   panorama: string | null,
//   createdAt: Date | null,
//   updatedAt: Date | null,
//   feature: PropertyFeature | null,
//   location:PropertyLocation | null,
//   images: ImageP | null,
// }
// const property=
// {
//   id: '565e6c27-5757-4cdb-bd18-b78acf461bb1',
//   type: 'house',
//   description: '',
//   price: 3000,
//   agentId: 'da6b5e79-d9ff-499e-be0f-557ecdf3644e',
//   status: 'forRent',
//   locationId: 'daa371a0-0419-419e-b91b-50f8f014ef0e',
//   featureId: '80217c9a-b8a0-4603-9d47-bcb39c781ec1',
//   video: 'https://utfs.io/f/d10eda05-4cb5-4ba3-8907-df0fc63b4281-castku.mp4',
//   panorama: 'https://3dwarehouse.sketchup.com/embed/ca842bc2-6275-4a17-8e58-7d04f72b66be?token=JV26vmLOK4g=&binaryName=s22',
//   createdAt: 2024-08-22T18:00:29.050Z,
//   updatedAt: 2024-08-22T18:00:29.050Z,
//   feature: {
//     id: '80217c9a-b8a0-4603-9d47-bcb39c781ec1',
//     bedrooms: null,
//     bathrooms: null,
//     area: 100,
//     parkingSpot: false,
//     swimmingPool: null,
//     gardenYard: null,
//     balcony: false
//   },
//   location: {
//     id: 'daa371a0-0419-419e-b91b-50f8f014ef0e',
//     streetAddress: 'sect NAHDA rue SANAOUBER',
//     city: 'SALÉ,RABAT',
//     zip: '11111',
//     landmark: ''
//   },
//   images: [
//     {
//       id: 'e304e893-1877-4d92-8f32-29eca76b3fe6',
//       url: 'https://utfs.io/f/13f66a51-214a-4456-b63e-c5ce3d6dd15f-a5xg6x.jpg',
//       propertyId: '565e6c27-5757-4cdb-bd18-b78acf461bb1'
//     },
//     {
//       id: 'aadbb967-4773-45ba-aaa1-743875462106',
//       url: ' https://utfs.io/f/bbf6a7db-bb57-4c3a-b41f-0736eb9713fd-ez4zq5.jfif',       
//       propertyId: '565e6c27-5757-4cdb-bd18-b78acf461bb1'
//     },
//     {
//       id: '246b7e55-0f51-4ff1-9f30-fde2d255e70f',
//       url: ' https://utfs.io/f/4722288b-ffab-4f1d-a5e4-4af250425b2d-rd4hja.png',        
//       propertyId: '565e6c27-5757-4cdb-bd18-b78acf461bb1'
//     }
//   ]
// }
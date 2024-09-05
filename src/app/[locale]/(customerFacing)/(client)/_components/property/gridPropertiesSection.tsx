import React from 'react'
import { ClientProperty } from './propertiesSection'
import { PropertyCard } from './propertyCard'

function GridPropertiesSection({properties}: {properties :ClientProperty[]}) {
  return (
    <div className="grid grid-cols-1 mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">     
    {properties.map(property => (
     <div key={property.id}>
       <PropertyCard property={property} />  
     </div>
    ))} 
   </div>

)
}

export default GridPropertiesSection
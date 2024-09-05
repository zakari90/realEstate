import React from 'react'
import MainPropertiesSection from './mainPropertiesSection'
import { getAllProperties } from '@/app/_actions/actions'

async function MainPropertiesSectionProvider() {
  const properties = await getAllProperties()
  return (
    <MainPropertiesSection properties={properties}/>
  )
}

export default MainPropertiesSectionProvider

import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Home, Phone, Mail, MapPin, Star, Key, Search, Building, Warehouse, MapPinIcon, RulerIcon } from 'lucide-react'

import { BathIcon, BedIcon, Pin, PinIcon, Ruler} from 'lucide-react';

import Link from 'next/link'
import Image from 'next/image'
import db from '@/db/db'
import PropertiesSection from './propertiesSection'
import { getRecentPropertiesWithDetails } from '@/app/_actions/actions'

async function page() {
  const properties = await getRecentPropertiesWithDetails()
  return (
    <>
    <PropertiesSection properties={properties} />
    </>
  )
}

export default page


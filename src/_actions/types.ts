// types.ts

export type Agents = {
  id: string;
  clerkId?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
  properties: Property[];
};

export type Property = {
  id: string;
  type?: string | null;
  description?: string | null;
  price?: number | null;
  agentId?: string | null;
  status?: string | null;
  locationId?: string | null;
  featureId?: string | null;
  video?: string | null;
  panorama?: string | null;
  createdAt: Date;
  updatedAt: Date; 
  feature?: PropertyFeature | null;
  location?: PropertyLocation | null;
  agent?: Agents | null;
            //scalar problem with sqlit fetch data from each
  offers: Offer[] | null;
  images: PropertyImage[] | null;
};

export type PropertyImage = {
  id: string;
  url?: string | null;
  propertyId?: string | null;
  property?: Property | null;
};

export type PropertyFeature = {
  id: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
  area?: number | null;
  parkingSpot?: boolean | null;
  swimmingPool?: boolean | null;
  gardenYard?: boolean | null;
  balcony?: boolean | null;
  property?: Property | null;
};

export type PropertyLocation = {
  id: string;
  streetAddress?: string | null;
  city?: string | null;
  zip?: string | null;
  landmark?: string | null;
  property?: Property | null;
};

export type Client = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
  offers: Offer[];
};

export type Offer = {
  id: string;
  propertyId?: string | null;
  clientId?: string | null;
  createdAt: Date;
  amount?: number | null;
  client?: Client | null;
  property?: Property | null;
};

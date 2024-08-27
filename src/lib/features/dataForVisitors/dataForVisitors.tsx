import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Property, PropertyImage, Offer } from '@prisma/client';
import { getAgentPropertyImages, getAgentPropertyOffers, getAllPropertiesWithDetails } from "@/app/_actions/actions";

export interface PropertySliceState {
  properties: Property[];
  images: { [propertyId: string]: PropertyImage[] };
  offers: { [propertyId: string]: Offer[] };
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: PropertySliceState = {
  properties: [],
  images: {},
  offers: {},
  status: "idle",
  error: null,
};

export const propertySlice = createAppSlice({
  name: "property",
  initialState,
  reducers: (create) => ({
    fetchProperties: create.asyncThunk(
      async () => {
        const response = await getAllPropertiesWithDetails();
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.properties = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error = action.error.message || null;
        },
      },
    ),
    fetchPropertyImages: create.asyncThunk(
      async (propertyId: string) => {
        const response = await getAgentPropertyImages(propertyId);
        return { propertyId, images: response };
      },
      {
        fulfilled: (state, action) => {
          state.images[action.payload.propertyId] = action.payload.images;
        },
      },
    ),
    fetchPropertyOffers: create.asyncThunk(
      async (propertyId: string) => {
        const response = await getAgentPropertyOffers(propertyId);
        return { propertyId, offers: response };
      },
      {
        fulfilled: (state, action) => {
          state.offers[action.payload.propertyId] = action.payload.offers;
        },
      },
    ),
  }),
  selectors: {
    selectProperties: (state) => state.properties,
    selectPropertyImages: (state) => state.images,
    selectPropertyOffers: (state) => state.offers,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
  },
});

export const { fetchProperties, fetchPropertyImages, fetchPropertyOffers } = propertySlice.actions;

export const { selectProperties, selectPropertyImages, selectPropertyOffers, selectStatus, selectError } = propertySlice.selectors;

export const fetchPropertyDetails = (propertyId: string): AppThunk =>
  async (dispatch) => {
    await dispatch(fetchPropertyImages(propertyId));
    await dispatch(fetchPropertyOffers(propertyId));
  };
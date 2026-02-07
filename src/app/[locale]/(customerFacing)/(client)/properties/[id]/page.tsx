import { getPropertyWithId } from "@/_actions/client/actions";
import { trackPropertyVisit } from "@/_actions/agent/notificationActions";
import PropertyListingPage from "@/components/propertyListingPage";

async function PropertyPage({ params: { id } }: { params: { id: string } }) {
  // Track this visit for notification system
  await trackPropertyVisit(id);

  const property = await getPropertyWithId(id);
  return (
    <>
      <PropertyListingPage property={property} />
    </>
  );
}

export default PropertyPage;

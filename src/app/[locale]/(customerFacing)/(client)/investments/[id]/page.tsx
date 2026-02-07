import { trackInvestmentVisit } from "@/_actions/agent/notificationActions";
import {
  getAcceptedInvestmentOffersSum,
  getInvestmentWithId,
} from "@/_actions/client/actions";
import InvestementListingPage from "@/components/invesListingPage";

async function InvestmentPage({ params: { id } }: { params: { id: string } }) {
  // Track this visit for notification system
  await trackInvestmentVisit(id);

  const investment = await getInvestmentWithId(id);
  const acceptedInvestmentOffersSum = await getAcceptedInvestmentOffersSum(id);

  return (
    <InvestementListingPage
      acceptedInvestmentOffersSum={acceptedInvestmentOffersSum}
      investment={investment}
    />
  );
}

export default InvestmentPage;

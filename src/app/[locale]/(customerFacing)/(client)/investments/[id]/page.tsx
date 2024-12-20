
import { getAcceptedInvestmentOffersSum, getInvestmentOffersId, getInvestmentWithId } from "@/_actions/client/actions"
import InvestementListingPage from "@/components/_1inUseComponents/invesListingPage"

async function InvestmentPage({params :{id}}:{
    params:{ id : string}}) {
    const investment = await getInvestmentWithId(id)
    const acceptedInvestmentOffersSum = await getAcceptedInvestmentOffersSum(id)
    

  return (
  <>
    <InvestementListingPage acceptedInvestmentOffersSum={acceptedInvestmentOffersSum} investment={investment}/>
  </>
  )
}

export default InvestmentPage

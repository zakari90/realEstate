
import { getInvestmentWithId } from "@/_actions/client/actions"
import InvestementListingPage from "@/components/_1inUseComponents/invesListingPage"

async function PropertyPage({params :{id}}:{
    params:{ id : string}}) {
    const investment = await getInvestmentWithId(id)
  return (
  <>
    <InvestementListingPage investment={investment}/>
  </>
  )
}

export default PropertyPage

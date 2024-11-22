
import { getInvestmentWithId, getPropertyWithId } from "@/_actions/client/actions"
import InvestementListingPage from "./invesListingPage"

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

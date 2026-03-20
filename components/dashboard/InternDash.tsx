import client from "@/lib/apolloClient";
import { gql } from "@apollo/client"

const GET_INTERN_INFO = gql`
query GetInternInfo() {
  User {
    email
    id
    role
  }
}
`

async function InternDash() {

  
  return (
    <div>InternDash</div>
  )
}

export default InternDash
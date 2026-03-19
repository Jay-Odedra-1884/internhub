import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  
  return (
    <div>{session?.user?.email}</div>
  )
}

export default page
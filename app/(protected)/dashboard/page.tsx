import InternDash from '@/components/dashboard/InternDash';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

async function page() {

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className='min-h-[calc(100vh-96px)]'>
      {session?.user.role === "Intern" && <InternDash />}
    </div>
  )
}

export default page
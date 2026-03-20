import AdminDash from '@/components/dashboard/AdminDash';
import InternDash from '@/components/dashboard/InternDash';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

async function page() {

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className='min-h-[calc(100vh-96px)]'>
      {session?.user.role === "Intern" && <InternDash />}
      {session?.user.role === "Admin" && <AdminDash />}
    </div>
  )
}

export default page
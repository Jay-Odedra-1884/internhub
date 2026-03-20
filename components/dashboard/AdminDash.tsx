"use client"

import { useSession } from 'next-auth/react';

function AdminDash() {

    const {data:session} = useSession();

  return (
     <div>
      <div className="min-h-[calc(100vh-96px)] px-10 py-5 bg-transparent">
        {/* welcome div */}
        <div className="mt-6 flex">
          <div className="">
            <h1 className="text-5xl font-semibold">Welcome in, {session?.user?.name}</h1>
            <p className="text-3xl bg-blue-100 w-fit px-3 pb-1 rounded-full mt-4 border border-blue-500">
              {session?.user?.role}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default AdminDash
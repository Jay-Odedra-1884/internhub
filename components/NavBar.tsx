"use client"

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Logout from './Logout';


function NavBar() {
  const { data: session, status } = useSession();

  return (
    <div className='w-full h-24 flex justify-between items-center px-10'>
        <div>
            <p className='text-3xl font-bold'>InternHub</p>
        </div>
        <div className='flex gap-4 bg-blue-100 border border-blue-500 text-black p-2 rounded-full'>
            <Link className='text-lg hover:text-gray-400' href="/">Home</Link>
            <Link className='text-lg hover:text-gray-400' href="/about-us">About Us</Link>
            <Link className='text-lg hover:text-gray-400' href="/dashboard">Dashboard</Link>
            {
              status === "loading" ? (
                // Show nothing (or a spinner) while session is being fetched
                <span className='text-lg text-gray-400'>...</span>
              ) : session?.user ? (
                <div className='flex items-center gap-2 bg-blue-100 text-black px-1 rounded-sm'>
                  {/* <p className='text-lg font-semibold'>{session.user.name}</p> */}
                  <Logout />
                </div>
              ) : (
                <Link className='text-lg hover:text-gray-400 cursor-pointer text-blue-400 font-bold' href="/auth/login">Login</Link>
              )
            }
        </div>
    </div>
  )
}

export default NavBar
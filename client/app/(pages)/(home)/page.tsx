import Navbar from '@/app/components/Navbar'
import Post from '@/app/components/Post'
import { accessToken, sessionToken } from '@/lib/cookie'
import React from 'react'

export default function Home() {
  console.log("home")
  console.log(sessionToken)
  return (
    <div className='space-y-10'>
      <Navbar sessionToken={sessionToken || ''} />
      <div className="mx-20 px-20">
        <Post avatar='Shyam' name='Shyam' createdAt=''/>
      </div>
    </div>
  )
}

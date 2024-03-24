import Navbar from '@/app/components/Navbar'
import Post from '@/app/components/Post'
import React from 'react'

export default function Home() {
  return (
    <div className='space-y-10'>
      <Navbar/>
      <div className="mx-20 px-20">
      <Post avatar='Shyam' name='Shyam' createdAt=''/>
      </div>
    </div>
  )
}

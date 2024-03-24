'use client';

import { useAppSelector } from '@/app/redux/hooks';
import { permanentRedirect, redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const sessionToken = useAppSelector((state) => state.sessionToken.value);
  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);

//   useEffect(() => {
//     if (isInitialRender && !sessionToken) {
//       router.push('/');
//     }
//     setIsInitialRender(false);
//   }, [sessionToken, router, isInitialRender]);

//   if(sessionToken){
  return (<div className="">{children}</div>);
//   }else{
//     redirect("/auth/login");
//   }
}
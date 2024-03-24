'use client';

import { useAppSelector } from './redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function sessionToken({ children }: { children: React.ReactNode }) {
  const sessionToken = useAppSelector((state) => state.sessionToken.value);
  const router = useRouter();

  useEffect(() => {
    if (!sessionToken) {
      router.push('/');
    }
  }, [sessionToken, router]);

}
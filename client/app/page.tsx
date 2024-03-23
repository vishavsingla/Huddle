'use client';

import Home from "./(pages)/(home)/page";
import { useAppSelector } from './redux/hooks';

export default function page() {
  // const storeState = useAppSelector((state) => state);

  const sessionToken = useAppSelector((state) => state.sessionToken.value);

  return (
    <div className="">
      <Home/>
      <p>{sessionToken || 'No session token set'}</p>
    </div>
  );
}

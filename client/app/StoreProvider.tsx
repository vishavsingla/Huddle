'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './redux/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// 'use client';
// import { useEffect, useRef } from 'react';
// import { Provider } from 'react-redux';
// import { makeStore, AppStore } from './redux/store';
// import { getCookies } from 'cookies-next';

// export default function StoreProvider({ children }: { children: React.ReactNode }) {
//   const cookieName = 'sessionToken';

//   useEffect(() => {
//     const sessionToken = getCookies(cookieName as any); // Add 'as any' to bypass type checking
//     if (sessionToken) {
//       storeRef.current?.dispatch({ type: 'sessionToken/set', payload: sessionToken });
//     }
//   }, []);

//   const storeRef = useRef<AppStore | null>(null);
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//   }

//   return <Provider store={storeRef.current}>{children}</Provider>;
// }
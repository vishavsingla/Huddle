
import { getCookie, getCookies, setCookie } from "cookies-next";
import Home from "./(pages)/(home)/page";
// import { useAppSelector } from './redux/hooks';
import { cookies } from 'next/headers';

function page() {
  // const storeState = useAppSelector((state) => state);
  const i =  getCookie('sessionToken',{cookies});
  console.log(i)
  // console.log(i.sessionToken);
  // const sessionToken = useAppSelector((state) => state.sessionToken.value);
  return (
    <div className="">
      <Home/>
    </div>
  );
}
export default page
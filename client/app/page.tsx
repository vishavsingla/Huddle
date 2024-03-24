
import { getCookie, setCookie } from "cookies-next";
import Home from "./(pages)/(home)/page";
// import { useAppSelector } from './redux/hooks';


export default function page() {
  // const storeState = useAppSelector((state) => state);
  const i =  getCookie('sessionToken');
  console.log("hello")
  console.log(i);
  // const sessionToken = useAppSelector((state) => state.sessionToken.value);
  return (
    <div className="">
      <Home/>
      {i}
      {/* <p>{sessionToken || 'No session token set'}</p> */}
    </div>
  );
}


import { cookies } from "next/headers";

export const cookieStore = cookies();

cookieStore.set("sessionToken", "sessionToken", { secure: true });

// console.log(cookieStore);
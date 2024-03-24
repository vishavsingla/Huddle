'use client';

import React from "react";
import ToggleTheme from "./ToggleTheme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from '../redux/hooks';

function Navbar() {
  const sessionToken = useAppSelector((state) => state.sessionToken.value);

  return (
    <div className="dark:bg-white bg-black px-20">
      <nav className="flex items-center justify-between px-4 py-3">

        <div className="text-xl font-bold dark:text-black text-white">
          Huddle
        </div>

        <div className="flex items-center">
          <ToggleTheme />

          <span className="mx-4 text-gray-500">|</span>

          {sessionToken ? (
            <Avatar className="">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Link href="/auth/login" className="mr-4">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
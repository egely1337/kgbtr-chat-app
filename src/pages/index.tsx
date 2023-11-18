import React from "react";

import LoginWithReddit from "../components/loginwithreddit";

import {signIn} from 'next-auth/react';
import { useRouter } from "next/router";

export default function Page(props: {

}) {
  const router = useRouter();

  async function SignInWithReddit() {
    await signIn("reddit", {
      redirect: true
    }).then(response => {
      router.push((response.ok ? "/chat" : "/"));
    })
  }
  
  return(
      <>
          <section 
            id="main"
            className="min-h-screen flex flex-col items-center justify-center"
          > 
            <span className="text-white text-6xl font-bold">KGBTR Bar</span>
            <LoginWithReddit
              onClick={SignInWithReddit}
              text="Reddit ile Giriş Yap"
              className="px-24 mt-8"
            />
          </section>
      </>
  )
}
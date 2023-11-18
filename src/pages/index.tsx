import React from "react";

import LoginWithReddit from "../components/loginwithreddit";

import {signIn} from 'next-auth/react';

export default function Page(props: {

}) {

  async function SignInWithReddit() {
    signIn("reddit", {
      redirect: true
    });
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
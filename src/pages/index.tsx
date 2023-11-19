import React from "react";

import LoginWithReddit from "../components/loginwithreddit";

import {signIn, useSession} from 'next-auth/react';
import { useRouter } from "next/router";
import Head from "next/head";

export default function Page(props: {

}) {
  const router = useRouter();
  const session = useSession();

  async function SignInWithReddit() {
    await signIn("reddit", {
      redirect: true
    }).then(response => {
      router.push((response?.ok ? "/chat" : "/"));
    })
  }

  React.useEffect(() => {
    if(session.status == "authenticated") {
      router.push("/chat");
    }
  }, [session])
  
  return(
      <>
          <Head>
            <title>KGBTR BAR</title>
          </Head>
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
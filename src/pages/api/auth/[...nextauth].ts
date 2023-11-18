import { AuthOptions } from "next-auth";

import NextAuth from "next-auth/next";

import RedditProvider from 'next-auth/providers/reddit';

export const authOptions: AuthOptions = {
    providers: [
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,
            
            type: "oauth",
            profile: (profile) => {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: null
                }
            },
            authorization: {
                params: {
                    duration: "permament"
                }
            },
            
            
        })
    ],
    callbacks: {
        //@ts-ignore
        async signIn(user, account, profile) {
            if(account.provider == "reddit") {
                return "/chat";
            }
        }
    },
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60
    }
}

export default NextAuth(authOptions);
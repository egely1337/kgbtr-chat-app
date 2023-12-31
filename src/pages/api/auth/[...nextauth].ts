import { AuthOptions } from "next-auth";

import NextAuth from "next-auth/next";

import RedditProvider from 'next-auth/providers/reddit';

export const authOptions: AuthOptions = {
    providers: [
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID,
            clientSecret: process.env.REDDIT_CLIENT_SECRET,  
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60
    }
}

export default NextAuth(authOptions);
import { NextApiRequest, NextApiResponse } from "next";



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.json({
        secret: process.env.REDDIT_CLIENT_SECRET,
        id: process.env.REDDIT_CLIENT_ID
    })
}
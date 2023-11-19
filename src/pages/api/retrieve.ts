import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import client from "../../../prisma/prisma";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST") res.status(402).end();
    try {
        const session = await getServerSession(req, res, authOptions);

        if(!session) return res.json({
            status: false,
            message: "You need to authenticate"
        });

        return res.json({
            status: true,
            messages: JSON.parse(JSON.stringify(await client.message.findMany({
                take: 100,
                orderBy: {
                    created_at: 'desc'
                }
            })))
        })

    } catch(err) {
        return res.json({
            status: false,
            message: "WHEA_INCORRECTABLE_ERROR",
            err: err
        })
    }
}
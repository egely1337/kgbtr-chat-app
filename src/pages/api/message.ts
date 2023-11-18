import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";
import socket from "../../server/socket";
import GetAvatarUser from "../../util/getAvatarUser";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== "POST") return res.json({status: false, message: "Method Not Allowed."});

    try {
        const session = await getServerSession(req, res, authOptions);

        if(!session) {
            return res.json({
                status: false,
                message: "You are not authorized."
            });
        }        
        const {message} = req.body;

        socket.emit('message', {
            message: message,
            author: session.user.name,
            created_at: new Date(),
            author_image: await GetAvatarUser(session.user.name)
        })

        res.status(200).end();
    } catch(err) {
        return res.json({
            status: false,
            message: "WHEA_INCORRECTABLE_ERROR",
            err: err
        })
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";
import client from "../../../prisma/prisma";
import createMessage from "../../util/createMessage";
import handleCommands from "../../util/handleCommands";

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
        const {message, replyMessageId}: {message: string, replyMessageId: number} = req.body;

        if(!message) {
            return res.json({
                status: false,
                message: "Mesaj göndermek için bir şeyler gir."
            })
        }
        
        const commandResult = await handleCommands(message, session);

        if(commandResult !== undefined) {
            return res.json(commandResult);
        }

        if(!await client.bannedUsers.findUnique({where: {username: session.user.name}})) {
            await createMessage(session, message, replyMessageId);
            res.status(200).end();
        }

        return res.json({
            status: false,
            message: "Bu sohbetten yasaklandınız."
        })
    } catch(err) {
        return res.json({
            status: false,
            message: "WHEA_INCORRECTABLE_ERROR",
            err: err
        })
    }
}
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";
import GetAvatarUser from "../../util/getAvatarUser";
import axios from "axios";
import client from "../../../prisma/prisma";
import createMessage from "../../util/createMessage";
import isUserAdmin from "../../util/isUserAdmin";
import handleCommands from "../../util/handleCommands";
import deleteMessage from "../../util/deleteMessage";

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

        const {id}: {id: number} = req.body;
        await deleteMessage(id);
        
        res.status(200).end();
    } catch(err) {
        return res.json({
            status: false,
            message: "WHEA_INCORRECTABLE_ERROR",
            err: err
        })
    }
}
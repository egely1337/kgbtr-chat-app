import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "./auth/[...nextauth]";
import GetAvatarUser from "../../util/getAvatarUser";
import axios from "axios";
import client from "../../../prisma/prisma";

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

        if(!message) {
            return res.json({
                message: "Type something!"
            })
        }

        const author_image = await GetAvatarUser(session.user.name);

        await axios.post(`${process.env.WEBSOCKET_URL}/create_message`, {
            message: message,
            created_at: new Date(),
            author: session.user.name,
            author_image: author_image
        }).then(res => res.data);

        await client.message.create({
            data: {
                message: message,
                author: session.user.name,
                author_image: author_image,
                created_at: new Date()
            }
        })

        return res.json({
            status: true
        });
    } catch(err) {
        return res.json({
            status: false,
            message: "WHEA_INCORRECTABLE_ERROR",
            err: err
        })
    }
}
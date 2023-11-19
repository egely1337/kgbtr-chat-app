import { Session } from "next-auth";
import getAvatarUser from "./getAvatarUser";
import axios from "axios";
import client from "../../prisma/prisma";


export default async function deleteMessage(
    id: number
): Promise<Boolean> {
    try {
        await client.message.delete({
            where: {
                id: id
            }
        })
        
        await axios.post(`${process.env.WEBSOCKET_URL}/delete_message`, {
            id: id
        }).then(res => res.data);

        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
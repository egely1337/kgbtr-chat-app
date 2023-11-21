import { Session } from "next-auth";
import getAvatarUser from "./getAvatarUser";
import axios from "axios";
import client from "../../prisma/prisma";


export default async function createMessage(
    session: Session,
    message: string,
    replyId: number
): Promise<Boolean> {
    try {
        const author_image = await getAvatarUser(session.user.name);

        const {id} = await client.message.create({
            data: {
                message: message,
                author: session.user.name,
                author_image: author_image,
                created_at: new Date(),
                replyMessageId: replyId
            }
        })

        await axios.post(`${process.env.WEBSOCKET_URL}/create_message`, {
            message: message,
            created_at: new Date(),
            author: session.user.name,
            author_image: author_image,
            id: id,
            replyMessageId: replyId
        }).then(res => res.data);

        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
import { Session } from "next-auth";
import isUserAdmin from "./isUserAdmin";
import client from "../../prisma/prisma";



export default async function handleCommands(
    command: string,
    session: Session
): Promise<{} | undefined> {
    try {

        if(command.includes("/ban") && await isUserAdmin(session.user.name)) {
            const params = command.split(" ");
            
            if(params.length >= 2) {
                await client.bannedUsers.create({
                    data: {
                        username: params[1]
                    }
                }) 
            }

            return {
                status: true,
                message: `Başarıyla ${params[1]} isimli kullanıcıyı yasakladın.`
            };
        }
        if(command.includes("/unban") && await isUserAdmin(session.user.name)) {
            const params = command.split(" ");
            
            if(params.length >= 2) {
                await client.bannedUsers.delete({
                    where: {
                        username: params[1]
                    }
                }) 
            }

            return {
                status: true,
                message: `Başarıyla ${params[1]} isimli kullanıcının yasağını kaldırdın.`
            };
        }
    } catch(err) {
        return undefined;
    }
}
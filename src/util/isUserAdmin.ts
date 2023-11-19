import config from "../config.json";

export default async function isUserAdmin(
    username: string
): Promise<boolean> {
    try {
        return config.moderators.includes(username)
    } catch(err) {
        return false;
    }
}
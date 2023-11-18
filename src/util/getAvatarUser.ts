import axios from "axios";


type User = {
    kind: string,
    data: {
        snoovatar_img: string,
        subreddit: {
            icon_img: string
        }
    }
}

export default async function GetAvatarUser(
    username: string
): Promise<string | undefined> {
    return new Promise(async (resolve,reject) => {
        try {
            const res: User = await axios.get(`https://www.reddit.com/user/${username}/about.json`).then(res => res.data);
            resolve(res.data.subreddit.icon_img.replace(/&amp;/g, '&'));
        } catch(err) {
            reject(undefined);
        }
    })
} 
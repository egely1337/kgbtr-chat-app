export default function checkOnlyEmoji(str: string) : boolean {
    const regex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    return regex.test(str);
}
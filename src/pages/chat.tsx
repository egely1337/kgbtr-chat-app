import React from "react";
import Message from "../components/message";
import MessageInput from "../components/input";

import io from 'socket.io-client';
import axios from "axios";

import config from "../config.json";

import { useSession } from "next-auth/react";

export default function Page(props: {
}) {
    const session = useSession();

    const [messages, setMessages] = React.useState<{
        author: string,
        message: string,
        author_image: string,
        created_at: Date
    }[]>([]);

    const socket = io(config.websocket_url);
    const [input, setInput] = React.useState<string>("");

    const scrollReferance = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        socket.on('message', ({message, author, author_image, created_at}) => {
            setMessages([...messages, {
                message: message,
                author: author,
                author_image: author_image,
                created_at: created_at
            }])
        })
    }, [socket]);


    return(
        <>
            <section
                id="chat"
                className="h-screen w-full flex flex-col justify-center items-center"
            >
                <div className="lg:w-5/6 w-full lg:h-5/6 h-full overflow-auto overflow-y-hidden p-12 bg-[#404040]">
                    <div className="flex flex-col">
                        {messages?.map((value, index) => {
                            return(
                                <Message
                                    key={index}
                                    author={value.author}
                                    message={value.message}
                                    end={false}
                                    created_at={new Date()}
                                    avatar_img={value.author_image}
                                    sameUser={(value.author == messages.at(index-1)?.author)}
                                />
                            )
                        })}
                    </div>
                </div>
                <MessageInput 
                    className="mt-4"
                    onChange={({target}) => setInput(target.value)}
                    onSubmit={() => {
                        axios.post("/api/message", {
                            message: input
                        })
                    }} 
                />
            </section>
        
        </>
    )
}
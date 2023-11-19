import React from "react";
import Message from "../components/message";
import MessageInput from "../components/input";

import io from 'socket.io-client';
import axios from "axios";
import { useSession } from "next-auth/react";

import config from "../config.json";
import toast from "react-hot-toast";

export default function Page(props: {

}) {
    const session = useSession();

    const [messages, setMessages] = React.useState<{
        author: string,
        message: string,
        author_image: string,
        created_at: Date,
        id: number
    }[]>([]);

    const [input, setInput] = React.useState<string>("");
    const [inputEnabled, setInputEnabled] = React.useState<boolean>(false);
    const chatContainerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const socket = io(config.websocket_url);

        socket.on('message', ({message, author, author_image, created_at, id}) => {
            const element: {
                message: string,
                author: string,
                author_image: string,
                created_at: Date,
                id: number
            } = {
                message: message,
                author: author,
                author_image: author_image,
                created_at: created_at,
                id: id
            };
            setMessages((prev) => [...prev, element]);
        })

        socket.on('delete', ({id}) => {
            setMessages((prev) => {
                return prev.filter((value) => value.id !== id)
            });    
        })

        
        return () => {
            socket.disconnect();
        }
    }, []);

    React.useEffect(() => {
        async function ScrollToBottom() {
            if(chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }
        ScrollToBottom();
    }, [messages]);

    React.useEffect(() => {
        async function GetMessages() {
            const res: {
                status: boolean,
                messages: {
                    message: string,
                    author: string,
                    author_image: string,
                    created_at: Date,
                    id: number
                }[]
            } =  await axios.post("/api/retrieve").then(res => res.data);
            setMessages(res.messages);
        }

        GetMessages();
    }, [])

    return(
        <>
            <section
                id="chat"
                className="h-screen w-full flex flex-col justify-center items-center"
            >
                <div ref={chatContainerRef} className="lg:w-5/6 w-full lg:h-5/6 h-full overflow-auto p-8 bg-[#404040]">
                    <div className="flex flex-col">
                        {messages?.map((value, index) => {
                            return(
                                <Message
                                    key={index}
                                    id={value.id}
                                    author={value.author}
                                    message={value.message}
                                    end={(value.author == session.data?.user?.name)}
                                    created_at={new Date(value.created_at)}
                                    avatar_img={value.author_image}
                                    sameUser={(value.author == messages.at(index-1)?.author)}
                                />
                            )
                        })}
                    </div>
                </div>
                <MessageInput 
                    enabled={!inputEnabled}
                    className="mt-4"
                    onChange={({target}) => setInput(target.value)}
                    onSubmit={async () => {
                        const message = input
                        setInput("");
                        await axios.post("/api/message", {
                            message: message
                        }).then(res => {
                            const result: {
                                status: boolean,
                                message: string
                            } = res.data;

                            if(result.message) {
                                toast[result.status ? "success" : "error"](result.message)
                            }
                        })
                    }} 
                />
            </section>
        
        </>
    )
}
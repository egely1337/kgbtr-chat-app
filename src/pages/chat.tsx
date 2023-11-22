import React from "react";
import Message from "../components/message";
import MessageInput from "../components/input";

import io from 'socket.io-client';
import axios from "axios";
import { useSession } from "next-auth/react";

import config from "../config.json";
import toast from "react-hot-toast";
import Head from "next/head";
import { Message as MessageDbObject } from "@prisma/client";


export default function Page(props: {

}) {
    const session = useSession();

    const [messages, setMessages] = React.useState<MessageDbObject[]>([]);

    const [input, setInput] = React.useState<string>("");
    const chatContainerRef = React.useRef<HTMLDivElement>(null);
    const [replyMessageId, setReplyMessageId] = React.useState<number>(0);

    function findMessageById(idToFind: number): MessageDbObject | undefined {
        return messages.find(message => message.id === idToFind);
    }

    React.useEffect(() => {
        const socket = io(config.websocket_url);

        socket.on('message', ({message, author, author_image, created_at, id, replyMessageId}) => {
            const element: {
                message: string,
                author: string,
                author_image: string,
                created_at: Date,
                id: number,
                replyMessageId: number
            } = {
                message: message,
                author: author,
                author_image: author_image,
                created_at: created_at,
                id: id,
                replyMessageId: replyMessageId
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
            const percent = (chatContainerRef.current) ? (chatContainerRef.current.scrollTop / chatContainerRef.current.scrollHeight * 100) : 0;
            if(percent >= 88 && chatContainerRef.current) {
                if(chatContainerRef.current.scrollTop > chatContainerRef.current.scrollHeight - 2000) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
            }
        }
        ScrollToBottom();
    }, [messages]);

    React.useEffect(() => {
        async function GetMessages() {
            const res: {
                status: boolean,
                messages: MessageDbObject[]
            } =  await axios.post("/api/retrieve").then(res => res.data);
            setMessages(res.messages);
        }

        GetMessages();
    }, [])

    return(
        <>
            <Head>
                <title>Sohbet</title>
            </Head>
            <section
                id="chat"
                className="h-screen w-full flex flex-col justify-center items-center"
            >
                <div ref={chatContainerRef} className="lg:w-5/6 w-full lg:h-5/6 h-full overflow-auto lg:p-8 p-2 bg-[#404040]">
                    <div className="flex flex-col gap-2">
                        {messages?.map((value, index) => {
                            return(
                                <Message
                                    onReplyButtonClick={(messageId) => setReplyMessageId(messageId)}
                                    key={index}
                                    id={value.id}
                                    author={value.author}
                                    message={value.message}
                                    end={(value.author == session.data?.user?.name)}
                                    created_at={new Date(value.created_at)}
                                    avatar_img={value.author_image}
                                    sameUser={(value.author == messages.at(index-1)?.author)}
                                    replyMessage={findMessageById(value.replyMessageId) }
                                />
                            )
                        })}
                    </div>
                </div>
                <MessageInput
                    onReplyingMessageEnd={() => setReplyMessageId(0)}
                    replyingMessage={messages.find((value) => value.id == replyMessageId)}
                    className="mt-4"
                    enabled
                    onChange={({target}) => setInput(target.value)}
                    onSubmit={async () => {
                        const message = input
                        setInput("");
                        setReplyMessageId(0);
                        await axios.post("/api/message", {
                            message: message,
                            replyMessageId: replyMessageId
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
import React from "react";
import Message from "../components/message";
import MessageInput from "../components/input";

import io from 'socket.io-client';

export default function Page(props: {
}) {
    const [messages, setMessages] = React.useState<{
        author: string,
        message: string,
        author_image: string,
        created_at: Date
    }[]>([]);

    const socket = io("http://localhost:3001");
    const [input, setInput] = React.useState<string>("");

    React.useEffect(() => {
        socket.on('message', ({message, author}) => {
            setMessages([...messages, {
                message: message,
                author: author,
                author_image: "",
                created_at: new Date()
            }])
        })
    }, [socket]);

    return(
        <>
            <section
                id="chat"
                className="h-screen w-full flex flex-col justify-center items-center"
            >
                <div className="lg:w-5/6 w-full lg:h-5/6 h-full overflow-auto p-12 bg-[#404040]">
                    <div className="flex flex-col gap-8">
                        {messages?.map((value, index) => {
                            return(
                                <Message
                                    key={index}
                                    author={value.author}
                                    message={value.message}
                                    end={false}
                                    created_at={new Date()}
                                    avatar_img="https://styles.redditmedia.com/t5_4x2ack/styles/profileIcon_snoo-nftv2_bmZ0X2VpcDE1NToxMzdfOGE0NjkxNTJlMmM3NzU2NjhmNWRlOGZhZTFiNTZiMzZmYjk3ZTBiOF81MTA2_rare_17dd3586-98a6-43d6-99ad-7a196ddf50dd-headshot.png?width=256&height=256&crop=256:256,smart&s=b5371a59902a478eb5c6d69df8baf13efcd526c0"
                                />
                            )
                        })}
                    </div>
                </div>
                <MessageInput 
                    className="mt-4"
                    onChange={({target}) => setInput(target.value)}
                    onSubmit={() => {
                        socket.emit("message", {
                            message: input,
                            author: "amknewisiken"
                        })
                    }} 
                />
            </section>
        
        </>
    )
}
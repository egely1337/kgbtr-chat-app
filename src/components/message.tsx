import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaTrash, FaReply } from "react-icons/fa";

import strftime from "strftime";
import checkOnlyEmoji from "../util/checkOnlyEmoji";
import { Message } from "@prisma/client";

import { SiAdguard } from "react-icons/si";

import config from "../config.json";



export default function Message(props: {
    message: string,
    author: string,
    avatar_img: string,
    created_at: Date,
    id: number
    end: boolean,
    sameUser: boolean,
    replyMessage?: Message
    onReplyButtonClick?: (messageId: number) => void
}) {
    
    if(props.end) {
        return(
            <div className={`self-end messageCreation mt-4 flex flex-col`} id={`message_${props.id}`}>
                    {props.replyMessage && <Link href={`/chat#message_${props.replyMessage.id}`} className="flex flex-row gap-2 mb-2 items-center">
                        <FaReply
                            className="text-gray-300 cursor-pointer rotate-180"
                            size={10}
                        />
                        <span className="text-gray-300 text-xs">Yanıt verildi <strong>{props.replyMessage.message}</strong></span>
                    </Link>}
                    <div className="flex flex-row">
                        <div className="flex flex-col text-right">
                            <div className="flex flex-row gap-2 items-center">
                                <Link href={`https://reddit.com/u/${props.author}`} className="text-white text-sm text-opacity-70 mb-2">{props.author} {strftime("%H:%M", props.created_at)}  </Link>
                                <SiAdguard className="bg-red-600 p-1 rounded-md text-white" size={18}/>
                            </div>
                            {   props.message.includes("https://") && /\.(png|jpg|gif)$/i.test(props.message) ? 
                                <img className="lg:max-w-xl max-w-sm" src={props.message}/>
                                :
                                <span className={`text-white ${checkOnlyEmoji(props.message) ? "text-6xl" : "text-base"}`}>{props.message}</span>
                            }
                            <div className="flex flex-row gap-2">
                                <FaTrash 
                                    onClick={async () => {
                                        await axios.post("/api/delete", {
                                            id: props.id
                                        });
                                    }} 
                                    size={10} 
                                    className="self-end mt-4 text-gray-300 hover:text-opacity-70 cursor-pointer"
                                />
                                <FaReply
                                    onClick={() => props.onReplyButtonClick(props.id)}
                                    className="self-end mt-4 text-gray-300 hover:text-opacity-70 cursor-pointer"
                                    size={10}
                                />
                            </div>
                        </div>
                        <div className={`flex items-center gap-2 flex-row ml-4`}>
                            <img src={props.avatar_img} className="min-w-[36px]" width={36}/>
                        </div>
                    </div>
            </div>
        )
    } else {
        return(
            <div className={`self-start messageCreation mt-4 flex flex-col`} id="message">
                {props.replyMessage && <Link href={`/chat#message_${props.replyMessage.id}`} className="flex flex-row gap-2 mb-2 items-center">
                    <FaReply
                        className="text-gray-300 cursor-pointer rotate-180"
                        size={10}
                    />
                    <span className="text-gray-300 text-xs">Yanıt verildi <strong>{props.replyMessage.message}</strong></span>
                </Link>}
                <div className="flex flex-row">
                    <div className={`flex items-center gap-2 flex-row mr-4`}>
                            <img src={props.avatar_img} className="min-w-[36px]" width={36}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row gap-2 items-center">
                                <Link href={`https://reddit.com/u/${props.author}`} className="text-white text-sm text-opacity-70 mb-2">{props.author} {strftime("%H:%M", props.created_at)}  </Link>
                                <SiAdguard className="bg-red-600 p-1 rounded-md text-white" size={18}/>
                            </div>
                            { props.message.includes("https://") && /\.(png|jpg|gif)$/i.test(props.message) ? 
                                <img className="lg:max-w-xl max-w-sm" src={props.message}/> : 
                                <span className={`text-white ${checkOnlyEmoji(props.message) ? "text-6xl" : "text-base"}`}>{props.message}</span>
                            }
                    </div>
                </div>
            </div>
        )
    }
}
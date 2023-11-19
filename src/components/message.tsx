import axios from "axios";
import Link from "next/link";
import React from "react";
import { FaTrash } from "react-icons/fa";

import strftime from "strftime";

export default function Message(props: {
    message: string,
    author: string,
    avatar_img: string,
    created_at: Date,
    id: number
    end: boolean,
    sameUser: boolean
}) {
    
    if(props.end) {
        return(
            <div className={`self-end messageCreation mt-4 flex flex-row`} id="message">
                    <div className="flex flex-col text-right">
                        <Link href={`https://reddit.com/u/${props.author}`} className="text-white text-sm text-opacity-70 mb-2">{props.author} {strftime("%H:%M", props.created_at)}  </Link>
                        {   props.message.includes("https://") && /\.(png|jpg)$/i.test(props.message) ? 
                            <img className="max-w-xl" src={props.message}/>
                            :
                            <span className="text-white">{props.message}</span>
                        }
                        <FaTrash 
                            onClick={async () => {
                                await axios.post("/api/delete", {
                                    id: props.id
                                });
                            }} 
                            size={10} 
                            className="self-end mt-4 text-gray-300 hover:text-opacity-70 cursor-pointer"
                        />
                    </div>
                    <div className={`flex items-center gap-2 flex-row ml-4`}>
                        <img src={props.avatar_img} width={36}/>
                    </div>
            </div>
        )
    } else {
        return(
            <div className={`self-start messageCreation mt-4 flex flex-row`} id="message">
                    <div className={`flex items-center gap-2 flex-row mr-4`}>
                        <img src={props.avatar_img} width={36}/>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-sm text-opacity-70 mb-2">{props.author} {strftime("%H:%M", props.created_at)} </span>
                        <span className="text-white">{props.message}</span>
                    </div>
            </div>
        )
    }
}
import React from "react";

import strftime from "strftime";

export default function Message(props: {
    message: string,
    author: string,
    avatar_img: string,
    created_at: Date
    end: boolean,
    sameUser: boolean
}) {
    
    if(props.end) {
        return(
            <div className={`self-end messageCreation mt-4 flex flex-row`} id="message">
                    <div className="flex flex-col text-right">
                        <span className="text-white text-sm text-opacity-70 mb-2">{props.author} {strftime("%H:%M", props.created_at)} </span>
                        <span className="text-white">{props.message}</span>
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
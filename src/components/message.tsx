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
    return(
        <div className={`${props.end ? "self-end" : "self-start"} mt-4 flex flex-row`} id="message">
            <div className={`flex items-center gap-2 flex-row`}>
                <img src={props.avatar_img} width={36}/>
            </div>
            <div>
                <span className="p-2 text-white text-sm text-opacity-70 mb-2">{props.author} {strftime("%H:%M", props.created_at)}</span>
                <div className="py-4 px-2 ml-2 bg-white rounded-md min-w-[calc(100vh-50vh)] lg:min-w-xl max-w-xs">
                    <span className="lg:text-base text-sm">{props.message}</span>
                </div>
            </div>
        </div>
    )
}
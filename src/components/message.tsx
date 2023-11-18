import React from "react";


export default function Message(props: {
    message: string,
    author: string,
    avatar_img: string,
    created_at: Date
    end: boolean,
    sameUser: boolean
}) {
    return(
        <div className={`${props.end ? "self-end" : "self-start"} flex flex-col`} id="message">
            {props.sameUser && <div className={`flex items-center gap-2 flex-row`}>
                <img src={props.avatar_img} width={36}/>
                <span className="text-white">{props.author}</span>
            </div>}
            <div className="lg:p-4 p-2 mt-2 bg-white rounded-md min-w-[calc(100vh-50vh)] lg:min-w-xl max-w-xs">
                <span className="lg:text-base text-sm">{props.message}</span>
            </div>
            {props.sameUser && <div className="mt-6"/>}
        </div>
    )
}
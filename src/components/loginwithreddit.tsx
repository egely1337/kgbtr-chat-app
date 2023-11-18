import React from "react";

import { FaRedditAlien } from "react-icons/fa";


export default function LoginWithReddit(props: {
    text: string,
    onClick: () => void,
    className?: string
}) {
    return(
        <button onClick={props.onClick} className={`${props.className} justify-center items-center bg-red-600 px-4 py-3 flex flex-row gap-2 rounded-md hover:bg-red-700 duration-300`}>
            <FaRedditAlien size={32} className="text-white hover:text-opacity-70 duration-300"/>
            <span className="text-white text-xl">{props.text}</span>
        </button>
    )
}
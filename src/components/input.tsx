import React from "react";

import { MdSend } from "react-icons/md";


export default function MessageInput(props: {
    onChange: () => void,
    className?: string
}) {
    return(
        <div className={`w-5/6 flex items-center relative rounded-md bg-[#404040] ${props.className}`}>
            <input 
                type="text" 
                className="w-[95%] p-4 bg-transparent border-none outline-none text-white"
            />
            <MdSend 
                className="absolute right-4 text-white cursor-pointer hover:text-opacity-70 duration-300"
                size={24}
                onClick={() => alert("ananı götten siktim")}
            />
        </div>
    )
}
import React from "react";

/* eslint react/prop-types: 0 */

import "../styles/tailwind.css"

function MessagePage({ message = {
    sender: "carlos",
    header: "bom dia!",
    time: "00:00 00/00/00",
    content: "empty"
} }) {
    return (
        <div className="px-4 flex flex-col">
            <h3 className="flex text-3xl font-bold ">{message.header}
                <small className="flex-1 ms-2 font-semibold text-gray-500">{message.sender}</small>
                <small className="ms-2 font-semibold text-gray-500">{message.time}</small>
            </h3>
            <hr className="h-px my-8 bg-gray-200 border-0" />
            <div className="flex-1">{message.content}</div>
        </div>
    )
}

export default MessagePage;
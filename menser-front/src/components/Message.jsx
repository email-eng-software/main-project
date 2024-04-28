import React from "react";

/* eslint react/prop-types: 0 */

export default function Message({author = "unknown", header = "no header", date = "00:00 00/00/00", route="/"}){
    return (
        <a href= {route} className="rounded h-12 flex items-center justify-between border-gray-100 border-solid border-2">
            <div className="px-4">{author}</div>
            <div className="border-x-2 flex-1 px-4">{header}</div>
            <div className="px-4">{date}</div>
        </a>
    )
}
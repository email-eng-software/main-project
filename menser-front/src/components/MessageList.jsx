import React from "react";
import Message from "./Message";

export default function MessageList({messages = []}){
    return messages.map(message => (
        <Message author={message.author} route={message.id} header={message.header} date={message.date}/>
    ));
}
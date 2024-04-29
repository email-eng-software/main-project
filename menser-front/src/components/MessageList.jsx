import React from 'react';
import Message from './Message';

export default function MessageList({ messages = [] }) {
  return messages
    .toSorted((a, b) => new Date(b.sendedAt) - new Date(a.sendedAt))
    .map(({ _id, sender, subject, sendedAt, recipients }) => (
      <Message
        key={_id}
        _id={_id}
        recipients={recipients}
        sender={sender}
        subject={subject}
        sendedAt={sendedAt}
      />
    ));
}

import React from 'react';
import Message from './Message';

export default function MessageList({ messages = [] }) {
  return messages.map(({ _id, sender, subject, sendedAt, recipients }) => (
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

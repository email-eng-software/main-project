/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { useParams } from 'react-router-dom';

import '../../styles/tailwind.css';
import MessagePage from '../../components/MessagePage';
import { useGetMessageById } from '../../hooks/query/messages';
import setToast from '../../utils/toast.utils';

function Message() {
  const { messageId } = useParams();
  const { data: message, isLoading } = useGetMessageById({
    messageId,
    type: 'parent',
    onError: (err) => {
      console.error(err);
      setToast(
        'console.error();',
        'Ocorreu um problema no servidor ao tentar resgatar o rascunho. Tente novamente mais tarde'
      );
    },
  });

  if (isLoading) return <div>Carregando...</div>;
  console.log({ message });
  return (
    <MessagePage
      _id={message._id}
      recipients={message.recipients}
      sender={message.sender}
      subject={message.subject}
      content={message.content}
      sendedAt={message.sendedAt}
    />
  );
}

export default Message;

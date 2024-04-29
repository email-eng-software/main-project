/* eslint no-underscore-dangle: 0 */

import React from 'react';

import '../../styles/tailwind.css';
import MessageList from '../../components/MessageList';
import { useGetMessages } from '../../hooks/query/messages';
import useAuthStore from '../../stores/auth';
import setToast from '../../utils/toast.utils';

function Home() {
  const user = useAuthStore((state) => state.auth.user);

  const { data: messages, isLoading } = useGetMessages({
    userId: user._id,
    onError: (err) => {
      console.error(err);
      setToast(
        'error',
        'Ocorreu um problema no servidor ao tentar resgatar o rascunho. Tente novamente mais tarde'
      );
    },
  });

  if (isLoading) return <div>Carregando...</div>;

  return <MessageList messages={messages} />;
}

export default Home;

/* eslint react/prop-types: 0 */
/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/auth';

function formatDateToBrazil(date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}

export default function Message({
  _id,
  sender,
  subject,
  recipients,
  sendedAt,
}) {
  const user = useAuthStore((state) => state.auth.user);

  return (
    <Link
      to={`message/${_id}`}
      className="rounded h-12 flex items-center justify-between border-gray-100 border-solid border-2"
    >
      {user._id === sender._id ? (
        <div className="px-4 overflow-hidden truncate max-w-60">
          Para:{' '}
          {recipients
            .map((recipient) => `${recipient.firstName} ${recipient.lastName}`)
            .join(', ')}
        </div>
      ) : (
        <div className="px-4">{`De: ${sender.firstName} ${sender.lastName}`}</div>
      )}

      <div className="border-x-2 flex-1 px-4">{subject}</div>
      <div className="px-4">{formatDateToBrazil(new Date(sendedAt))}</div>
    </Link>
  );
}

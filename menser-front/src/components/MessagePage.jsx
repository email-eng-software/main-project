/* eslint react/prop-types: 0 */
import React from 'react';
import '../styles/tailwind.css';

function formatDateToBrazil(date) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}

function MessagePage({ sender, subject, content, sendedAt }) {
  return (
    <div className="px-4 flex flex-col">
      <h3 className="flex text-3xl font-bold ">
        {subject} -
        <small className="flex-1 ms-2 font-semibold text-gray-500">
          {`${sender.firstName} ${sender.lastName}`}
        </small>
        <small className="ms-2 font-semibold text-gray-500">
          {formatDateToBrazil(new Date(sendedAt))}
        </small>
      </h3>
      <hr className="h-px my-8 bg-gray-200 border-0" />
      <div className="flex-1">{content}</div>
    </div>
  );
}

export default MessagePage;

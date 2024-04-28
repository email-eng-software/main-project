import React from "react";

import "../../styles/tailwind.css"
import Header from "../../components/Header"
import MessagePage from "../../components/MessagePage";

function Message() {
  return (
    <div className="h-screen relative">
      <Header>
        <MessagePage />
      </Header>
    </div>
  )
}

export default Message;
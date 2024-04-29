import React from "react";

import "../../styles/tailwind.css"
import Header from "../../components/Header"
import CreateMessage from "../../components/CreateMessage";

function NewMessage() {
  return (
    <div className="h-screen relative">
      <Header>
        <CreateMessage />
      </Header>
    </div>
  )
}

export default NewMessage;
import React from "react";

import "../../styles/tailwind.css"
import Header from "../../components/Header"
import MessageList from "../../components/MessageList";

function Home() {
  return (
    <div className="h-screen relative">
      <Header>
        <MessageList />
      </Header>
    </div>
  )
}

export default Home;
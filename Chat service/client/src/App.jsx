import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CustomerChat } from './pages/CustomerChat.jsx'
import { BranchChat } from './pages/BranchChat.jsx'
import Nav from './pages/Nav.jsx'
import io from 'socket.io-client';
import Layout from './pages/Layout.jsx'
const socket = io.connect('http://localhost:8081');
const sendMessage = async () => {

  // Emit a socket event with the message details
  socket.emit("send_message", {
    senderId: "123",     // ID of the sender
    receiverId: "456", // ID of the receiver
    message: "Hello"   // The actual message content
  });

}
function App() {
 

  return (
    <>
      {/* <Nav/> */}
      <Layout/>
    </>
  )
}

export default App
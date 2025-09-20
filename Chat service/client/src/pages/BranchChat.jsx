
// import { useState, useEffect } from "react";
// import { Tooltip, TooltipTrigger, TooltipContent,TooltipProvider} from "@/components/ui/tooltip";
// import { format, parseISO } from "date-fns"; 

// import { io } from "socket.io-client";
// import { useParams } from "react-router-dom"; // Get chatID from URL
// import {
//   Card, CardDescription, CardFooter, CardHeader, CardTitle
// } from "@/components/ui/card";
// import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
// import ChatMessageList from "@/components/ui/chat-message-list";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import ChatInput from "@/components/ui/chat-input";
// import { Button } from "@/components/ui/button";

// const socket = io("http://localhost:8080");
// import CryptoJS from 'crypto-js';
// const secretKey = 'dhruvishah122';

// export function BranchChat() {
//   const { chatID } = useParams(); // Extract chatID from URL
//   const userType = "branch"; // Define user type for branch user

//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const decryptData = (cipherText) => {
//     const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   };
//   const encryptData = (data) => {
//       return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
//     };
//     const decryptArray = (array) => {
//       return array.map(item => {
//         try {
//           if (!item.message || typeof item.message !== "string") {
//             // console.warn("Skipping invalid message:", item.message);
//             return item; // Return entire object without modification
//           }
    
//           const decrypted = CryptoJS.AES.decrypt(item.message, secretKey);
//           const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    
//           if (!plaintext) {
//             // console.warn("Decryption failed, returning original message:", item.message);
//             return item; // Return original object if decryption fails
//           }
    
//           return { ...item, message: plaintext }; // Return full object with decrypted message
//         } catch (error) {
//           // console.error("Error decrypting message:", error, item.message);
//           return item; // Return original object in case of error
//         }
//       });
//     };
    
    
    
//   useEffect(() => {
//     if (!chatID) return;

//     // Join the chat
//     socket.emit("joinChat", { chatID, userType });

//     // Fetch chat history
//     fetch(`http://localhost:5173/branch/${chatID}`)
//       .then(res => res.json())
//       .then(data => setMessages(data.messages))
//       .catch(err => console.error("Error fetching messages:", err));
//       socket.emit("requestChatHistory", { chatID });
//     // Listen for new messages'
//     socket.on("chatHistory", (messages) => {
//       const decryptedMessages = decryptArray(messages);
//       setMessages([...decryptedMessages]); // Ensure React detects the update
//        // ✅ Set all messages from chat history
//   });
//     socket.on("receiveMessage", (message) => {
//       const msg=decryptData(message.message);
//       // console.log(msg);
//       message.message=msg;
//       setMessages((prev) => {
//           // if ("branch" === message.sender) {
//           //   const prevMsg=decryptData(prev[prev.length-1].message);
//           //   prev[prev.length-1].message=prevMsg;
//           //   console.log(prev);

//           //     return prev; // Avoid duplicate messages
//           // }
//           return [...prev, message];
//       });
//       // setMessages(message);
  
     
//   });
//     return () => {
//       socket.off("receiveMessage");
//       socket.emit("leaveChat", { chatID, userType });
//     };
//   }, [chatID]);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData = {
//       chatID,
//       sender: userType, // Send as "branch"
//       message: encryptData(newMessage),
//       timestamp: new Date().toISOString(), // Auto-generate timestamp
//     };

//     socket.emit("sendMessage", messageData);
//     // setMessages((prev) => [...prev, messageData]);
//     setNewMessage("");
//   };

//   return (
    
       
//     <Card className="w-[55%] ml-[10%] mt-[3%] h-[720px] overflow-auto">
//       <CardHeader className="sticky top-0 left-0 z-10 bg-white dark:bg-gray-900 border-b-2 border-black pb-2 shadow-md">
//   <div className="flex flex-col">
//     <div className="flex space-x-3 items-center w-full">
//       <Avatar className="w-20 h-20">
//         <AvatarImage src="https://img.freepik.com/free-psd/3d-female-character-avatar-isolated_239978-135.jpg" />
//       </Avatar>
//       <CardTitle className="text-left text-2xl">{"Dhruvi"}</CardTitle>
//     </div>
//     <CardDescription className="text-left">Customer</CardDescription>
//   </div>
// </CardHeader>
//       <ChatMessageList>
//         {messages.map((msg, index) => (
//           <div key={index} className="flex flex-col gap-1">
//           <ChatBubble key={index} variant={msg.sender === userType ? 'sent' : 'received'}>
//             <ChatBubbleAvatar fallback={msg.sender === userType ? 'DM' : 'CU'} />
//             <ChatBubbleMessage>{msg.message}</ChatBubbleMessage>
//           </ChatBubble>
//           <TooltipProvider>
//                     <Tooltip>
//                   <TooltipTrigger asChild>
//                     <span
//                       className={`text-xs text-gray-500 px-2 transition-opacity duration-300 cursor-pointer hover:opacity-80 ${
//                         msg.sender === userType ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {msg.timestamp ? format(new Date(msg.timestamp), "hh:mm a") : ""}
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     {msg.timestamp ? format(new Date(msg.timestamp), "PPPP hh:mm:ss a") : ""}
//                   </TooltipContent>
//                 </Tooltip>
//                 </TooltipProvider>
//                 </div>
//         ))}
//       </ChatMessageList>

//       <CardFooter className="sticky bottom-0 left-0 z-10 bg-white dark:bg-gray-1000 p-3 border-t shadow-md flex gap-2">
//         <ChatInput value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
//         <Button className="bg-black text-white hover:bg-blue-500" onClick={sendMessage}>
//           Send
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

import { useState, useEffect } from "react";
import { Tooltip, TooltipTrigger, TooltipContent,TooltipProvider} from "@/components/ui/tooltip";
import { format, parseISO } from "date-fns"; 

import { io } from "socket.io-client";
import { useParams } from "react-router-dom"; // Get chatID from URL
import {
  Card, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "../components/ui/chat-bubble";
import ChatMessageList from "../components/ui/chat-message-list";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import ChatInput from "../components/ui/chat-input";
import { Button } from "../components/ui/button";

const socket = io("http://localhost:8081");
import CryptoJS from 'crypto-js';
const secretKey = 'dhruvishah122';

export function BranchChat() {
  const { chatID } = useParams(); // Extract chatID from URL
  const userType = "branch"; // Define user type for branch user

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const decryptData = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };
  const encryptData = (data) => {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    };
    const decryptArray = (array) => {
      return array.map(item => {
        try {
          if (!item.message || typeof item.message !== "string") {
            // console.warn("Skipping invalid message:", item.message);
            return item; // Return entire object without modification
          }
    
          const decrypted = CryptoJS.AES.decrypt(item.message, secretKey);
          const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    
          if (!plaintext) {
            // console.warn("Decryption failed, returning original message:", item.message);
            return item; // Return original object if decryption fails
          }
    
          return { ...item, message: plaintext }; // Return full object with decrypted message
        } catch (error) {
          // console.error("Error decrypting message:", error, item.message);
          return item; // Return original object in case of error
        }
      });
    };
    
      const { privateID } = useParams(); // 👈 This will give you 'dhruvishah116122@gmail.com'
      useEffect(() => {
        const el = document.getElementById("branch-chat-container");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, []);
      
  useEffect(() => {
    
    if (!chatID) return;

    // Join the chat
    socket.emit("joinChat", { chatID, userType });

    // Fetch chat history
    fetch(`http://localhost:5176/${privateID}/branch/${chatID}`)
      .then(res => res.json())
      .then(data => setMessages(data.messages))
      .catch(err => console.error("Error fetching messages:", err));
      socket.emit("requestChatHistory", { chatID });
    // Listen for new messages'
    socket.on("chatHistory", (messages) => {
      const decryptedMessages = decryptArray(messages);
      setMessages([...decryptedMessages]); // Ensure React detects the update
       // ✅ Set all messages from chat history
  });
    socket.on("receiveMessage", (message) => {
      const msg=decryptData(message.message);
      // console.log(msg);
      message.message=msg;
      setMessages((prev) => {
          // if ("branch" === message.sender) {
          //   const prevMsg=decryptData(prev[prev.length-1].message);
          //   prev[prev.length-1].message=prevMsg;
          //   console.log(prev);

          //     return prev; // Avoid duplicate messages
          // }
          return [...prev, message];
      });
      // setMessages(message);
  
     
  });
    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveChat", { chatID, userType });
    };
  }, [chatID]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatID,
      sender: userType, // Send as "branch"
      message: encryptData(newMessage),
      timestamp: new Date().toISOString(), // Auto-generate timestamp
    };

    socket.emit("sendMessage", messageData);
    // setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };
 const [cName, setcName] = useState("Loading...");

       useEffect(() => {
         const fetchCustomerName = async () => {
           try {
             const res = await fetch(`http://localhost:8081/chat/customername/${chatID}`);
             if (!res.ok) throw new Error("Failed to fetch chat");
             const data = await res.json();
             setcName(data.CustomerName);
           } catch (err) {
             console.error("Error fetching branch name:", err);
             setBranchName("Unavailable");
           }
         };
       
         if (chatID) fetchCustomerName();
       }, [chatID]); 
  return (
    
    <div id="branch-chat-container">

    <Card className="w-[1000px]  h-[720px] overflow-auto flex flex-col ">
      <CardHeader className="sticky top-0 left-0 z-10 bg-white dark:bg-gray-900 border-b-2 border-black pb-2 shadow-md">
  <div className="flex flex-col">
    <div className="flex space-x-3 items-center w-full">
      <Avatar className="w-20 h-20">
        <AvatarImage src="https://img.freepik.com/free-psd/3d-female-character-avatar-isolated_239978-135.jpg" />
      </Avatar>
      <CardTitle className="text-left text-2xl">{cName}</CardTitle>
    </div>
    <CardDescription className="text-left">Customer</CardDescription>
  </div>
</CardHeader>
      <ChatMessageList>
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col gap-1">
          <ChatBubble key={index} variant={msg.sender === userType ? 'sent' : 'received'}>
            <ChatBubbleAvatar fallback={msg.sender === userType ? 'DM' : 'CU'} />
            <ChatBubbleMessage>{msg.message}</ChatBubbleMessage>
          </ChatBubble>
          <TooltipProvider>
                    <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`text-xs text-gray-500 px-2 transition-opacity duration-300 cursor-pointer hover:opacity-80 ${
                        msg.sender === userType ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.timestamp ? format(new Date(msg.timestamp), "hh:mm a") : ""}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {msg.timestamp ? format(new Date(msg.timestamp), "PPPP hh:mm:ss a") : ""}
                  </TooltipContent>
                </Tooltip>
                </TooltipProvider>
                </div>
        ))}
      </ChatMessageList>

      <CardFooter className="sticky bottom-0 left-0 z-10 bg-white dark:bg-gray-1000 p-3 border-t shadow-md flex gap-2">
        <ChatInput value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <Button className="bg-black text-white hover:bg-blue-500" onClick={sendMessage}>
          Send
        </Button>
      </CardFooter>
    </Card></div>
  );
}

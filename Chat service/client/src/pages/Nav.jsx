// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { CustomerChat } from "./CustomerChat";
// import { BranchChat } from "./BranchChat";

// const socket = io.connect("http://localhost:8080"); // Connect to backend

// export default function Nav() {
//     const [chatUrl, setChatUrl] = useState("http://localhost:8080/chat/dhruvishah116122@gmail.com/122");

//     const handleChatClick = async (event) => {
//         event.preventDefault(); // Prevent default link behavior

//         // Extract email and branchID from the chat URL
//         const urlParts = chatUrl.split("/chat/")[1]; // "dhruvishah116122@gmail.com/122"
//         const [customerEmail, branchID] = urlParts.split("/");

//         try {
//             // Make a GET request to check if chat should start
//             const response = await fetch(`http://localhost:8080/chat/email=${customerEmail}/branchID=${branchID}`);
//             const data = await response.json();

//             console.log("Server response:", data);

//             if (data.startSocket) {
//                 // Emit socket event with extracted parameters
//                 socket.emit("startChatRequest", { customerEmail, branchID });

//                 // Listen for redirection event
//                 socket.on("redirect", (url) => {
//                     console.log("Redirecting to:", url);
//                     window.location.href = url; // Navigate to the chat page
//                 });
//             } else {
//                 console.log("Chat not allowed");
//                 alert("Chat cannot be started at this time.");
//             }
//         } catch (error) {
//             console.error("Error starting chat:", error);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             socket.off("redirect");
//         };
//     }, []);

//     return (
//         <Router>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 {/* Navbar */}
//                 <nav>
//                     <ul style={{ display: "flex", gap: "10px" }}>
//                         <li>
//                             <a href="/CustomerChat" style={{ textDecoration: "none" }}>
//                                 CustomerChat
//                             </a>
//                         </li>
//                         <li>
//                             <a href="/BranchChat" style={{ textDecoration: "none" }}>
//                                 BranchChat
//                             </a>
//                         </li>
//                         <li>
//                             <a href={chatUrl} onClick={handleChatClick} style={{ textDecoration: "none" }}>
//                                 Chat with Dhruvi
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* Define Routes */}
//                 <Routes>
//                     <Route path="/CustomerChat" element={<CustomerChat />} />
//                     <Route path="/BranchChat" element={<BranchChat />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { CustomerChat } from "./CustomerChat";
// import { BranchChat } from "./BranchChat";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { Link } from "react-router-dom";
// const socket = io.connect("http://localhost:8080"); // Connect to backend

// export default function Nav() {

//     const handleChatClick = async (data) => {
        
//         const { customerEmail, branchID } = data;
//         console.log(customerEmail);
//         try {
//             socket.emit("startChatRequest", { customerEmail,branchID });

//             socket.on("redirect", (url) => {
//                 console.log("Redirecting to:", url);
//                 window.location.href=url;
//             });
//         } catch (error) {
//             console.error("Error starting chat:", error);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             socket.off("redirect");
//         };
//     }, []);

//     return (
//         <Router>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 {/* Navbar */}
//                 <nav>
//                     <ul style={{ display: "flex", gap: "10px" }}>
//                         <li>

//                             <a href="/branch/123" style={{ textDecoration: "none" }}>
//                                 BranchChat
//                             </a>
//                         </li>
//                         <li>
//                             <a href="/customer/dhruvishah116122@gmail.com" style={{ textDecoration: "none" }}>
//                                 CustomerChat
//                             </a>
//                         </li>
//                        <li>
//                        <button 
//     onClick={() => {
//         console.log("Fetching data..."); // Debugging log

//         fetch("http://localhost:8080/chat/m@gmail.com/122", { 
//             method: "GET",
//             headers: { "Content-Type": "application/json" } ,
//             credentials: "include" // Add headers
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             if (data.redirectUrl) {
//                 window.location.href = data.redirectUrl; // ✅ Redirect in frontend
//             }
//         if (data.startSocket) {
//                 handleChatClick(data); // Call function if startChat is true
//             }
//         })
//         .catch(error => console.error("🔥 Fetch Error:", error));
//     }}
//     style={{ textDecoration: "none", background: "none", border: "none", color: "blue", cursor: "pointer" }}
// >
//     Chat with Dhruvi
// </button>

// </li>

//                     </ul>
//                 </nav>

//                 {/* Define Routes with Dynamic Params */}
//                 <Routes>
                    
//                     <Route path="/branch/:chatID" element={<BranchChat />} />
//                     <Route path="/customer/:chatID" element={<CustomerChat />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// import { CustomerChat } from "./CustomerChat";
// import { BranchChat } from "./BranchChat";

// const socket = io.connect("http://localhost:8081"); // Connect to backend

// export default function Nav() {
//     const [chatUrl, setChatUrl] = useState("http://localhost:8081/chat/dhruvishah116122@gmail.com/122");

//     const handleChatClick = async (event) => {
//         event.preventDefault(); // Prevent default link behavior

//         // Extract email and branchID from the chat URL
//         const urlParts = chatUrl.split("/chat/")[1]; // "dhruvishah116122@gmail.com/122"
//         const [customerEmail, branchID] = urlParts.split("/");

//         try {
//             // Make a GET request to check if chat should start
//             const response = await fetch(`http://localhost:8081/chat/email=${customerEmail}/branchID=${branchID}`);
//             const data = await response.json();

//             console.log("Server response:", data);

//             if (data.startSocket) {
//                 // Emit socket event with extracted parameters
//                 socket.emit("startChatRequest", { customerEmail, branchID });

//                 // Listen for redirection event
//                 socket.on("redirect", (url) => {
//                     console.log("Redirecting to:", url);
//                     window.location.href = url; // Navigate to the chat page
//                 });
//             } else {
//                 console.log("Chat not allowed");
//                 alert("Chat cannot be started at this time.");
//             }
//         } catch (error) {
//             console.error("Error starting chat:", error);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             socket.off("redirect");
//         };
//     }, []);

//     return (
//         <Router>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 {/* Navbar */}
//                 <nav>
//                     <ul style={{ display: "flex", gap: "10px" }}>
//                         <li>
//                             <a href="/CustomerChat" style={{ textDecoration: "none" }}>
//                                 CustomerChat
//                             </a>
//                         </li>
//                         <li>
//                             <a href="/BranchChat" style={{ textDecoration: "none" }}>
//                                 BranchChat
//                             </a>
//                         </li>
//                         <li>
//                             <a href={chatUrl} onClick={handleChatClick} style={{ textDecoration: "none" }}>
//                                 Chat with Dhruvi
//                             </a>
//                         </li>
//                     </ul>
//                 </nav>

//                 {/* Define Routes */}
//                 <Routes>
//                     <Route path="/CustomerChat" element={<CustomerChat />} />
//                     <Route path="/BranchChat" element={<BranchChat />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { CustomerChat } from "./CustomerChat";
import { BranchChat } from "./BranchChat";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
const socket = io.connect("http://localhost:8081"); // Connect to backend

export default function Nav() {

    const handleChatClick = async (data) => {
        
        const { customerEmail, branchID } = data;
        console.log(customerEmail);
        try {
            socket.emit("startChatRequest", { customerEmail,branchID });

            socket.on("redirect", (url) => {
                console.log("Redirecting to:", url);
                window.location.href=url;
            });
        } catch (error) {
            console.error("Error starting chat:", error);
        }
    };

    useEffect(() => {
        return () => {
            socket.off("redirect");
        };
    }, []);

    return (
        <Router>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {/* Navbar */}
                <nav>
                    <ul style={{ display: "flex", gap: "10px" }}>
                        <li>

                            <a href="/branch/123" style={{ textDecoration: "none" }}>
                                BranchChat
                            </a>
                        </li>
                        <li>
                            <a href="/customer/dhruvishah116122@gmail.com" style={{ textDecoration: "none" }}>
                                CustomerChat
                            </a>
                        </li>
                       <li>
                       <button 
    onClick={() => {
        console.log("Fetching data..."); // Debugging log

        fetch("http://localhost:8081/chat/m@gmail.com/122", { 
            method: "GET",
            headers: { "Content-Type": "application/json" } ,
            credentials: "include" // Add headers
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // ✅ Redirect in frontend
            }
        if (data.startSocket) {
                handleChatClick(data); // Call function if startChat is true
            }
        })
        .catch(error => console.error("🔥 Fetch Error:", error));
    }}
    style={{ textDecoration: "none", background: "none", border: "none", color: "blue", cursor: "pointer" }}
>
    Chat with Dhruvi
</button>

</li>

                    </ul>
                </nav>

                {/* Define Routes with Dynamic Params */}
                <Routes>
                    
                    <Route path="/branch/:chatID" element={<BranchChat />} />
                    <Route path="/customer/:chatID" element={<CustomerChat />} />
                </Routes>
            </div>
        </Router>
    );
}
🧩 Consumer Connect
Consumer Connect is a full-stack microservices-based platform designed to foster seamless interaction between customers and businesses. From posting product experiences to real-time chat with store admins, the system facilitates transparent, responsive, and intelligent communication — with a strong focus on automation, analytics, and customer satisfaction.

📺 Watch Project Demo

📚 Table of Contents
Overview
Microservices
System Architecture
Tech Stack
Installation
Contributors
License
📌 Overview
Consumer Connect enables:

Posting bills with automated verification
Real-time chat between consumers and branch admins
Notifications for events like post status updates or chat replies
Reviews and rating systems
Dashboard and analytics for admin users
Auth system with OTP and JWT support
🧱 Microservices
1. 📝 Post Service
Function: Handle user posts including OCR-extracted bill data and ML-based authenticity verification.
Flow:
User uploads a bill image
OCR extracts data (Product, Date, Amount, Company)
Post-authentication ML model verifies authenticity
Image is stored in Cloudinary; metadata in MongoDB
2. 🔔 Notification Service
Function: Real-time alerts for post status, review replies, etc.
Flow:
Triggered upon key events (new post, status update)
Uses Socket.IO for push delivery
REST API available to update and fetch read/unread status
3. 💬 Chat Service
Function: Chat system for branch-consumer communication.
Flow:
Consumers or branches initiate chat by chatid
MongoDB stores chat history
Route: http://localhost:8080/dhruvishah/dmart/chat/{chatid}
4. ⭐ Review Service
Function: Submit and manage product/branch reviews.
Flow:
Post-auth consumers can leave a review
Admins respond through dashboard
Reviews are analyzed for insights
5. 🔐 Auth Service
Function: Manage user authentication and roles
Flow:
Registration/Login with OTP or credentials
JWT issued on successful auth
Role-based access (Consumer / Branch Admin)
6. 🏠 Home Service
Function: Landing page and user-friendly home UI
Flow:
Fetches trending posts, shortcuts, and recent activity
Dynamic data from Post, Review, and Chat services
7. 📊 Analytics Service
Function: Data-driven insights for admin users
Flow:
Aggregates Post, Notification, Review data
Generates metrics and sentiment analysis
Displays on dashboard in chart form
8. 🧮 Dashboard Service
Function: Admin control center
Flow:
Shows analytics, chat panel, review moderation
Uses ShadCN + Tailwind + Socket.IO for UI
REST hooks to all other services
9. 📌 Status Service
Function: Monitor status of posts, reviews, and chats
Flow:
/status API serves real-time state
Updates triggered by backend REST calls
Dynamically fetched on frontend (port 8083)
🏗 System Architecture
[Frontend - React/ShadCN UI]
    |
    |---[POST Service - Flask OCR + ML + Node.js CRUD]
    |---[CHAT Service - MongoDB + WebSocket]
    |---[NOTIFICATION Service - MongoDB + Socket.IO+ kafka]
    |---[REVIEW Service - Express + MongoDB]
    |---[AUTH Service - JWT + OTP + MongoDB]
    |---[DASHBOARD + HOME - ShadCN + REST APIs]
    |---[ANALYTICS - Node + Python + Charts]
    |---[STATUS - REST Service]
⚙️ Tech Stack
💻 Frontend
React.js
Tailwind CSS
ShadCN UI
Axios
Socket.IO Client
🌐 Backend
Node.js (Express.js)
Python (Flask for ML + OCR)
MongoDB (with Mongoose)
JWT Authentication
Socket.IO
🧠 AI/ML
OCR for bill data extraction
ML classification for post authenticity
Sentiment analysis (for reviews)
☁️ Infra & Tools
Cloudinary (Image Storage)
MongoDB Atlas (Database)
Render/Vercel/Heroku (Deployment)
👨‍💻 Contributors
Dhruvi Shah - ML & System design Engineer (System architecture,OCR, ML pipeline, Microservices integration,kafka)
Krisha Shah - Frontend Developer (UI/UX, Integration,React developer, shadcn specialist)
Maahi Vaghela - Backend Engineer (Backend, React charts,Brainstorming, DB manager)
📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

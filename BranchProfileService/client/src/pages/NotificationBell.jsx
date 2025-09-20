// "use client";

// import { useState, useEffect } from "react";
// import { Bell } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// export function NotificationBell() {
//   const [open, setOpen] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   // Fetch notifications from the database
//   const fetchNotifications = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/notifications"); // Update with your actual API endpoint
//       const data = await response.json();
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // const handleAccept = async (id) => {
//   //   try {
//   //     await fetch(`http://localhost:3003/api/notifications/${id}/accept`, { method: "PATCH" });
//   //     setNotifications((prev) =>
//   //       prev.map((notification) =>
//   //         notification.id === id ? { ...notification, status: "accepted", read: true } : notification
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error accepting notification:", error);
//   //   }
//   // };

//   // const handleReject = async (id) => {
//   //   try {
//   //     await fetch(`http://localhost:3001/api/notifications/${id}/reject`, { method: "PATCH" });
//   //     setNotifications((prev) =>
//   //       prev.map((notification) =>
//   //         notification.id === id ? { ...notification, status: "rejected", read: true } : notification
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error rejecting notification:", error);
//   //   }
//   // };

//   // Count unread notifications
//   const unreadCount = notifications.filter((notification) => !notification.read).length;

//   return (
//     <DropdownMenu open={open} onOpenChange={setOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" className="relative">
//           <Bell className="h-5 w-5" />
//           {unreadCount > 0 && (
//             <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[hsl(222.2,47.4%,11.2%)] hover:bg-[hsl(222.2,47.4%,11.2%)]">
//               {unreadCount}
//             </Badge>
//           )}
//           <span className="sr-only">Notifications</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end" className="w-80">
//         <Card className="border-0 shadow-none">
//           <CardHeader className="py-2 px-4">
//             <CardTitle className="text-base font-medium">Notifications</CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 max-h-[400px] overflow-y-auto">
//             {notifications.length === 0 ? (
//               <div className="py-6 text-center text-muted-foreground">No notifications</div>
//             ) : (
//               <div className="grid gap-1">
//                 {notifications.map((notification) => (
//                   <div
//                     key={notification.id}
//                     className={`flex items-start gap-3 p-3 hover:bg-muted/50 ${
//                       !notification.read ? "bg-primary/5" : ""
//                     }`}
//                   >
//                     <span
//                       className={`flex h-2 w-2 translate-y-1.5 rounded-full ${
//                         notification.status === "accepted" ? "bg-green-500" :
//                         notification.status === "rejected" ? "bg-red-500" :
//                         "bg-primary"
//                       }`}
//                     />
//                     <div className="grid gap-1 flex-1">
//                       <p className="text-sm font-medium">{notification.title}</p>
//                       <p className="text-sm text-muted-foreground">{notification.message}</p>
//                       <p className="text-xs text-muted-foreground">{notification.time}</p>

//                       {notification.status === "pending" && (
//                         <div className="flex gap-2 mt-2">
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="h-8 text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
//                             // onClick={() => handleAccept(notification.id)}
//                           >
//                             Accept
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="h-8 text-xs bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
//                             // onClick={() => handleReject(notification.id)}
//                           >
//                             Reject
//                           </Button>
//                         </div>
//                       )}

//                       {notification.status === "accepted" && (
//                         <Badge variant="outline" className="w-fit mt-1 text-xs bg-green-50 text-green-700 border-green-200">
//                           Accepted
//                         </Badge>
//                       )}
//                       {notification.status === "rejected" && (
//                         <Badge variant="outline" className="w-fit mt-1 text-xs bg-red-50 text-red-700 border-red-200">
//                           Rejected
//                         </Badge>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {useParams} from "react-router-dom";
// Connect to the WebSocket server
const socket = io("http://localhost:3001");
const socket1=io("http://localhost:8081");
export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
 const {privateID}=useParams();
  // Listen for incoming notifications from the backend
  useEffect(() => {
      // Fetch all notifications initially
      fetch(`http://localhost:8084/branch/notifications/${privateID}`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data);
        })
        .catch((err) => {
          console.error("Failed to fetch notifications:", err);
        });
    }, []);
  useEffect(() => {
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]); // Add new notification to the list
    });

    return () => socket.off("new-notification");
  }, []);


const handleAccept =async (id) => {
  setNotifications((prev) =>
    prev.map(async (notification) => {
      if (notification.id === id) {
        const customerEmail=notification.email
        const branchID=privateID
        socket1.emit("startChatRequest", { customerEmail,branchID });

        console.log("startChatRequest emitted:", {
          customerEmail: notification.email,
          branchID: privateID,
        });
        const response = await fetch(`http://localhost:8084/branch/notifications/accept/${notification.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Update local state
        return { ...notification, status: "accepted", read: true };
      }
      return notification;
    })
  );
};


  const handleReject = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, status: "rejected", read: true } : notification
      )
    );
  };

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[hsl(222.2,47.4%,11.2%)] hover:bg-[hsl(222.2,47.4%,11.2%)]">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <Card className="border-0 shadow-none">
          <CardHeader className="py-2 px-4">
            <CardTitle className="text-base font-medium">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-6 text-center text-muted-foreground">No notifications</div>
            ) : (
              <div className="grid gap-1">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`flex items-start gap-3 p-3 hover:bg-muted/50 ${!notification.read ? "bg-primary/5" : ""}`}>
                    <span
                      className={`flex h-2 w-2 translate-y-1.5 rounded-full ${
                        notification.status === "accepted" ? "bg-green-500" :
                        notification.status === "rejected" ? "bg-red-500" :
                        "bg-primary"
                      }`}
                    />
                    <div className="grid gap-1 flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>

                      {notification.status === "pending" && (
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="h-8 text-xs bg-green-50 hover:bg-green-100 text-green-700 border-green-200" onClick={() => handleAccept(notification.id)}>
                            Accept
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 text-xs bg-red-50 hover:bg-red-100 text-red-700 border-red-200" onClick={() => handleReject(notification.id)}>
                            Reject
                          </Button>
                        </div>
                      )}

                      {notification.status === "accepted" && <Badge variant="outline" className="w-fit mt-1 text-xs bg-green-50 text-green-700 border-green-200">Accepted</Badge>}
                      {notification.status === "rejected" && <Badge variant="outline" className="w-fit mt-1 text-xs bg-red-50 text-red-700 border-red-200">Rejected</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
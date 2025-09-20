import { useEffect, useState } from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // ShadCN's utility function for dynamic classes
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

// Static menu items.
import { useParams } from 'react-router-dom';

const defaultItems = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function ChatSidebar() {
  const [branchItems, setBranchItems] = useState([]);
  const { email } = useParams(); // 👈 This will give you 'dhruvishah116122@gmail.com'

  useEffect(() => {

    const fetchBranches = async () => {
      try {
        
        const response = await fetch(`http://localhost:8081/chat/${email}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setBranchItems(
            data.map((branch) => ({
              title: branch.BranchName,
              url: `http://localhost:5175/${email}/customer/${branch._id}`,
              icon: Inbox, // Change icon if needed
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  return (
<Sidebar className="ml-[20%] mt-32 w-[250px] h-[700px] bg-gray-100 dark:bg-gray-900 z-50 shadow-lg rounded-lg overflow-y-auto">
<SidebarContent>
        {/* Dmart Section */}
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mt-6 ml-4">Complaint chats</h2>

        {/* Chat Branches (Dynamically Fetched) */}
        {branchItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-l font-semibold text-gray-600 dark:text-gray-300 mt-4 ml-2">
              Chat Branches
            </SidebarGroupLabel>
            <SidebarMenu className="mt-2">
              {branchItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <a
                    href={item.url}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      "hover:bg-blue-500 hover:text-white hover:scale-105"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-base">{item.title}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}


// import { useEffect, useState } from "react";
// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
// import { cn } from "@/lib/utils"; // ShadCN's utility function for dynamic classes
// import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
// import { useParams } from 'react-router-dom';

// // Static menu items.
// const defaultItems = [
//   { title: "Home", url: "#", icon: Home },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },
// ];

// export  function ChatSidebar() {
//   const [branchItems, setBranchItems] = useState([]);

//   useEffect(() => {
//     const fetchBranches = async () => {
//       try {
//         const { email } = useParams();
//         console.log(email); 
//         const response = await fetch(
//           `http://localhost:8081/chat/${email}`);
//         const data = await response.json();

//         if (Array.isArray(data)) {
//           setBranchItems(
//             data.map((branch) => ({
//               title: branch.BranchName,
//               url: `/customer/${branch._id}`,
//               icon: Inbox, // Change icon if needed
//             }))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching branches:", error);
//       }
//     };

//     fetchBranches();
//   }, []);

//   return (
// <Sidebar className="w-[250px] h-[14%] border border-gray-450 shadow-inner rounded-lg shadow-lg bg-gray-50  mt-[5.3%] ml-[26%]  bg-gray-50 rounded-lg  shadow-lg border border-gray-300 p-2">
// <SidebarContent>
//         {/* Dmart Section */}
//         <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mt-4 ml-4">Complaint chats</h2>

//         {/* Chat Branches (Dynamically Fetched) */}
//         {branchItems.length > 0 && (
//           <SidebarGroup>
//             <SidebarGroupLabel className="text-l font-semibold text-gray-600 dark:text-gray-300  ml-3">
//               Chat Branches
//             </SidebarGroupLabel>
//             <SidebarMenu className="mt-1">
//               {branchItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <a
//                     href={item.url}
//                     className={cn(
//                       "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
//                       "hover:bg-[#0A0F1D] hover:text-white "
//                     )}
//                   >
//                     <item.icon className="w-5 h-5" />
//                     <span className="text-base">{item.title}</span>
//                   </a>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroup>
//         )}
//       </SidebarContent>
//     </Sidebar>
//   );
// }
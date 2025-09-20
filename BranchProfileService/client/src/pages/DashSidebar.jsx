import { AppSidebar } from "@/components/ui/app-sidebar";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import PostCard from "../../node_modules/post-service/src/pages/PostCard";
import Post from "./post";
import Chat from "./chat";
import Layout from "./Layout";
import {ChatSidebar} from "../../node_modules/consumer-chat-service/client/src/pages/ChatSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserTable from "./Status";
import PostList from "./PostList";
export default function Page() {
  return (
    
    <div className="flex ">
      {/* Sidebar */}
      <SidebarProvider>
        <AppSidebar className="bg-gray-50 rounded-lg w-[18rem] shadow-xs border border-gray-300 p-3 mt-3 ml-3" />
      </SidebarProvider>
      
      {/* Right Section (Header + Content) */}
      <div className="flex">
        {/* ✅ Header beside Sidebar */}
        <Header
          className={cn(
            "flex h-16 items-center justify-between bg-background p-4 shadow-md fixed top-3 left-[22rem] right-0 z-50"
          )}
        />

        {/* ✅ Centered Post Section */}
        
      </div>
      
      <div className="flex mt-32 ml-[500px] items-center  w-[50%] fixed top-3  ">
        
          <Post className="shadow-lg shadow-inner border-2 border-gray-390"/>
        </div>
        <Routes>
      <Route
        path="/status"
        element={
          <div className="flex justify-center mt-32 w-full fixed top-3">
            <div className="w-[900px] h-[850px]">
              <UserTable />
            </div>
          </div>
        }
      />
        <Route
              path="/postList"
              element={
                <div className="flex justify-center mt-32 w-full fixed top-3">
                  <div className="w-[900px] h-[850px]">
                    <PostList />
                  </div>
                </div>
              }
            />
    </Routes>
        <div className="flex mt-[400px] ml-[200px] items-center h-[30%] w-[100%]  ">
           {/* className="flex mt-[400px] ml-[200px] items-center h-[30px] w-[100%]  "> */}
          {/* <Routes>
            <Route path ="/" element={<Layout/>}/>
          </Routes>  */}
          {/* <SidebarProvider/>
          <ChatSidebar/>
          <SidebarProvider/> */}
          <Layout/>
        </div>
        {/* <div className="flex mt-32 ml-[700px] items-center  fixed top-3 "><Chat/></div> */}

        
    </div>
   
    
  );
}

import { SidebarProvider } from "@/components/ui/sidebar";
import {ChatSidebarBranch}  from "../../../../Chat service/client/src/pages/ChatSidebarBranch";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import  {BranchChat}  from "../../../../Chat service/client/src/pages/BranchChat";
import { Outlet } from "react-router-dom";
import {CompanyProfileWebsite} from "./feedbacks";
import AnalyticsSummary from "./Analytics";
import CompanyList from "./CompanyList";
export default function Layout({ children }) {
  
  return (
    <SidebarProvider className="w-full h-[25%]  ml-[20%] ">
       
      
      <Routes>
            
           <Route
          path="branch/*"
          element={
            <div className=" relative w-[700px] min-h-screen">
                <ChatSidebarBranch className="absolute top-[150px] left-[70%]" />
             
                <Outlet /> 
                </div>
          }
        >
          <Route path=":chatID" element={<BranchChat />}  className="  items-center flex  w-full  "  />
        </Route>

                <Route path=":branchID/" element={<CompanyProfileWebsite /> } 
                />
                {/* <Route path="/brands" element={<CompanyList /> }/> */}
        <Route path="/" element={<AnalyticsSummary /> } 
                />
          </Routes> 
      {/* <main>
      
        <SidebarTrigger />
        {children}
      </main> */}
    </SidebarProvider>
  );
}
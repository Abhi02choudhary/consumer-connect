import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { CiLogin } from "react-icons/ci";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import BranchLogin from "../../../Auth service/client/src/pages/BranchLogin";
// import OrgLogin from "./OrgLogin";
// import CustomerLogin from "./CustomerLogin";

export default function MenuBar() {
return (
  <Router>
    {/* Navbar */}
    <Menubar className="bg-primary h-16 text-primary-foreground flex justify-between items-center px-4">
      <h1 className="text-xl font-bold text-white">ConsumerConnect</h1>
      <div className="flex items-center space-x-4">
        <MenubarMenu>
          <MenubarTrigger>Home</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>About Us</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Complaints</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <CiLogin className="mr-2" size={20} />
            Login
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link to="/branch-login">Branch Login</Link>
            </MenubarItem>
            {/* <MenubarItem>
              <Link to="/customer-login">Customer Login</Link>
            </MenubarItem>
            <MenubarItem>
              <Link to="/org-login">Organization Login</Link>
            </MenubarItem> */}
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>

    {/* Main Content Area (To Prevent UI Disturbance) */}
    <div className="container mx-auto p-6">
      <Routes>
        <Route path="/branch-login" element={<BranchLogin />} />
        {/* <Route path="/org-login" element={<OrgLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} /> */}
      </Routes>
    </div>
  </Router>
);
}
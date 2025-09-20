import { useState } from 'react'

import CustomerLogin from './CustomerLogin'
import CustomerSignup from './CustomerSignup'
import OrgLogin from './OrgLogin'
import OrgSignup from './OrgSignup'
import BranchLogin from './BranchLogin'
import BranchSignup from './BranchSignup'
import ForgetPassword from "./ForgetPassword";
import OrgForgetPassword from "./OrgForgetPassword";
import BranchForgetPassword from "./BranchForgetPassword";
import ResetPassword from "./ResetPassword";
import OrgResetPassword from "./OrgResetPassword";
import BranchResetPassword from "./BranchResetPassword";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function(){
    return (<>
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Navbar */}
        <nav>
          <ul style={{ display: 'flex', gap: '10px' }}>
            <li><a href="/BranchLogin" style={{ textDecoration: 'none' }}>BranchLogin</a></li>
            <li><a href="/BranchSignup" style={{ textDecoration: 'none' }}>BranchSignup</a></li>
            <li><a href="/Customerlogin" style={{ textDecoration: 'none' }}>customerLogin</a></li>
            <li><a href="/customerSignup" style={{ textDecoration: 'none' }}>customerSignup</a></li>
            <li><a href="/Orglogin" style={{ textDecoration: 'none' }}>OrgLogin</a></li>
            <li><a href="/OrgSignup" style={{ textDecoration: 'none' }}>OrgSignup</a></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          {/* Only Home page will be shown for '/' */}
          <Route path="/BranchLogin" element={<BranchLogin />} />

          {/* Only About page will be shown for '/about' */}
          <Route path="/BranchSignup" element={<BranchSignup />} />

          {/* Only Contact page will be shown for '/contact' */}
          <Route path="/Customerlogin" element={<CustomerLogin />} />
          <Route path="/Orglogin" element={<OrgLogin />} />

          {/* Only About page will be shown for '/about' */}
          <Route path="/OrgSignup" element={<OrgSignup />} />

          {/* Only Contact page will be shown for '/contact' */}
          <Route path="/customerSignup" element={<CustomerSignup />} />

           <Route path="/forgot-password" element={<ForgetPassword />} />
            
           <Route path="/orgforgot-password" element={<OrgForgetPassword />} />
           <Route path="/reset-password/:token" element={<ResetPassword />} />
           <Route path="/orgreset-password/:token" element={<OrgResetPassword />} />
           <Route path="/branchforgot-password" element={<BranchForgetPassword />} />
           <Route path="/branchreset-password/:token" element={<BranchResetPassword />} />
        </Routes>
      </div>
    </Router>

   </>
    )
}
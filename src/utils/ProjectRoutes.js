import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Account from "../pages/Account/AccountMain";
import SignUp from "../pages/Account/Signup";
import AdminMain from "../pages/Admin/AdminMain";
import DashboardMain from "../pages/Dashboard/DashboardMain";
import { useSelector } from "react-redux";
import Error404 from "../pages/Error/Error404";
import AgencyMain from "../pages/Agency/AgencyMain";
import VerifyAccountMain from "../pages/VerifyAccount/VerifyAccountMain";
import GetNewPassword from "../pages/Account/GetNewPassword";
import LandingPageMain from "../pages/LandingPage/LandingPageMain";
import PoliciesPage from "../pages/LandingPage/PoliciesPage";

const ProjectRoutes = () => {
  const { isLoggedIn, isAdmin, token, facebook_state, current_account } = useSelector((state) => state.authToken);


  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPageMain />} />
        <Route path="/chat" element={ isLoggedIn ? <DashboardMain /> : <Navigate to="/account" replace /> } />
        <Route path="/admin" element={isAdmin ? <AdminMain /> : <Navigate to="/account" replace />} />
        <Route path="/account" element={<Account />} />
        <Route path="/forgot_password" element={<GetNewPassword />} />
        {/* <Route path="/account/:link_token" element={<Account />} /> */}
        <Route path="/account/signup" element={<SignUp />} />
        <Route path="/verify_account/:id" element={<VerifyAccountMain />} />
        <Route path="/privacy-policy" element={<PoliciesPage CurrentMode={1} />} />
        <Route path="/terms-and-conditions" element={<PoliciesPage CurrentMode={2} />} />
        <Route path="/data-protection-policy" element={<PoliciesPage CurrentMode={3} />} />
        <Route path="/agency" element={ isLoggedIn && current_account?.is_main_user ? ( <AgencyMain /> ) : ( <Navigate to="/account" replace /> ) } />
        <Route path="/agency/:page" element={ isLoggedIn && current_account?.is_main_user ? ( <AgencyMain /> ) : ( <Navigate to="/account" replace /> ) } />

        <Route path="/notfound" element={<Error404 />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

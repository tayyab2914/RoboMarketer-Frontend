import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomeMain from "../pages/Home/HomeMain";
import Account from "../pages/Account/AccountMain";
import SignUp from "../pages/Account/Signup";
import AdminMain from "../pages/Admin/AdminMain";
import DashboardMain from "../pages/Dashboard/DashboardMain";
import { useSelector } from "react-redux";
import { API_FETCH_TOKEN } from "../apis/FacebookInsightsApis";
import Error404 from "../pages/Error/Error404";
import AgencyMain from "../pages/Agency/AgencyMain";
import VerifyAccountMain from "../pages/VerifyAccount/VerifyAccountMain";
import AuthenticateVerification from "../pages/Account/AuthenticateVerification";
import GetNewPassword from "../pages/Account/GetNewPassword";
import LandingPageMain from "../pages/LandingPage/LandingPageMain";

const ProjectRoutes = () => {
  const { isLoggedIn, isAdmin, token, facebook_state, current_account } =
    useSelector((state) => state.authToken);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPageMain />} />
        <Route path="/dashboard" element={ isLoggedIn ? <DashboardMain /> : <Navigate to="/account" replace /> } />
        <Route path="/admin" element={isAdmin ? <AdminMain /> : <Navigate to="/account" replace />} />
        <Route path="/account" element={<Account />} />
        <Route path="/forgot_password" element={<GetNewPassword />} />
        {/* <Route path="/account/:link_token" element={<Account />} /> */}
        <Route path="/account/signup" element={<SignUp />} />
        <Route path="/verify_account/:id" element={<VerifyAccountMain />} />
        <Route path="/agency" element={ isLoggedIn && current_account?.is_main_user ? ( <AgencyMain /> ) : ( <Navigate to="/account" replace /> ) } />
        <Route path="/notfound" element={<Error404 />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

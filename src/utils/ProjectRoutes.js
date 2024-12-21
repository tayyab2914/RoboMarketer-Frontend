import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomeMain from '../pages/Home/HomeMain';
import Account from '../pages/Account/AccountMain';
import AdminMain from '../pages/Admin/AdminMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
import { useSelector } from 'react-redux';
import { API_FETCH_TOKEN } from '../apis/FacebookInsightsApis';
import Error404 from '../pages/Error/Error404';
import AgencyMain from '../pages/Agency/AgencyMain';

const ProjectRoutes = () => {
  const { isLoggedIn, isAdmin, token, facebook_state } = useSelector((state) => state.authToken);



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <DashboardMain /> : <Navigate to="/account" replace />}  />
        <Route path="/admin" element={isAdmin ? <AdminMain /> : <Navigate to="/account" replace />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:link_token" element={<Account />} />
        <Route path="/agency" element={isLoggedIn ? <AgencyMain />: <Navigate to="/account" replace />} />
        <Route path="/notfound" element={<Error404 />} />
        <Route path="/*" element={<Error404 />} />

      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

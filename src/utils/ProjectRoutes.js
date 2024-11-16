import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomeMain from '../pages/Home/HomeMain';
import Account from '../pages/Account/AccountMain';
import AdminMain from '../pages/Admin/AdminMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
import { useSelector } from 'react-redux';

const ProjectRoutes = () => {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.authToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardMain />} />
        <Route  path="/admin"  element={isAdmin ? <AdminMain /> : <Navigate to="/dashboard" replace />}  />
        <Route  path="/dashboard"  element={isLoggedIn ? <DashboardMain /> : <Navigate to="/account" replace />}  />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:link_token" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

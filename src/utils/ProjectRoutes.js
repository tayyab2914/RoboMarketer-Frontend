import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomeMain from '../pages/Home/HomeMain';
import Account from '../pages/Account/AccountMain';
import AdminMain from '../pages/Admin/AdminMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
const ProjectRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardMain />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="/dashboard" element={<DashboardMain />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/:link_token" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ProjectRoutes;

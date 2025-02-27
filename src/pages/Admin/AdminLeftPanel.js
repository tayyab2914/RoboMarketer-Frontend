import React, { useState } from "react";
import { IMAGES } from "../../data/ImageData";
import { Button, Popconfirm, Popover } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AdminLeftPanel.css";
import { useLogoutUser } from "../../hooks/useLogoutUser";

const AdminLeftPanel = () => {
  const logoutUser = useLogoutUser();
      const [LogoutVisible, setLogoutVisible] = useState(false);

  return (
    <div className="admin-left-panel-container">
      <span className="admin-left-panel-container-inner">
        <div className="admin-left-panel-logo-wrapper">
          <img
            src={IMAGES.logo_png}
            alt="Panel Logo"
            className="admin-left-panel-logo"
          />
        </div>

        <div className={"admin-left-panel-btn-wrapper-active"}>
          <span className={"admin-left-panel-btn-wrapper-active-inner"}></span>
          <button className="admin-left-panel-btn">
            <span className="admin-left-panel-btn-inner">
              <MyIcon type="users" /> Users
            </span>
          </button>
        </div>
      </span>
      <span>
      <Popconfirm placement="topLeft" title="Are you sure you want to logout?" onConfirm={() => { logoutUser(); setLogoutVisible(false); }} okText="Yes" cancelText="No" >
                
                <button className="settings-btn"  onClick={() => setLogoutVisible(true)}> <span className="settings-btn-wrapper"><MyIcon type="logout" /> Logout</span> </button>

            </Popconfirm>
          
      </span>
    </div>
  );
};

export default AdminLeftPanel;

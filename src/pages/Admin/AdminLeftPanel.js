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
      <Popover open={LogoutVisible} trigger="click" placement="topLeft" onOpenChange={(visible) => setLogoutVisible(visible)}
            content={
                <div style={{ padding: "8px" }}>
                    <p style={{ marginBottom: "0px" }}>Are you sure you want to logout?</p>
                    <div style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}> 
                        <Button type="primary" onClick={() => { logoutUser(); setLogoutVisible(false); }} style={{ marginRight: "5px", padding: "0px 10px" }}> Yes </Button> 
                        <Button onClick={() => setLogoutVisible(false)} style={{ padding: "0px 10px" }}>No </Button>
                    </div>
                </div>
            }
            >
            <button className="settings-btn"  onClick={() => setLogoutVisible(true)}> <span className="settings-btn-wrapper"><MyIcon type="logout" /> Logout</span> </button>
            </Popover>
        
      </span>
    </div>
  );
};

export default AdminLeftPanel;

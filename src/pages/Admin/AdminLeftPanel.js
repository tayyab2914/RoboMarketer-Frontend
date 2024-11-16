import React from "react";
import { IMAGES } from "../../data/ImageData";
import { Popconfirm } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AdminLeftPanel.css";
import { useLogoutUser } from "../../hooks/useLogoutUser";

const AdminLeftPanel = () => {
  const logoutUser = useLogoutUser();

  return (
    <div className="left-panel-container">
      <span className="left-panel-container-inner">
        <img src={IMAGES.panel_logo} alt="Panel Logo" className="left-panel-logo" />
        <button className="left-panel-btn">
          <span>
            <MyIcon type="users" /> Users
          </span>
        </button>
      </span>
      <span>
        <Popconfirm title="Are you sure you want to logout?" onConfirm={logoutUser}  okText="Yes" cancelText="No" >
          <button className="logout-btn"> <MyIcon type="logout" /> Logout </button>
        </Popconfirm>
      </span>
    </div>
  );
};

export default AdminLeftPanel;

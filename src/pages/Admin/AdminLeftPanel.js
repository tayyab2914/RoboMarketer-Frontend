import React from "react";
import { IMAGES } from "../../data/ImageData";
import { Button } from "antd";
import "./styles/AdminLeftPanel.css";
import MyIcon from "../../components/Icon/MyIcon";

const AdminLeftPanel = () => {
  return (
    <div className="left-panel-container">
      <span className="left-panel-container-inner">
        <img src={IMAGES.panel_logo} alt="Panel Logo" className="left-panel-logo" />
        <button className="left-panel-btn"> <span>
             <MyIcon type={"users"} /> Users </span>
        </button>
      </span>
      <span>
        <button className={"logout-btn"}> <MyIcon type={"logout"} /> Logout
        </button>
      </span>
    </div>
  );
};

export default AdminLeftPanel;

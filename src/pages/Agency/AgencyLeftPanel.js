import React, { useState } from "react";
import { IMAGES } from "../../data/ImageData";
import { Collapse, Popconfirm } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AgencyLeftPanel.css";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import AccountSwitcher from "./AccountSwitcher/AccountSwitcher";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../../components/Modals/ProfileModal";


const AgencyLeftPanel = () => {
    const [ShowProfileModal, setShowProfileModal] = useState(false);
  const logoutUser = useLogoutUser();
  const navigate= useNavigate()

  return (
    <div className="agency-left-panel-container">
      <span className="agency-left-panel-container-inner">
        <div className="agency-left-panel-logo-wrapper">
          <img src={IMAGES.logo_png} alt="Panel Logo" className="agency-left-panel-logo" />
        </div>
       <AccountSwitcher/>
       <div className="agency-left-panel-btn" onClick={()=>navigate('/agency')}>
           <MyIcon type={"sub_accounts"}/> Sub-Accounts
       </div>
       <div className="agency-left-panel-btn" onClick={()=>setShowProfileModal(true)}>
           <MyIcon type={"profile_agency"}/> Profile
       </div>

      </span>
      <span>
        <Popconfirm title="Are you sure you want to logout?" onConfirm={logoutUser} okText="Yes" cancelText="No" >
          <button className="settings-btn"> <span className="settings-btn-wrapper"> <MyIcon type="logout" /> Logout </span> </button>
        </Popconfirm>
      </span>
      <ProfileModal isVisible={ShowProfileModal} onClose={()=>setShowProfileModal(false)}/>
    </div>
  );
};

export default AgencyLeftPanel;

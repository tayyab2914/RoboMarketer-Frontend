import React, { useEffect, useState } from "react";
import { IMAGES } from "../../data/ImageData";
import { Collapse, Popconfirm } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AgencyLeftPanel.css";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import AccountSwitcher from "./AccountSwitcher/AccountSwitcher";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../../components/Modals/ProfileModal";
import AgencyProfile from "./AgencyProfile";
import UpdateAccessComponent from "../Dashboard/UpdateAccessComponent";
import { API_GET_ACCOUNTS } from "../../apis/AgencyApis";
import { useSelector } from "react-redux";


const AgencyLeftPanel = ({setCurrentMode}) => {
    const { token, current_account } = useSelector((state) => state.authToken);
    const [ShowProfileModal, setShowProfileModal] = useState(false);
        const [accounts, setAccounts] = useState()
  const logoutUser = useLogoutUser();
  const navigate= useNavigate()
  const fetchAccounts = async () => {
    const response = await API_GET_ACCOUNTS(token);
    setAccounts(response);
    console.log(response)
  };

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  if (!accounts) {
    return null;
  }
  return (
    <div className="agency-left-panel-container">
      <span className="agency-left-panel-container-inner">
        <div className="agency-left-panel-logo-wrapper">
          <img src={IMAGES.logo_png} alt="Panel Logo" className="agency-left-panel-logo" />
        </div>
       <AccountSwitcher is_in_agency={true}/>
       <div className="agency-left-panel-btn" onClick={()=>setCurrentMode(0)}>
           <MyIcon type={"sub_accounts"}/> Sub-Accounts
       </div>
       <div className="agency-left-panel-btn" onClick={()=>setCurrentMode(1)}>
           <MyIcon type={"profile_agency"}/> Profile
       </div>
       {(accounts?.access_type == 2 || accounts?.access_type == 3 )&&<div className="agency-left-panel-btn" onClick={()=>setCurrentMode(2)}>
           <MyIcon type={"whitelabel"}/> Whitelabel Domain
       </div>}
       <div className="agency-left-panel-btn" onClick={()=>setCurrentMode(3)}>
           <MyIcon type={"support"}/> Support
       </div>
       <div className="agency-left-panel-btn" onClick={()=>setCurrentMode(4)}>
           <MyIcon type={"trainingos"}/> Training
       </div>

      </span>
      <span>
        
      {accounts?.access_type==0 && <UpdateAccessComponent chatCount={accounts?.chat_count}/>}
      {/* <div style={{ height: "70px" }}></div> */}
        <Popconfirm title="Are you sure you want to logout?" onConfirm={logoutUser} okText="Yes" cancelText="No" >
          <button className="settings-btn"> <span className="settings-btn-wrapper"> <MyIcon type="logout" /> Logout </span> </button>
        </Popconfirm>
      </span>
      <ProfileModal isVisible={ShowProfileModal} onClose={()=>setShowProfileModal(false)}/>
    </div>
  );
};

export default AgencyLeftPanel;

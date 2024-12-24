import React, { useEffect, useState } from "react";
import { Modal, Button, Popconfirm, Divider } from "antd";
import "./styles/SettingsBtn.css";
import "../../components/Modals/styles/ModalStyles.css";
import MyIcon from "../../components/Icon/MyIcon";
import { RightOutlined } from "@ant-design/icons";
import ProfileModal from "../../components/Modals/ProfileModal";
import AccountModal from "../../components/Modals/AccountModal";
import IntegrationsModal from "../../components/Modals/IntegrationsModal";
import RoboMarketerModal from "../../components/Modals/RoboMarketerModal";
import ProductsModal from "../../components/Modals/ProductsModal";
import MarketingFunnelsModal from "../../components/Modals/MarketingFunnelsModal";
import ReportingSettingsModal from "../../components/Modals/ReportingSettingsModal";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import { useDispatch, useSelector } from "react-redux";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";
import { IMAGES } from "../../data/ImageData";
import { ICONS } from "../../data/IconData";
import ChatgptAPIModal from "../../components/Modals/ChatgptAPIModal";
import InviteTeamMembersModal from "../../components/Modals/InviteTeamMembersModal";


const SettingsBtn = () => {
    const logoutUser = useLogoutUser();
    const dispatch = useDispatch()
    const { isLoggedIn, token,rerender_dashboard,open_integrations_modal,is_integrations_modal_closed_by_user,current_account } = useSelector((state) => state.authToken);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const options = [
    ...(current_account?.is_main_user
      ? [{ name: "Profile (User)", icon: "profile", component: ProfileModal }]
      : []),
    { name: "Account (Client)", icon: "account", component: AccountModal },
    { name: "Integrations", icon: "integrations", component: IntegrationsModal },
    { name: "RoboMarketerIQ", icon: "robomarketer", component: RoboMarketerModal },
    { name: "Reporting", icon: "reporting", component: ReportingSettingsModal },
    { name: "Products / Services", icon: "products", component: ProductsModal },
    { name: "Marketing Funnels", icon: "marketing_funnels", component: MarketingFunnelsModal },
    { name: "ChatGPT API", icon: "chatgpt", component: ChatgptAPIModal },
    { name: "Invite Team Members", icon: "invite_members", component: InviteTeamMembersModal },
  ];
  

  useEffect(() => {
    if (open_integrations_modal && !is_integrations_modal_closed_by_user==undefined || !is_integrations_modal_closed_by_user) {
      const integrationOption = options.find((opt) => opt.name === "Integrations");
      setActiveOption(integrationOption);
      setIsModalVisible(false); 
    }
  }, [open_integrations_modal,rerender_dashboard]);
  
  const handleOptionClick = (option) => {
    setIsModalVisible(false)
    setActiveOption(option);
  };

  const handleCloseOptionModal = () => {
    setActiveOption(null);
    dispatch(setRerenderDashboard(!rerender_dashboard))
  };
  return (
    <div className="setting-modals">
      <button className="settings-btn" onClick={() => setIsModalVisible(true)}>
        <span className="settings-btn-wrapper"><MyIcon type="settings" /> Settings</span>
      </button>

      <Modal
        title={ false }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} 
        centered
        closable={false}
    >
            
    <div className="custom-modal-header">
    <span className="modal-header"> <MyIcon type="settings" style={{ marginRight: "5px" }} /> Settings </span>
 <span ><MyIcon type={'close_icon'} onClick={()=>setIsModalVisible(false)} size="lg" className="close-icon"/></span>
    </div>
            
    <div className="custom-modal-content">
    <div className="">
          {options.map((option) => (
            <>
            
            <div key={option.name} className="modal-option custom-modal-option" onClick={() => handleOptionClick(option)} >
              <button type="text" className="modal-option-btn"> <img src={ICONS[option.icon]} alt="" height={20} /> <span>{option.name}</span> </button>
              <span> <img src={ICONS.arrow_right} style={{height:"10px"}}/> </span>
            </div>
            <Divider style={{margin:"0px 0px"}}/></>

          ))}
        </div>
        <div className=" custom-modal-option modal-option">
            <Popconfirm title="Are you sure you want to logout?" onConfirm={logoutUser}  okText="Yes" cancelText="No" placement="topLeft">
                <button type="text" className="modal-option-btn" style={{width:"100%"}}><MyIcon type={'logout'} /> <span>Logout</span> </button>
            </Popconfirm>
        </div>
    </div>
      </Modal>

      {activeOption && (
        <activeOption.component isVisible={!!activeOption} onClose={handleCloseOptionModal} />
      )}
    </div>
  );
};

export default SettingsBtn;

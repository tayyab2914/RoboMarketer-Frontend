import React, { useState } from "react";
import { Modal, Button } from "antd";
import "./styles/SettingsBtn.css";
import MyIcon from "../../components/Icon/MyIcon";
import { RightOutlined } from "@ant-design/icons";
import ProfileModal from "../../components/Modals/ProfileModal";
import AccountModal from "../../components/Modals/AccountModal";
import IntegrationsModal from "../../components/Modals/IntegrationsModal";
import RoboMarketerModal from "../../components/Modals/RoboMarketerModal";
import ProductsModal from "../../components/Modals/ProductsModal";
import MarketingFunnelsModal from "../../components/Modals/MarketingFunnelsModal";
import ReportingSettingsModal from "../../components/Modals/ReportingSettingsModal";

// Import each modal component
// (Import other modal components here as needed)

const SettingsBtn = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  const options = [
    { name: "Profile (User)", icon: "profile", component: ProfileModal },
    { name: "Account (Client)", icon: "account", component: AccountModal },
    { name: "Integrations", icon: "integrations", component: IntegrationsModal },
    { name: "RoboMarketerIQ", icon: "robomarketer", component: RoboMarketerModal },
    { name: "Reporting", icon: "reporting" , component: ReportingSettingsModal},
    { name: "Products / Services", icon: "products" , component:ProductsModal },
    { name: "Marketing Funnels", icon: "marketing_funnels", component:MarketingFunnelsModal  },
    // Add other options and their components here
  ];

  const handleOptionClick = (option) => {
    setIsModalVisible(false)
    setActiveOption(option);
  };

  const handleCloseOptionModal = () => {
    setActiveOption(null);
  };

  return (
    <div>
      <button className="settings-btn" onClick={() => setIsModalVisible(true)}>
        <span className="settings-btn-wrapper"><MyIcon type="settings" /> Settings</span>
      </button>

      <Modal
        title={
          <span className="settings-header">
            <MyIcon type="settings" style={{ marginRight: "5px" }} /> Settings
          </span>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="modal-options">
          {options.map((option) => (
            <div
              key={option.name}
              className="modal-option"
              onClick={() => handleOptionClick(option)}
            >
              <button type="text" className="modal-option-btn">
                <MyIcon type={option.icon} /> <span>{option.name}</span>
              </button>
              <span>
                <RightOutlined />
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Render the selected option's modal */}
      {activeOption && (
        <activeOption.component
          isVisible={!!activeOption}
          onClose={handleCloseOptionModal}
        />
      )}
    </div>
  );
};

export default SettingsBtn;

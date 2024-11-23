import React from "react";
import { Modal } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AccountSetupComponent from "../../pages/Dashboard/ChatPanel/AccountSetupComponent";

const IntegrationsModal = ({ isVisible, onClose }) => (
  <Modal
    title={<span className='modal-header'><MyIcon type={'integrations'} style={{marginRight:"5px"}}/>Integrations</span>} 
    visible={isVisible}
    onCancel={onClose}
    footer={null}
    centered
  >
    <AccountSetupComponent/>
  </Modal>
);

export default IntegrationsModal;

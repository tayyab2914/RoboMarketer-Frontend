import React from "react";
import { Modal } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";

const IntegrationsModal = ({ isVisible, onClose }) => (
  <Modal
    title={<span className='modal-header'><MyIcon type={'integrations'} style={{marginRight:"5px"}}/>Integrations</span>} 
    visible={isVisible}
    onCancel={onClose}
    footer={null}
    centered
  >
    <p>Integrations settings or content goes here.</p>
  </Modal>
);

export default IntegrationsModal;

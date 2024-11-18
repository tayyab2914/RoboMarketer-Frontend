import React, { useEffect, useState } from "react";
import { Modal, Button, Spin, message, Form } from "antd";
import FunnelForm from "../FunnelForm/FunnelForm";
import { API_CREATE_FUNNEL } from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";

const AddFunnelModal = ({ isVisible, onClose, onAddFunnel, ListFunnels  }) => {
  const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = async (values) => {
    const { funnelName, description, funnelType, steps } = values;
    const newFunnel = { name: funnelName, description, funnel_type: funnelType, steps };

    const result = await API_CREATE_FUNNEL(token, newFunnel, setShowSpinner);
    if (result) {
      onAddFunnel(newFunnel);
      ListFunnels()
      onClose();
    } else {
      message.error("Failed to create the funnel. Please try again.");
    }
  };

  return (
    <Modal 
        title="Add New Funnel / Website" 
        visible={isVisible} 
        onCancel={onClose} 
        centered 
        footer={ <></> } 
    >
      {showSpinner && <Spin fullscreen />}
      <FunnelForm form={form} onFinish={handleAdd} />
    </Modal>
  );
};

export default AddFunnelModal;

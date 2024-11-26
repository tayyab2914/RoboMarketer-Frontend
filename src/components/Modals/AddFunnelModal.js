import React, { useEffect, useState } from "react";
import { Modal, Button, Spin, message, Form } from "antd";
import FunnelForm from "../FunnelForm/FunnelForm";
import { API_CREATE_FUNNEL } from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";
import MyIcon from "../Icon/MyIcon";

const AddFunnelModal = ({ isVisible, onClose, onAddFunnel, ListFunnels }) => {
  const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = async (values) => {
    const result = await API_CREATE_FUNNEL(token, values, setShowSpinner);
    if (result) {
      onAddFunnel(values);
      ListFunnels();
      onClose();
    } else {
      message.error("Failed to create the funnel. Please try again.");
    }
  };

  return (
    <Modal
    title={ false }
    centered
    visible={isVisible}
    onCancel={onClose}
    closable={false}
    footer={false}
  >
                       <div className="custom-modal-header">
    <span className="modal-header"> <MyIcon type="marketing_funnels" style={{ marginRight: "5px" }} size="md"/> Add New Funnel / Website
 </span>
 <span ><MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon"/></span>
    </div>
            
      {showSpinner && <Spin fullscreen />}
      <FunnelForm form={form} onFinish={handleAdd} />
    </Modal>
  );
};

export default AddFunnelModal;

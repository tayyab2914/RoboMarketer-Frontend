import React, { useEffect, useState } from "react";
import { Modal, Spin, message, Form } from "antd";
import { useSelector } from "react-redux";
import EditFunnelForm from "../FunnelForm/EditFunnelForm";
import { API_GET_FUNNEL, API_UPDATE_FUNNEL } from "../../apis/MarketingToolsApis";
import MyIcon from "../Icon/MyIcon";

const EditFunnelModal = ({ isVisible, onClose, funnelId,ListFunnels }) => {
  const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [funnelData, setFunnelData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

  // Function to fetch funnel data
  const ListFunnel = async () => {
    setShowSpinner(true);
    form.resetFields(); // Reset the form before API call
    try {
      const response = await API_GET_FUNNEL(token, funnelId, setShowSpinner);
      setFunnelData(response); // Set fetched funnel data
      setShowSpinner(false); // Hide the spinner after data is fetched
    } catch (error) {
      setShowSpinner(false);
      message.error("Failed to load funnel data.");
    }
  };

  // Fetch funnel data on modal visibility or funnelId change
  useEffect(() => {
    if (isVisible && funnelId) {
        ListFunnel();
    }
  }, [isVisible, funnelId]);

  // Ensure form is updated when funnelData changes
  useEffect(() => {
    if (funnelData && Object.keys(funnelData).length > 0) {
      form.setFieldsValue(funnelData);
      setShowForm(true); // Show the form after setting values
    }
  }, [funnelData, form]);

  // Handle funnel update
  const handleUpdate = async (values) => {
      await API_UPDATE_FUNNEL(token, values,funnelId,setShowSpinner);
      ListFunnels()
      onClose(); 
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
    <span className="modal-header"> <MyIcon type="marketing_funnels" style={{ marginRight: "5px" }} size="md"/> Edit Funnel / Website
 </span>a
    </div>
            
      {showSpinner && <Spin fullscreen />}
      {showForm && (
        <EditFunnelForm
          form={form}
          onClose={onClose}
          onFinish={handleUpdate}
          initialValues={funnelData} 
        />
      )}
    </Modal>
  );
};

export default EditFunnelModal;

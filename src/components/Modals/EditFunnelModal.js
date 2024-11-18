import React, { useEffect, useState } from "react";
import { Modal, Spin, message, Form } from "antd";
import { useSelector } from "react-redux";
import EditFunnelForm from "../FunnelForm/EditFunnelForm";
import { API_GET_FUNNEL, API_UPDATE_FUNNEL } from "../../apis/MarketingToolsApis";

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
      form.setFieldsValue({
        funnelName: funnelData.name,
        funnelType: funnelData.funnel_type,
        description: funnelData.description,
        steps: funnelData.steps || [], 
      });
      setShowForm(true); // Show the form after setting values
    }
  }, [funnelData, form]);

  // Handle funnel update
  const handleUpdate = async (values) => {
    const { name, description, funnelType, steps } = values;
    const updatedFunnel = { name, description, funnel_type: funnelType, steps };

    console.log(updatedFunnel)
      await API_UPDATE_FUNNEL(token, updatedFunnel,funnelId,setShowSpinner);
      ListFunnels()
      onClose(); 
  };

  return (
    <Modal
      title="Edit Funnel / Website"
      visible={isVisible}
      onCancel={onClose}
      centered
      footer={null}
    >
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

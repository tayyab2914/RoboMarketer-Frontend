import React, { useState } from "react";
import { Modal, Button } from "antd";
import MyIcon from "../Icon/MyIcon";
import FunnelForm from "../FunnelForm/FunnelForm";

const AddFunnelModal = ({ isVisible, onClose, onAddFunnel, funnelId }) => {
  const [newFunnelName, setNewFunnelName] = useState("");
  const [description, setDescription] = useState("");
  const [funnelType, setFunnelType] = useState("sales");
  const [steps, setSteps] = useState([]); // Manage steps state

  const handleAdd = () => {
    if (newFunnelName.trim()) {
      const newFunnel = {
        name: newFunnelName,
        description,
        funnelType,
        steps, // Include steps when adding a new funnel
      };
      console.log("Funnel Details:", newFunnel); // Log the values when the button is clicked
      onAddFunnel(newFunnel);

      setNewFunnelName("");
      setDescription("");
      setFunnelType("sales");
      setSteps([]); // Clear steps after adding
      onClose();
    }
  };

  return (
    <Modal
      title="Add New Funnel / Website"
      visible={isVisible}
      onCancel={onClose}
      centered
      footer={[
        <div className="modal-actions" key="footer">
          <span className="btn-1">
            <Button onClick={onClose} className="cancel-btn">
              <MyIcon type={"cross_red"} /> Cancel
            </Button>
          </span>
          <span className="btn-2">
            <Button type="primary" onClick={handleAdd} className="create-btn">
              <MyIcon type={"tick"} /> Add Funnel
            </Button>
          </span>
        </div>
      ]}
    >
      {/* Pass steps and callbacks to FunnelForm */}
      <FunnelForm
        initialValues={{ newFunnelName, description, funnelType, funnelSteps: steps }}
        callbacks={{
          setNewFunnelName,
          setDescription,
          setFunnelType,
          setSteps, // Pass setSteps to manage funnel steps
        }}
      />
    </Modal>
  );
};

export default AddFunnelModal;

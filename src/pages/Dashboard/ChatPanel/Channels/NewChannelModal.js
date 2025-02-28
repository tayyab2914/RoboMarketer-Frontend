import React, { useState } from "react";
import MyIcon from "../../../../components/Icon/MyIcon";
import { Modal, Input, Button, message } from "antd";
import { API_CREATE_CHANNEL } from "../../../../apis/ChatApis";
import "./../../../../components/Modals/styles/ModalStyles.css";
import { useSelector } from "react-redux";

const NewChannelModal = ({ visible, onClose, fetchChannels }) => {
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.authToken);

  const handleCreateChannel = async () => {
    if (!channelName.trim()) {
      message.error("Channel name cannot be empty");
      return;
    }
    await API_CREATE_CHANNEL(token, channelName);
    setChannelName("");
    onClose(); 
    fetchChannels(); 
  };

  return (
    <Modal className="" title={false}  zIndex={1200} open={visible} onCancel={onClose} closable={false} footer={null} >
      <div className="custom-modal-header">
        <span className="modal-header"><b style={{marginRight:"5px"}}># </b> Add New Channel </span>
        <span><MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" /> </span>
      </div>

      <div className="modal-content">
        <p className="input-group-label" style={{marginTop:"0px"}}>Channel Name</p>
        <Input placeholder="Enter channel name" value={channelName} onChange={(e) => setChannelName(e.target.value)} style={{ height:"40px" }}/>
        <Button type="primary" block onClick={handleCreateChannel} loading={loading} style={{height:"40px"}} >
          Create Channel
        </Button>
      </div>
    </Modal>
  );
};

export default NewChannelModal;

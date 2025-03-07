import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import MyIcon from "../../../../components/Icon/MyIcon";
import { API_UPDATE_CHANNEL } from "../../../../apis/ChatApis";
import { useSelector } from "react-redux";

const UpdateChannelModal = ({ channel, visible, onClose, fetchChannels }) => {
  const { token } = useSelector((state) => state.authToken);
  const [channelName, setChannelName] = useState("");

  // When the modal opens, update channelName state with the current channel name
  useEffect(() => {
    if (channel) {
      setChannelName(channel.name);
    }
  }, [channel, visible]);

  const handleUpdateChannel = async () => {
    if (channelName.trim() === "") {
      message.error("Channel name cannot be empty!");
      return;
    }
    await API_UPDATE_CHANNEL(token, channel.id,channelName);
    fetchChannels();
    onClose(); // Close the modal after updating
  };

  return (
    <Modal title={false} open={visible} onCancel={onClose} closable={false} footer={null} zIndex={1200} >
      <div className="custom-modal-header">
        <span className="modal-header">
          <b style={{marginRight:"5px"}}># </b> Edit Channel{" "}
        </span>
        <span>
          <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
        </span>
      </div>

      <div className="modal-content">
        <p className="input-group-label" style={{marginTop:"0px"}}>Channel Name</p>
        <Input placeholder="Enter channel name" value={channelName} onChange={(e) => setChannelName(e.target.value)} style={{ height: "40px" }} />
        <Button type="primary" block onClick={handleUpdateChannel} style={{ height: "40px" }} >
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateChannelModal;

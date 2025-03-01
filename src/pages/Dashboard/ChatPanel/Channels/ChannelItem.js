import React, { useState } from "react";
import { Dropdown, Menu, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import MyIcon from "../../../../components/Icon/MyIcon";
import { API_DELETE_CHANNEL } from "../../../../apis/ChatApis";
import { useDispatch, useSelector } from "react-redux";
import { setRerenderDashboard } from "../../../../redux/AuthToken/Action";
import UpdateChannelModal from "./UpdateChannelModal";

const ChannelItem = ({ channel, onSelectChannel, fetchChannels }) => {
  const dispatch = useDispatch();
  const [showUpdateChannelModal, setShowUpdateChannelModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { token, rerender_dashboard } = useSelector((state) => state.authToken);

  // Handle delete channel
  const handleDeleteChannel = async (id) => {
    await API_DELETE_CHANNEL(token, id);
    dispatch(setRerenderDashboard(!rerender_dashboard));
    fetchChannels();
  };

  // Handle edit channel (open modal and close dropdown)
  const handleEditChannel = () => {
    setShowUpdateChannelModal(true);
    setDropdownVisible(false);
  };

  // Dropdown menu for edit and delete
  const renderDropdownMenu = (channel) => (
    <Menu>
      <Menu.Item key="edit" onClick={handleEditChannel}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <EditOutlined style={{ marginRight: "10px" }} /> Edit
        </span>
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this channel?"
          onConfirm={() => handleDeleteChannel(channel?.id)}
          okText="Yes"
          cancelText="No"
          placement="topLeft"
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            <DeleteOutlined style={{ marginRight: "10px" }} /> Delete
          </span>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="channel-item-wrapper">
        <div className="channel-item">
          <span style={{ width: "100%", padding: "5px 0px" }} onClick={() => onSelectChannel(channel)}>
            {channel.name}
          </span>
          <Dropdown
            overlay={renderDropdownMenu(channel)}
            trigger={["click"]}
            open={dropdownVisible}
            onOpenChange={setDropdownVisible}
            overlayStyle={{zIndex:"999 !important"}}
            
          >
            <MyIcon type="elipsis" style={{ cursor: "pointer", marginLeft: 10, height: "12px" }} />
          </Dropdown>
        </div>
      </div>

      <UpdateChannelModal
        channel={channel}
        visible={showUpdateChannelModal}
        onClose={() => setShowUpdateChannelModal(false)}
        fetchChannels={fetchChannels}
        
      />
    </>
  );
};

export default ChannelItem;

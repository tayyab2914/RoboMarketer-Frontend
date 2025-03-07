import React, { useEffect, useState } from "react";
import { API_GET_CHANNELS } from "../../../../apis/ChatApis";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Popover } from "antd";
import "./styles/ChannelsPopup.css";
import MyIcon from "../../../../components/Icon/MyIcon";
import NewChannelModal from "./NewChannelModal";
import ChannelList from "./ChannelList";
import { TRUNCATE_STRING } from "../../../../utils/Methods";
import { setChannel } from "../../../../redux/AuthToken/Action";

const ChannelsPopup = ({ setSelectedChannel, selectedChannel }) => {
  const [channelsData, setChannelsData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { token, rerender_dashboard, channel } = useSelector( (state) => state.authToken );
  const dispatch = useDispatch();

  // Fetch channels on component mount
  const fetchChannels = async () => {
    try {
      const response = await API_GET_CHANNELS(token);
      const fetchedChannels = response?.channels || [];
      setChannelsData(fetchedChannels);

      if (fetchedChannels.length > 0) {
        // Check if channel in Redux exists and is not deleted
        const existingChannel = fetchedChannels.find(
          (ch) => ch.id === channel?.id
        );
        if (existingChannel) {
          setSelectedChannel(existingChannel);
        } else {
          setSelectedChannel(fetchedChannels[0]);
          dispatch(setChannel(fetchedChannels[0]));
        }
      } else {
        setSelectedChannel({ id: -1, name: "Please Select a Channel" });
        dispatch(setChannel(null));
      }
    } catch (error) {
      console.error("Failed to fetch channels:", error);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [rerender_dashboard]);

  const handleChannelSelect = (channel) => {
    dispatch(setChannel(channel));
    setSelectedChannel(channel);
    setDropdownVisible(false); // Close dropdown
  };

  const handleNewChannel = () => {
    setDropdownVisible(false);
    setModalVisible(true);
  };

  const dropdownMenu = (
    <div className="channel-dropdown">
      <div className="channel-btn-wrapper">
        <div className="channel-btn">
          <Button onClick={handleNewChannel} style={{ fontWeight: 600, height: "40px", width: "100%" }} > + Add New Channel </Button>
        </div>
      </div>
      <ChannelList channelsData={channelsData} onSelectChannel={handleChannelSelect} fetchChannels={fetchChannels} />
    </div>
  );

  return (
    <div className="channels-popup">
      <Dropdown visible={dropdownVisible} onVisibleChange={setDropdownVisible} overlay={dropdownMenu} trigger={["click"]} placement="bottom" overlayStyle={{ maxWidth: "450px", minWidth: "450px " }} >
        <Button type="default" className="channel-name-btn">
          <span> {" "} <b>#</b>{" "} {selectedChannel ? TRUNCATE_STRING(selectedChannel.name, 48) : "Select a Channel"}{" "} </span>
          <MyIcon type={"arrow_down"} style={{ width: "12px" }} />
        </Button>
      </Dropdown>

      <NewChannelModal visible={modalVisible} onClose={() => setModalVisible(false)} fetchChannels={fetchChannels} />
    </div>
  );
};

export default ChannelsPopup;

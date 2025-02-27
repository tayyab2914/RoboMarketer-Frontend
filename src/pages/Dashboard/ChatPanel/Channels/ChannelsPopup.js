import React, { useEffect, useState } from "react";
import { API_GET_CHANNELS } from "../../../../apis/ChatApis";
import { useSelector } from "react-redux";
import { Button, Popover } from "antd";
import "./styles/ChannelsPopup.css";
import MyIcon from "../../../../components/Icon/MyIcon";
import NewChannelModal from "./NewChannelModal";
import ChannelList from "./ChannelList";
import { TRUNCATE_STRING } from "../../../../utils/Methods";

const ChannelsPopup = ({setSelectedChannel,selectedChannel}) => {
  const [channelsData, setChannelsData] = useState([]);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { token,rerender_dashboard } = useSelector((state) => state.authToken);

  
  // Fetch channels on component mount
  const fetchChannels = async () => {
    try {
      const response = await API_GET_CHANNELS(token);
      setChannelsData(response?.channels || []);
      if (response?.channels?.length > 0) {
        setSelectedChannel(response.channels[0]); // Default to first channel
      }
      else
      {
        setSelectedChannel({id:0,name:"Please Select a Channel"})
      }
    } catch (error) {
      console.error("Failed to fetch channels:", error);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [rerender_dashboard]);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setPopoverVisible(false); // Close popover
  };

  const handleNewChannel = () => {
    setPopoverVisible(false); 
    setModalVisible(true);
  };


  return (
    <div className="channels-popup">
      <Popover
        content={
          <div >
            <div className="channel-btn-wrapper">
              <div className="channel-btn">
                <Button  onClick={handleNewChannel} style={{ fontWeight: 600, height: "40px",width:"100%" }} > + {" "} Add New Channel{" "} </Button>
              </div>
            </div>
            <ChannelList channelsData={channelsData} onSelectChannel={handleChannelSelect} fetchChannels={fetchChannels}/>
          </div>
        }
        className="channels-popover"
        arrow={false}
        overlayStyle={{  maxWidth: "450px",minWidth:"220px " }}
        trigger="click"
        open={popoverVisible}
        onOpenChange={setPopoverVisible}
        placement={'bottomLeft'}
      >
        <Button type="default" className="channel-name-btn">
          <span> <b>#</b>{" "} {selectedChannel ? TRUNCATE_STRING(selectedChannel.name,48) : "Select a Channel"} </span>
          <MyIcon type={"arrow_down"} style={{ width: "12px" }} />
        </Button>
      </Popover>

      <NewChannelModal visible={modalVisible} onClose={() => setModalVisible(false)} fetchChannels={fetchChannels} />
    </div>
  );
};

export default ChannelsPopup;

import React from "react";
import ChannelItem from "./ChannelItem";
import './styles/ChannelsPopup.css'
const ChannelList = ({ channelsData, onSelectChannel,fetchChannels }) => {
  return (
      <div className="channel-list-wrapper">
      {channelsData?.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          fetchChannels={fetchChannels}
          onSelectChannel={onSelectChannel}
        />
      ))}
      </div>
      
  );
};

export default ChannelList;

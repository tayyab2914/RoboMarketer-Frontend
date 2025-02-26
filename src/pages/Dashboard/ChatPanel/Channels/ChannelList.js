import React from "react";
import ChannelItem from "./ChannelItem";

const ChannelList = ({ channelsData, onSelectChannel,fetchChannels }) => {
  return (
      <>
      {channelsData?.map((channel) => (
        <ChannelItem
          key={channel.id}
          channel={channel}
          fetchChannels={fetchChannels}
          onSelectChannel={onSelectChannel}
        />
      ))}
      </>
      
  );
};

export default ChannelList;

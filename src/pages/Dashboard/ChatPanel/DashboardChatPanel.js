import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./styles/DashboardChatPanel.css";
import MessageBar from "./MessageBar";
import AccountSetupComponent from "./AccountSetupComponent";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import ChannelsPopup from "./Channels/ChannelsPopup";

const DashboardChatPanel = () => {
    const { isLoggedIn, token,rerender_dashboard,facebook_state,rerender_chat_panel,current_account } = useSelector((state) => state.authToken);
  const [isAccountSetup, setisAccountSetup] = useState(current_account?.is_facebook_connected);
  
  const [ChatData, setChatData] = useState([]);
const [modalVisible, setModalVisible] = useState(false);
const [selectedChannel, setSelectedChannel] = useState(null);
useEffect(() => {
    setisAccountSetup(current_account?.is_facebook_connected);
    setModalVisible(!current_account?.is_facebook_connected);
  }, [current_account?.is_facebook_connected]);

  const get_history = async () => {
      const response = await API_GET_HISTORY( token, current_account?.id, selectedChannel );
      setChatData(response?.reverse() || []);
    };
  
    useEffect(() => {
      get_history();
    }, [selectedChannel,rerender_dashboard]);


  return (
    <Row className="dashboard-chat-panel-main">
      <Col>
      <ChannelsPopup setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel}/>
        <Chats isaccount_open={!isAccountSetup} chat_data={ChatData} get_history={get_history} selectedChannel={selectedChannel}/>
      </Col>
      <Col className="dashboard-chat-panel-main-message-bar" >
        <MessageBar isDisabled={!isAccountSetup} selectedChannel={selectedChannel}/>
      </Col>
    </Row>
  );
};

export default DashboardChatPanel;

import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./styles/DashboardChatPanel.css";
import MessageBar from "./MessageBar";
import AccountSetupComponent from "./AccountSetupComponent";
import Chats from "./Chats";
import { useSelector } from "react-redux";

const DashboardChatPanel = () => {
    const { isLoggedIn, token,rerender_dashboard,facebook_state,rerender_chat_panel,current_account } = useSelector((state) => state.authToken);
  const [isAccountSetup, setisAccountSetup] = useState(current_account?.is_facebook_connected);
  
const [modalVisible, setModalVisible] = useState(false);
useEffect(() => {
    setisAccountSetup(current_account?.is_facebook_connected);
    setModalVisible(!current_account?.is_facebook_connected);
  }, [current_account?.is_facebook_connected]);
  return (
    <Row className="dashboard-chat-panel-main">
      <Col>
        <Chats isaccount_open={!isAccountSetup}/>
      </Col>
      <Col className="dashboard-chat-panel-main-message-bar" >
        <MessageBar isDisabled={!isAccountSetup} />
      </Col>
    </Row>
  );
};

export default DashboardChatPanel;

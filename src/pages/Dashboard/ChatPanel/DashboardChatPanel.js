import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./styles/DashboardChatPanel.css";
import MessageBar from "./MessageBar";
import AccountSetupComponent from "./AccountSetupComponent";
import Chats from "./Chats";
import { useSelector } from "react-redux";

const DashboardChatPanel = () => {
    const { isLoggedIn, token,rerender_dashboard,rerender_chat_panel,current_account } = useSelector((state) => state.authToken);
  const [isAccountSetup, setisAccountSetup] = useState(current_account?.is_facebook_connected);
  
  useEffect(()=>{
console.log(current_account)
setisAccountSetup(current_account?.is_facebook_connected)
  },[current_account?.is_facebook_connected])
  return (
    <Row className="dashboard-chat-panel-main">
      <Col>
      {!isAccountSetup && <AccountSetupComponent />}
     <Chats />
      </Col>

      <Col className="dashboard-chat-panel-main-message-bar" style={{maxHeight:"70px"}}>
        <MessageBar isDisabled={!isAccountSetup} />
      </Col>
    </Row>
  );
};

export default DashboardChatPanel;

import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./styles/DashboardChatPanel.css";
import MessageBar from "./MessageBar";
import AccountSetupComponent from "./AccountSetupComponent";
import Chats from "./Chats";

const DashboardChatPanel = () => {
  const [isAccountSetup, setisAccountSetup] = useState(true);
  
  return (
    <Row className="dashboard-chat-panel-main">
      <Col>
      {!isAccountSetup && <AccountSetupComponent />}
      <Chats />
      </Col>

      <Col>
        <MessageBar disabled={!isAccountSetup} />
      </Col>
    </Row>
  );
};

export default DashboardChatPanel;

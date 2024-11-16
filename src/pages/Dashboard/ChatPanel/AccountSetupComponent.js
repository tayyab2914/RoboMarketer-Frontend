import { Col, Row } from "antd";
import React from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import "./styles/AccountSetupComponent.css";
import "./styles/DashboardChatPanel.css";

const AccountSetupComponent = () => {
  return (
    <Row className="account-setup-component-main">
      <Col>
        <span className="account-setup-component-icon-wrapper">
          <MyIcon type={"robot"} size="md" />
        </span>
      </Col>
      <Col flex="auto">
        <div className="account-setup-component-content">
          <p className="account-setup-component-title">Account Setup</p>
          <div className="account-setup-component-description">
            <p>Let's get your account setup by integrating your accounts</p>
            <div className="account-setup-component-account">
              <span className="account-setup-component-account-name">
              <MyIcon className="account-setup-component-account-icon" type={'facebook'} size="md"/>
                Facebook Ad Account
              </span>
              <button className="account-setup-component-connect-button">
                Connect Facebook
              </button>
            </div>
            <p className="account-setup-component-help">
              If you have any questions or need help please just type a question
              below thanks!
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default AccountSetupComponent;

import React, { useState } from "react";
import { Popover, Button, message, Spin } from "antd";
import MyButton from "../../components/Button/Button";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AdminMainPanel.css";
import { useSelector } from "react-redux";
import { API_GENERATE_LINK } from "../../apis/AuthApis";
import { CopyOutlined } from '@ant-design/icons';
import { FRONTEND_DOMAIN_NAME } from "../../utils/GlobalSettings";

const CreateSignUpLinkBtn = () => {
  const { token, isLoggedIn } = useSelector((state) => state.authToken);
  const [LinkToken, setLinkToken] = useState("");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false); // State to manage popover visibility


  const generateSignUpLink = async () => {
    const response = await API_GENERATE_LINK(token, setShowSpinner);
    setLinkToken(response);
    setPopoverVisible(true); // Show popover after the token is generated
  };

  const copyToClipboard = () => {
    if (LinkToken) {
      navigator.clipboard.writeText(`${FRONTEND_DOMAIN_NAME}/account/${LinkToken}`);
      message.success("Token copied to clipboard!");
      setPopoverVisible(false); // Close the popover after the token is copied
    }
  };

  const popoverContent = (
    <div>
      {LinkToken ? (
        <>
          <div>
            <CopyOutlined onClick={copyToClipboard} style={{ marginRight: "5px" }} />
            <span className="signup-link">{FRONTEND_DOMAIN_NAME}/account/{LinkToken} </span>
          </div>
        </>
      ) : (
        <div>Generating token...</div>
      )}
    </div>
  );

  return (
    <div>
      {ShowSpinner && <Spin fullscreen />}
      <Popover
        content={popoverContent}
        title="Signup Token"
        trigger="click"
        visible={popoverVisible} // Use state to control visibility
        placement="bottomRight"
        onVisibleChange={setPopoverVisible} // This will update visibility when the popover is closed
      >
        <MyButton
          text={
            <span className="admin-panel-sign-up-link">
              <MyIcon type={"sign_up_link"} size="xs" />
              Create One-Time Signup Link
            </span>
          }
          className="generate-one-time-link-btn"
          onClick={generateSignUpLink} // Call the API to generate the link
        />
      </Popover>
    </div>
  );
};

export default CreateSignUpLinkBtn;

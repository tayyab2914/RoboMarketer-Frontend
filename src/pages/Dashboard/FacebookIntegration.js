import React, { useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import { API_GENERATE_AUTH_URL } from "../../apis/FacebookInsightsApis";
import { setFacebookState } from "../../redux/AuthToken/Action";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "antd";

const FacebookIntegration = ({isInIntegrationComponent,onClose}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authToken);
  const connectFbHandler = async () => {
    const response = await API_GENERATE_AUTH_URL(token, setShowSpinner);
    console.log('API_GENERATE_AUTH_URL',response)
    if (response) {
      dispatch(setFacebookState(response?.state));
      window.location.href = response?.authorization_url;
    }
  };
  return (

   <>
   {isInIntegrationComponent && <div className="custom-modal-header">
          <span className="modal-header">Account Setup</span>
          <span>
            <MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>}
        <Row style={{ width: "100%" }}>
   <Col xs={24} sm={24} md={24} lg={24} style={{ display: "flex", width: "100%" }} >
   {!isInIntegrationComponent &&
    
    <span className="robot-icon-wrapper">
      <MyIcon type={"robot"} className={"response-icon"} size="md" />
  </span>}
  
  <div className="account-setup-component-content">
    <div className="account-setup-component-description">
      <p>Let's get your account setup by integrating your accounts</p>
      <div className="account-setup-component-account">
        <span className="account-setup-component-account-name">
          <MyIcon className="account-setup-component-account-icon" type={"facebook"} size="md" />
          Facebook Ad Account
        </span>
        <button className="account-setup-component-connect-button" onClick={connectFbHandler} > Connect Facebook </button>
      </div>
      <p className="account-setup-component-help"> If you have any questions or need help, please just type a question below. Thanks! </p>
    </div></div>
    </Col>
    </Row>
    </>
  );
};

export default FacebookIntegration;

import React, { useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import { API_GENERATE_AUTH_URL } from "../../apis/FacebookInsightsApis";
import { setFacebookState, setisIntegrationsModalClosedByUser } from "../../redux/AuthToken/Action";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spin } from "antd";

const FacebookIntegration = ({isInIntegrationComponent,onClose,showSpinner}) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authToken);


  const connectFbHandler = async () => {
    dispatch(setisIntegrationsModalClosedByUser(false))
    
    const response = await API_GENERATE_AUTH_URL(token, null);
    if (response) {
      dispatch(setFacebookState(response?.state));
      window.location.href = response?.authorization_url;
    }

  };
  return (
   <>
   {isInIntegrationComponent && <div className="custom-modal-header">
          <span className="modal-header"><MyIcon type={"account_setup"} size="md" />Account Setup</span>
          <span>
            <MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>}
        <Row style={{ width: "100%" }}>
   <Col xs={24} sm={24} md={24} lg={24} style={{ display: "flex", width: "100%",marginBottom:"10px" }} >
   {!isInIntegrationComponent &&
    
    <span className="robot-icon-wrapper">
      <MyIcon type={"robot"} className={"response-icon"} size="md" />
  </span>}
  
  {showSpinner ? <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100px",width:"100%"}}><Spin/></div>
  :
  <div className="account-setup-component-content">
    <div className="account-setup-component-description">
    {!isInIntegrationComponent &&<p className="account-setup-component-title" >
                  {" "}
                  <MyIcon type={"account_setup"} size="md" /><span>Account Setup</span>{" "}
                </p>}
      <div className="account-setup-component-inner-contents">
      {!isInIntegrationComponent && <p>Let's get your account setup by integrating your accounts</p>}
     
      {isInIntegrationComponent && <p className="fb-integration-modal-description">Facebook Integration</p>}
       <div className="account-setup-component-account">
        <span className="account-setup-component-account-name">
        
          <MyIcon className="account-setup-component-account-icon" type={"facebook"} size="md" />
          Facebook Ad Account
        </span>
        <button className="account-setup-component-connect-button" onClick={connectFbHandler} > Connect Facebook </button>
      </div>
      {!isInIntegrationComponent && <p className="account-setup-component-help"> If you have any questions or need help, please just type a question below. Thanks! </p>}
      </div>
    </div>
    </div>}
    </Col>
    </Row>
    </>
  );
};

export default FacebookIntegration;

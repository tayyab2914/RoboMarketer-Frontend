import React, { useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import { API_DISCONNECT_FACEBOOK, API_GENERATE_AUTH_URL } from "../../apis/FacebookInsightsApis";
import {
  setFacebookState,
  setisIntegrationsModalClosedByUser,
  setRerenderDashboard,
} from "../../redux/AuthToken/Action";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spin } from "antd";
import useWindowWidth from "../../hooks/useWindowWidth";
import './ChatPanel/styles/AccountSetupComponent.css'

const FacebookIntegration = ({
  isInIntegrationComponent,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { token ,current_account,rerender_dashboard} = useSelector((state) => state.authToken);
  const windowWidth = useWindowWidth();
  const [showSpinner, setShowSpinner] = useState(false);

  const connectFbHandler = async () => {
    dispatch(setisIntegrationsModalClosedByUser(false));

    const response = await API_GENERATE_AUTH_URL(token, setShowSpinner);
    if (response) {
      dispatch(setFacebookState(response?.state));
      window.location.href = response?.authorization_url;
    }
  };

  const disconnectFacebook = async () => {
    const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));
  };
  return (
    <>
      {isInIntegrationComponent && (
        <div className="custom-modal-header">
          <span className="modal-header">
            <MyIcon
              type="integrations_inner"
              style={{ marginRight: "5px" }}
              size="md"
            />
            Integrations
          </span>
          <span>
            <MyIcon
              type={"close_icon"}
              onClick={onClose}
              size="lg"
              className="close-icon"
            />
          </span>
        </div>
      )}
      <Row
        style={{
          width: "100%",
          marginTop: `${
            windowWidth < 500 ? "60px" : windowWidth < 1200 ? "50px" : "0px"
          }`,
        }}
      >
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "10px",
            padding: `${windowWidth < 500 ? "0px 10px" : "0px"}`,
          }}
        >
          {!isInIntegrationComponent && (
            <span className="robot-icon-wrapper">
              <MyIcon type={"robot"} className={"response-icon"} size="md" />
            </span>
          )}

          {showSpinner ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
                width: "100%",
              }}
            >
              <Spin />
            </div>
          ) : (
            <div className="account-setup-component-content">
              <div className="account-setup-component-description">
                {!isInIntegrationComponent && (
                  <p className="account-setup-component-title">
                    {" "}
                    <MyIcon type={"account_setup"} size="md" />
                    <span>Account Setup</span>{" "}
                  </p>
                )}
                   <div className="account-setup-component-inner-contents">
                   {!current_account?.is_facebook_connected &&<>
                  {!isInIntegrationComponent && (
                    <p>
                      Let's get your account setup by integrating your accounts
                    </p>
                  )}

                  {isInIntegrationComponent && (
                    <p className="fb-integration-modal-description">
                      Facebook Integration
                    </p>
                  )}
                  <div className="account-setup-component-account">
                    <span className="account-setup-component-account-name">
                      <MyIcon
                        className="account-setup-component-account-icon"
                        type={"facebook"}
                        size="md"
                      />
                      Facebook Ad Account
                    </span>
                    <button
                      className="account-setup-component-connect-button"
                      onClick={connectFbHandler}
                    >
                      {" "}
                      Connect Facebook{" "}
                    </button>
                  </div>
                  {!isInIntegrationComponent && (
                    <p className="account-setup-component-help">
                      {" "}
                      If you have any questions or need help, please just type a
                      question below. Thanks!{" "}
                    </p>
                  )}</>}
                   {current_account?.is_facebook_connected &&<> <p className="fb-integration-modal-description"> Facebook Integration </p>
          <div className="fb-integration-modal-info">
            <span className="fb-integration-modal-name">
               <MyIcon type={"facebook"} size="md" /> {current_account?.facebook_account_name}{" "}
            </span>
            <span className="fb-integration-modal-btn">
              <button onClick={disconnectFacebook}>
                 <MyIcon type={"cross_red"} /> Disconnect </button>
            </span>
          </div></>}
                </div>
               
              </div>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FacebookIntegration;

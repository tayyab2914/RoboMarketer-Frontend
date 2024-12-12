
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
import RoboMarketerModal from "../../components/Modals/RoboMarketerModal";

const RoboMarketerMessage = ({
  isInIntegrationComponent,
  onClose,
}) => {

  const dispatch = useDispatch();
  const { token ,current_account,rerender_dashboard} = useSelector((state) => state.authToken);
  const windowWidth = useWindowWidth();
  const [showSpinner, setShowSpinner] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const handleOpenModal = async () => {
    setopenModal(true)
  };

  const handleCloseModal = async () => {
    setopenModal(false)
    dispatch(setRerenderDashboard(!rerender_dashboard))
  };
  return (
    <>
    
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
                    <span>Setup RoboMarketerIQ</span>{" "}
                  </p>
                )}
                   <div className="account-setup-component-inner-contents">
                 
                    <p>
                      Please setup RoboMarketerIQ to establish target KPIs, monthly goals, and guidelines for your RoboMarketer when setting up and managing your campaigns 
                    </p>
                 

                 
                  <div className="account-setup-component-account">
                    <span className="account-setup-component-account-name">
                      <MyIcon
                        className="account-setup-component-account-icon"
                        type={"chart"}
                      />
                      Setup RoboMarketerIQ
                    </span>
                    <button
                      className="account-setup-component-connect-button"
                      style={{backgroundColor:"black"}}
                      onClick={handleOpenModal}
                    >
                      {" "}
                      Setup RoboMarketerIQ{" "}
                    </button>
                  </div>
                  {!isInIntegrationComponent && (
                    <p className="account-setup-component-help">
                      {" "}
                      If you have any questions or need help, please just type a
                      question below. Thanks!{" "}
                    </p>
                  )}
                  
                </div>
               
              </div>
            </div>
          )}
        </Col>
      </Row>

      <RoboMarketerModal isVisible={openModal} onClose={handleCloseModal}/>
    </>
  );
};

export default RoboMarketerMessage;

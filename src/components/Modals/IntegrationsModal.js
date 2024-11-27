import React, { useEffect, useState } from "react";
import { Modal, Spin } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AccountSetupComponent from "../../pages/Dashboard/ChatPanel/AccountSetupComponent";
import { useDispatch, useSelector } from "react-redux";
import { API_DISCONNECT_FACEBOOK } from "../../apis/FacebookInsightsApis";
import { FacebookFilled } from "@ant-design/icons";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

const IntegrationsModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const {
    isLoggedIn,
    token,
    rerender_dashboard,
    rerender_chat_panel,
    current_account,
    facebook_state
  } = useSelector((state) => state.authToken);

  const disconnectFacebook = async () => {
    const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));    


    onClose();
  };
  useEffect(()=>{},[rerender_dashboard])
  console.log(current_account)
console.log(facebook_state,current_account?.is_facebook_connected)
  return (
    <>
        <Modal
          title={false}
          centered
          visible={isVisible}
          onCancel={onClose}
          closable={false}
          footer={null}
          width={700}
        >{
            !facebook_state && current_account?.is_facebook_connected ? <>
             <div className="custom-modal-header">
            <span className="modal-header">
              {" "}
              <MyIcon
                type="integrations"
                style={{ marginRight: "5px" }}
                size="md"
              />{" "}
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

          <div className="custom-modal-content modal-content">
            <p className="fb-integration-modal-description">
              Facebook Integration
            </p>
            <div className="fb-integration-modal-info">
              <span className="fb-integration-modal-name">
                {" "}
                <MyIcon type={"facebook"} size="md" />
                {current_account?.name}{" "}
              </span>
              <span className="fb-integration-modal-btn">
                <button onClick={disconnectFacebook}>
                  {" "}
                  <MyIcon type={"cross_red"} />
                  Disconnect
                </button>
              </span>
            </div>
          </div></>:
          <AccountSetupComponent isInIntegrationComponent={true} onClose={onClose}/>

        }
        </Modal>
    </>
  );
};

export default IntegrationsModal;

import React, { useState } from "react";
import { Modal, Spin } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AccountSetupComponent from "../../pages/Dashboard/ChatPanel/AccountSetupComponent";
import { useDispatch, useSelector } from "react-redux";
import { API_DISCONNECT_FACEBOOK } from "../../apis/FacebookInsightsApis";
import {FacebookFilled} from "@ant-design/icons";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

const IntegrationsModal = ({ isVisible, onClose }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const dispatch = useDispatch()
    const { isLoggedIn, token,rerender_dashboard,rerender_chat_panel,current_account } = useSelector((state) => state.authToken);
  const [isAccountSetup, setisAccountSetup] = useState(current_account?.is_facebook_connected);
const [showModal, setshowModal] = useState(true);

  const disconnectFacebook = async()=>{
    const response = await API_DISCONNECT_FACEBOOK(token,setShowSpinner)
setshowModal(false)
dispatch(setRerenderDashboard(!rerender_dashboard))
  }
 return(<>
 
 {showSpinner && <Spin fullscreen />}
 {isAccountSetup &&  <Modal
    title={<span className='modal-header'><MyIcon type={'integrations'} style={{marginRight:"5px"}}/>Integrations</span>} 
    visible={isVisible && showModal}
    onCancel={onClose}
    footer={null}
    width={600}
    centered
  >
    <p className="fb-integration-modal-description">Facebook Integration</p>
    <div className="fb-integration-modal-info">
        <span className="fb-integration-modal-name">    <MyIcon type={"facebook"} size="md" />{current_account?.name} </span>
        <span className="fb-integration-modal-btn"><button onClick={disconnectFacebook}> <MyIcon type={'cross_red'}/>Disconnect</button></span>
    </div>
  </Modal>}
</>

 )}

export default IntegrationsModal;

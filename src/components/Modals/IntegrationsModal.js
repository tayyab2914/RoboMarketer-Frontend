import React, { useState } from "react";
import { Modal } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AccountSetupComponent from "../../pages/Dashboard/ChatPanel/AccountSetupComponent";
import { useSelector } from "react-redux";

const IntegrationsModal = ({ isVisible, onClose }) => {
    const { isLoggedIn, token,rerender_dashboard,rerender_chat_panel,current_account } = useSelector((state) => state.authToken);
  const [isAccountSetup, setisAccountSetup] = useState(current_account?.is_facebook_connected);

 return(<>
 
 {!isAccountSetup &&  <Modal
    title={<span className='modal-header'><MyIcon type={'integrations'} style={{marginRight:"5px"}}/>Integrations</span>} 
    visible={isVisible}
    onCancel={onClose}
    footer={null}
    width={600}
    centered
  >
   <AccountSetupComponent/>
  </Modal>}
</>

 )}

export default IntegrationsModal;

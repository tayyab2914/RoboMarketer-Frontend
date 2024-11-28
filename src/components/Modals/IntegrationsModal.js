// import React, { useEffect, useState } from "react";
// import { Modal, Spin } from "antd";
// import "./styles/ModalStyles.css";
// import MyIcon from "../Icon/MyIcon";
// import AccountSetupComponent from "../../pages/Dashboard/ChatPanel/AccountSetupComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { API_DISCONNECT_FACEBOOK } from "../../apis/FacebookInsightsApis";
// import { FacebookFilled } from "@ant-design/icons";
// import { setRerenderDashboard } from "../../redux/AuthToken/Action";
// import FacebookIntegration from "../../pages/Dashboard/FacebookIntegration";

// const IntegrationsModal = ({ isVisible, onClose }) => {
//   const [showSpinner, setShowSpinner] = useState(false);
//   const dispatch = useDispatch();
//   const {
//     isLoggedIn,
//     token,
//     rerender_dashboard,
//     rerender_chat_panel,
//     current_account,
//     facebook_state
//   } = useSelector((state) => state.authToken);

//   const disconnectFacebook = async () => {
//     const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
//     dispatch(setRerenderDashboard(!rerender_dashboard));

//     onClose();
//   };
//   useEffect(()=>{},[rerender_dashboard])
//   console.log(current_account)
// console.log(facebook_state,current_account?.is_facebook_connected)
//   return (
//     <>
//         <Modal
//           title={false}
//           centered
//           visible={isVisible}
//           onCancel={onClose}
//           closable={false}
//           footer={null}
//           width={700}
//         >{
//             !facebook_state && current_account?.is_facebook_connected ? <>
//              <div className="custom-modal-header">
//             <span className="modal-header">
//               {" "}
//               <MyIcon
//                 type="integrations"
//                 style={{ marginRight: "5px" }}
//                 size="md"
//               />{" "}
//               Integrations
//             </span>
//             <span>
//               <MyIcon
//                 type={"close_icon"}
//                 onClick={onClose}
//                 size="lg"
//                 className="close-icon"
//               />
//             </span>
//           </div>

//           <div className="custom-modal-content modal-content">
//             <p className="fb-integration-modal-description">
//               Facebook Integration
//             </p>
//             <div className="fb-integration-modal-info">
//               <span className="fb-integration-modal-name">
//                 {" "}
//                 <MyIcon type={"facebook"} size="md" />
//                 {current_account?.name}{" "}
//               </span>
//               <span className="fb-integration-modal-btn">
//                 <button onClick={disconnectFacebook}>
//                   {" "}
//                   <MyIcon type={"cross_red"} />
//                   Disconnect
//                 </button>
//               </span>
//             </div>
//           </div></>:
//           <FacebookIntegration isInIntegrationComponent={true} onClose={onClose}/>

//         }
//         </Modal>
//     </>
//   );
// };

// export default IntegrationsModal;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_DISCONNECT_FACEBOOK } from "../../apis/FacebookInsightsApis";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";
import { Modal } from "antd";
import MyIcon from "../Icon/MyIcon";
import FacebookIntegration from "../../pages/Dashboard/FacebookIntegration";
import FacebookIntegrationSelectAccount from "../../pages/Dashboard/FacebookIntegrationSelectAccount";

const IntegrationsModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, token, rerender_dashboard, rerender_chat_panel, current_account, facebook_state, } = useSelector((state) => state.authToken);


  console.log('IntegrationsModal',current_account?.is_facebook_connected , facebook_state)
  const disconnectFacebook = async () => {
    const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));
    onClose();
  };

  return (
    <Modal title={false} centered visible={isVisible} onCancel={onClose} closable={false} footer={null} width={700} >
      {current_account?.is_facebook_connected && !facebook_state && (
       <>
         <div className="custom-modal-header">
         <span className="modal-header">
           <MyIcon type="integrations" style={{ marginRight: "5px" }} size="md" /> 
           Integrations
         </span>
         <span>
           <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
         </span>
       </div>
        <div className="custom-modal-content modal-content">
          <p className="fb-integration-modal-description"> Facebook Integration </p>
          <div className="fb-integration-modal-info">
            <span className="fb-integration-modal-name">
               <MyIcon type={"facebook"} size="md" /> {current_account?.name}{" "}
            </span>
            <span className="fb-integration-modal-btn">
              <button onClick={disconnectFacebook}>
                 <MyIcon type={"cross_red"} /> Disconnect </button>
            </span>
          </div>
        </div></>

      )}
       {current_account?.is_facebook_connected && facebook_state && <><FacebookIntegrationSelectAccount isInIntegrationComponent={true} onClose={onClose}/></>}
       {!current_account?.is_facebook_connected && !facebook_state && <><FacebookIntegration isInIntegrationComponent={true} onClose={onClose}/></>}
    </Modal>
  );
};

export default IntegrationsModal;

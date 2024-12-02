

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_DISCONNECT_FACEBOOK, API_FETCH_TOKEN } from "../../apis/FacebookInsightsApis";
import { setFacebookCode, setFacebookState, setisIntegrationsModalClosedByUser, setRerenderDashboard } from "../../redux/AuthToken/Action";
import { Modal } from "antd";
import MyIcon from "../Icon/MyIcon";
import FacebookIntegration from "../../pages/Dashboard/FacebookIntegration";
import FacebookIntegrationSelectAccount from "../../pages/Dashboard/FacebookIntegrationSelectAccount";
import { useNavigate } from "react-router-dom";

const IntegrationsModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [AccountList, setAccountList] = useState(null);
  const { isLoggedIn, token, rerender_dashboard,facebook_code, rerender_chat_panel, current_account, facebook_state, } = useSelector((state) => state.authToken);

const disconnectFacebook = async () => {
    const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));
    setAccountList(null);
    onClose();
  };

  const cancelhandler = ()=>{
    dispatch(setisIntegrationsModalClosedByUser(true))
    onClose()
  }

   useEffect(() => {
      const fetchToken = async () => {
        const urlObj = new URL(window.location.href);
        const code = urlObj.searchParams.get("code");
        const decodedRedirectResponse = decodeURIComponent(window.location.href);
        if(code)
        {
            dispatch(setFacebookCode(decodedRedirectResponse))
            setShowSpinner(true)
            const response = await API_FETCH_TOKEN( token, decodedRedirectResponse, facebook_state, setShowSpinner );
            setAccountList(response?.account_list);
            setShowSpinner(false)
            if(!response)
            {

                const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
                dispatch(setRerenderDashboard(!rerender_dashboard));
                dispatch(setFacebookState(null))
                setAccountList(null);
            }
            navigate('/')
        }
        else
        {
            setAccountList(null);
            if(!current_account?.facebook_account_id){
                const response = await API_DISCONNECT_FACEBOOK(token, setShowSpinner);
                dispatch(setRerenderDashboard(!rerender_dashboard));
                dispatch(setFacebookState(null))
            }
        }
        
      };
        fetchToken();
    }, []);

  return (
    <Modal title={false} centered visible={isVisible} onCancel={cancelhandler} closable={false} footer={null} width={550} >
      {(current_account?.is_facebook_connected && current_account?.facebook_account_id)  && (
       <>
         <div className="custom-modal-header">
         <span className="modal-header">
           <MyIcon type="integrations_inner" style={{ marginRight: "5px" }} size="md" /> 
           Integrations
         </span>
         <span>
           <MyIcon type={"close_icon"} onClick={cancelhandler} size="lg" className="close-icon" />
         </span>
       </div>
        <div className="custom-modal-content modal-content">
          <p className="fb-integration-modal-description"> Facebook Integration </p>
          <div className="fb-integration-modal-info">
            <span className="fb-integration-modal-name">
               <MyIcon type={"facebook"} size="md" /> {current_account?.facebook_account_name}{" "}
            </span>
            <span className="fb-integration-modal-btn">
              <button onClick={disconnectFacebook}>
                 <MyIcon type={"cross_red"} /> Disconnect </button>
            </span>
            
          </div>
        </div></>
      )}
        {!current_account?.is_facebook_connected && !AccountList && <><FacebookIntegration isInIntegrationComponent={true} onClose={cancelhandler} showSpinner={showSpinner}/></>}
       { AccountList && <><FacebookIntegrationSelectAccount isInIntegrationComponent={true} onClose={cancelhandler} AccountList={AccountList} setAccountList={setAccountList}/></>}
       
    </Modal>
  );
};

export default IntegrationsModal;

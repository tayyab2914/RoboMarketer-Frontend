import { Col, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import "./styles/AccountSetupComponent.css";
import "./styles/DashboardChatPanel.css";
import {
  API_FETCH_TOKEN,
  API_GENERATE_AUTH_URL,
  API_GET_HISTORICAL_DATA,
  API_SELECT_ACCOUNT,
} from "../../../apis/FacebookInsightsApis";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentAccount, setFacebookState, setRerenderDashboard, setRerenderRightPanel } from "../../../redux/AuthToken/Action";
import { FRONTEND_DOMAIN_NAME } from "../../../utils/GlobalSettings";
import MyButton from "../../../components/Button/Button";
import FacebookIntegration from "../FacebookIntegration";
const AccountSetupComponent = ({ isVisible, onClose,isInIntegrationComponent }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const { isLoggedIn, token, current_account,rerender_right_panel, facebook_state, rerender_dashboard } = useSelector(
      (state) => state.authToken
    );
    const [CodeExtracted, setCodeExtracted] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null); // New state to hold selected account
    const [AccountList, setAccountList] = useState(null);
    const dispatch = useDispatch();
    
  
    useEffect(() => {
      const fetchToken = async () => {
        const urlObj = new URL(window.location.href);
        const code = urlObj.searchParams.get("code");
  
        if (code && !CodeExtracted) {
          const decodedRedirectResponse = decodeURIComponent(window.location.href);
          const response = await API_FETCH_TOKEN( token, decodedRedirectResponse, facebook_state, setShowSpinner );
          setAccountList(response?.account_list);
          setCodeExtracted(true);
        }
        else{
          setAccountList(null);
        }
      };
  
      fetchToken();
    }, [token, facebook_state]);
  
    const handleAccountClick = async () => {
      if (selectedAccount) {
        const response = await API_SELECT_ACCOUNT(token, selectedAccount.account_id,selectedAccount.name, setShowSpinner);
        
        if (response) {
            console.log("handleAccountClicresponsek")
            dispatch(setFacebookState(null))
          dispatch(setRerenderDashboard(!rerender_dashboard));
          dispatch(setRerenderRightPanel(!rerender_right_panel));
          dispatch(setCurrentAccount((prevState) => ({
            ...prevState,
            is_facebook_connected: false,
          })));
          
          await API_GET_HISTORICAL_DATA(token, setShowSpinner);
          
          if(isInIntegrationComponent)
          {
            onClose();
          }
        }
      }
    };
  
    const columns = [
      {
        title: "Account Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Account ID",
        dataIndex: "account_id",
        key: "account_id",
      },
    ];
  
    const rowSelection = {
      type: "radio", 
      selectedRowKeys,
      onChange: (selectedKeys, selectedRows) => {
        setSelectedRowKeys(selectedKeys); 
        setSelectedAccount(selectedRows[0]); 
      },
    };
  
    return (
       <>
       {!current_account?.is_facebook_connected && <>
        {isInIntegrationComponent && <div className="custom-modal-header">
          <span className="modal-header">Account Setup</span>
          <span>
            <MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>}
  
        <div className="custom-modal-content modal-content">
          <Row style={{ width: "100%" }}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              style={{ display: "flex", width: "100%" }}
            >
              {!isInIntegrationComponent &&<span className="robot-icon-wrapper">
                <MyIcon type={"robot"} className={"response-icon"} size="md" />
              </span>}
              <div className="account-setup-component-content">
                {AccountList ? (
                  <>
                    <p className="account-setup-component-title">
                      <MyIcon type={"account_setup"} size="md" /> Select Facebook Ad Account
                    </p>
                    <span>
                      <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={AccountList.map((item) => ({
                          key: item.account_id,
                          name: item.name,
                          account_id: item.account_id,
                        }))}
                        pagination={false}
                        className="account-selection-table"
                      />
                    </span>
                    <span className="account-selection-submit-btn-wrapper">
                      <MyButton
                        type='filled'
                        className={'account-selection-submit-btn'}
                        onClick={handleAccountClick}
                        text={"Connect"}
                      />
                      <MyButton
                        type="outlined"
                        className={"account-selection-cancel-btn"}
                        onClick={onClose}
                        text={"Cancel"}
                      />
                    </span>
                  </>
                ) : (
                  <>
                  { !isInIntegrationComponent &&  <p className="account-setup-component-title">
                      <MyIcon type={"account_setup"} size="md" /> Account Setup
                    </p>}
                   <FacebookIntegration />
                  </>
                )}
              </div>
            </Col>
          </Row>
        </div></>}
        </>
    );
  };
  
  export default AccountSetupComponent;
  
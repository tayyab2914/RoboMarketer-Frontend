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
import { setCurrentAccount, setFacebookState, setRerenderDashboard } from "../../../redux/AuthToken/Action";
import { FRONTEND_DOMAIN_NAME } from "../../../utils/GlobalSettings";
import MyButton from "../../../components/Button/Button";
const AccountSetupComponent = ({ isVisible, onClose,isInIntegrationComponent }) => {
    const [showSpinner, setShowSpinner] = useState(false);
    const { isLoggedIn, token, current_account, facebook_state, rerender_dashboard } = useSelector(
      (state) => state.authToken
    );
    const [CodeExtracted, setCodeExtracted] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null); // New state to hold selected account
    const [AccountList, setAccountList] = useState(null);
    const dispatch = useDispatch();
    
    const connectFbHandler = async () => {
      const response = await API_GENERATE_AUTH_URL(token, setShowSpinner);
      if (response) {
        dispatch(setFacebookState(response?.state));
        window.location.href = response?.authorization_url;
      }
    };
  
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
            dispatch(setFacebookState(null))
          dispatch(setRerenderDashboard(!rerender_dashboard));
          dispatch(setCurrentAccount((prevState) => ({
            ...prevState,
            is_facebook_connected: false,
          })));
          
           API_GET_HISTORICAL_DATA(token, setShowSpinner);
          dispatch(setRerenderDashboard(!rerender_dashboard));
          onClose();
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
      type: "radio", // Change type to 'radio' for single selection
      selectedRowKeys,
      onChange: (selectedKeys, selectedRows) => {
        setSelectedRowKeys(selectedKeys); // Update selected row
        setSelectedAccount(selectedRows[0]); // Store selected account info (both ID and Name)
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
                    <p className="account-setup-component-title">
                      <MyIcon type={"account_setup"} size="md" /> Account Setup
                    </p>
                    <div className="account-setup-component-description">
                      <p>Let's get your account setup by integrating your accounts</p>
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
                          Connect Facebook
                        </button>
                      </div>
                      <p className="account-setup-component-help">
                        If you have any questions or need help, please just type a question below. Thanks!
                      </p>
                    </div>
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
  
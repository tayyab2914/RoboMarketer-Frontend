import React, { useEffect, useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import {
  API_DISCONNECT_FACEBOOK,
  API_FETCH_TOKEN,
  API_GENERATE_AUTH_URL,
  API_GET_HISTORICAL_DATA,
  API_SELECT_ACCOUNT,
} from "../../apis/FacebookInsightsApis";
import {
  setFacebookState,
  setRerenderDashboard,
} from "../../redux/AuthToken/Action";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, Row, Spin, Table } from "antd";
import MyButton from "../../components/Button/Button";

const FacebookIntegrationSelectAccount = ({
  isInIntegrationComponent,
  onClose,
  AccountList,
  setAccountList,
}) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const dispatch = useDispatch();
  // const [AccountList, setAccountList] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showSetAccountModal, setshowSetAccountModal] = useState(
    !isInIntegrationComponent
  );
  const {
    isLoggedIn,
    token,
    current_account,
    rerender_right_panel,
    facebook_state,
    rerender_dashboard,
  } = useSelector((state) => state.authToken);
  const columns = [
    { title: "Account Name", dataIndex: "name", key: "name" },
    { title: "Account ID", dataIndex: "account_id", key: "account_id" },
  ];
  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      setSelectedRowKeys(selectedKeys);
      setSelectedAccount(selectedRows[0]);
    },
  };


  const handleAccountClick = async () => {
    if (selectedAccount) {
      const response = await API_SELECT_ACCOUNT(
        token,
        selectedAccount.account_id,
        selectedAccount.name,
        setShowSpinner
      );
      dispatch(setRerenderDashboard(!rerender_dashboard));
      setTimeout(() => {
        dispatch(setRerenderDashboard(!rerender_dashboard));
      }, 2000);
      if (response) {
        setAccountList(null);
        dispatch(setFacebookState(null));
        dispatch(setRerenderDashboard(!rerender_dashboard));
        if (isInIntegrationComponent) {
            onClose();
          }
        await API_GET_HISTORICAL_DATA(token, setShowSpinner);
        dispatch(setRerenderDashboard(!rerender_dashboard));

      }
    }
  };

  const INNER_CONTENT = () => (
    <>
      <Row style={{ width: "100%" }}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{ display: "flex", width: "100%" }}
        >
          {!isInIntegrationComponent && (
            <span className="robot-icon-wrapper">
              <MyIcon type={"robot"} className={"response-icon"} size="md" />
            </span>
          )}
          <div className="account-setup-component-content">
            {AccountList ? (
              <>
                <p className="account-setup-component-title" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  {" "}
                 <span style={{display:"flex",alignItems:"center"}}>
                 <MyIcon type={"account_setup"} size="md" /> Select Facebook Ad
                 Account{" "}
                 </span>

                  <MyIcon
              type={"close_icon"}
              onClick={onClose}
              size="lg"
              className="close-icon"
            />
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
                    type="filled"
                    className={"account-selection-submit-btn"}
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
              <div
                style={{
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      {<INNER_CONTENT />}
    </>
  );
};

export default FacebookIntegrationSelectAccount;

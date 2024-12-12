import { Col, Row, Drawer, Spin } from "antd";
import React, { useEffect, useState } from "react";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import useWindowWidth from "../../hooks/useWindowWidth";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/DashboardMain.css";
import DashboardChatPanel from "./ChatPanel/DashboardChatPanel";
import { API_GET_ACCOUNTS, API_SWITCH_ACCOUNT, API_TEST_TOKEN } from "../../apis/AuthApis";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthToken,
  setCurrentAccount,
  setRerenderChatPanel,
  setRerenderDashboard,
} from "../../redux/AuthToken/Action";
import { useLogoutUser } from "../../hooks/useLogoutUser";
const DashboardMain = () => {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const { isLoggedIn, token, rerender_dashboard, rerender_chat_panel,current_account,open_integrations_modal,is_integrations_modal_closed_by_user } =
    useSelector((state) => state.authToken);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [Accounts, setAccounts] = useState([]);
  const logoutUser = useLogoutUser();
  const [DashboardRerenderer, setDashboardRerenderer] = useState("");
  const [isLeftDrawerVisible, setIsLeftDrawerVisible] = useState(false);
  const [isRightDrawerVisible, setIsRightDrawerVisible] = useState(false);

  const showLeftDrawer = () => setIsLeftDrawerVisible(true);
  const closeLeftDrawer = () => setIsLeftDrawerVisible(false);
  const showRightDrawer = () => setIsRightDrawerVisible(true);
  const closeRightDrawer = () => setIsRightDrawerVisible(false);

  const getAccounts = async () => {
    const response = await API_GET_ACCOUNTS(token, setShowSpinner);
    dispatch(
      setCurrentAccount(
        response?.find((account) => account?.is_current_account)
      )
    );
    console.log(response)
    setAccounts(response);
    // dispatch(setRerenderDashboard(!rerender_dashboard));
  };
  useEffect(() => {
    if (open_integrations_modal && !is_integrations_modal_closed_by_user==undefined || !is_integrations_modal_closed_by_user) {
      setIsLeftDrawerVisible(true) 
    }
  }, [open_integrations_modal,rerender_dashboard]);
  
  const SwitchAccount = async (id) => {
    const response = await API_SWITCH_ACCOUNT(token, id, setShowSpinner);

    dispatch(setAuthToken(response));
    dispatch(setRerenderDashboard(!rerender_dashboard));
    dispatch(setRerenderChatPanel(!rerender_chat_panel));
  };
  const testToken = async()=>{
    const response = await API_TEST_TOKEN(token)
    if(!response)
    {
        logoutUser()
    }
}
  useEffect(() => {
    getAccounts();
    testToken()

  }, [rerender_dashboard]);

  useEffect(()=>{
    getAccounts()
  },[current_account?.is_facebook_connected])
  useEffect(() => {
    let intervalId;

    if (current_account?.historical_data_progress === "In Progress") {
      intervalId = setInterval(() => {
        getAccounts();
      }, 5000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [current_account, getAccounts]);

  return (
    <div>
      {ShowSpinner && <Spin fullscreen />}
      <Row style={{ width: "100vw" }}>
        {windowWidth > 1200 && (
          <Col
            style={{
              width: "310px",
              flex: "0 0 310px",
              zIndex: "3000 !important",
            }}
          >
            <DashboardLeftPanel
              Accounts={Accounts}
              SwitchAccount={SwitchAccount}
            />
          </Col>
        )}

        <Col
          style={{
            width: windowWidth > 1200 ? "calc(100vw - 620px)" : "100vw",
          }}
        >
          {windowWidth < 1200 && (
            <div className="dashboard-main-drawer-enabler-row">
              <button
                onClick={showLeftDrawer}
                className="dashboard-main-drawer-enabler-btn-1"
              >
                <MyIcon type={"settings"} /> Settings
              </button>
              <button
                onClick={showRightDrawer}
                className="dashboard-main-drawer-enabler-btn-2"
              >
                <MyIcon type={"reporting"} /> Reporting
              </button>
            </div>
          )}
          <DashboardChatPanel />
        </Col>

        {windowWidth > 1200 && (
          <Col
            style={{
              width: "310px",
              flex: "0 0 310px",
              //   zIndex:'900 !important'
            }}
          >
            <DashboardRightPanel />
          </Col>
        )}
      </Row>

      {windowWidth < 1200 && (
        <Drawer
          headerStyle={{ display: "none" }}
          placement="left"
          onClose={closeLeftDrawer}
          visible={isLeftDrawerVisible}
          width={300}
          bodyStyle={{ padding: 0 }}
        >
          <DashboardLeftPanel
            Accounts={Accounts}
            SwitchAccount={SwitchAccount}
          />
        </Drawer>
      )}

      {windowWidth < 1200 && (
        <Drawer
          headerStyle={{ display: "none" }}
          placement="right"
          onClose={closeRightDrawer}
          visible={isRightDrawerVisible}
          width={300}
          bodyStyle={{ padding: 0 }}
        >
          <DashboardRightPanel />
        </Drawer>
      )}
    </div>
  );
};

export default DashboardMain;

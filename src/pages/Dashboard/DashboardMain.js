import { Col, Row, Drawer, Spin } from "antd";
import React, { useEffect, useState } from "react";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import useWindowWidth from "../../hooks/useWindowWidth"; 
import MyIcon from "../../components/Icon/MyIcon";
import './styles/DashboardMain.css'
import DashboardChatPanel from "./ChatPanel/DashboardChatPanel";
import { API_GET_ACCOUNTS, API_SWITCH_ACCOUNT } from "../../apis/AuthApis";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, setCurrentAccount, setRerenderDashboard } from "../../redux/AuthToken/Action";
const DashboardMain = () => {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch()
  const { isLoggedIn, token,rerender_dashboard } = useSelector((state) => state.authToken);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [Accounts, setAccounts] = useState([]);
const [DashboardRerenderer, setDashboardRerenderer] = useState('');
  const [isLeftDrawerVisible, setIsLeftDrawerVisible] = useState(false);
  const [isRightDrawerVisible, setIsRightDrawerVisible] = useState(false);

  const showLeftDrawer = () => setIsLeftDrawerVisible(true);
  const closeLeftDrawer = () => setIsLeftDrawerVisible(false);
  const showRightDrawer = () => setIsRightDrawerVisible(true);
  const closeRightDrawer = () => setIsRightDrawerVisible(false);

  const getAccounts =async()=>{
    const response = await API_GET_ACCOUNTS(token,setShowSpinner)
    
    dispatch(setCurrentAccount(response?.find((account) => account?.is_current_account)))
    setAccounts(response)
  }
  const SwitchAccount = async (id) => {
      const response = await API_SWITCH_ACCOUNT(token, id, setShowSpinner);
      
      dispatch(setAuthToken(response));
      dispatch(setRerenderDashboard(!rerender_dashboard))
  };
  useEffect(()=>{
    getAccounts()
    console.log("DASHBOARD RERENDERED")
  },[rerender_dashboard])
//   useEffect(()=>{},[Accounts])
//   useEffect(()=>{ getAccounts() },[])

  return (
    <div>
        {ShowSpinner && <Spin fullscreen/>}
      <Row>
        <Col xs={0}  xl={5}>
          <DashboardLeftPanel Accounts={Accounts} SwitchAccount={SwitchAccount}/>
        </Col>
        <Col xs={24}  xl={14}>
            {windowWidth < 1200 && <Row className="dashboard-main-drawer-enabler-row">
                <Col xs={12}><button onClick={showLeftDrawer} className="dashboard-main-drawer-enabler-btn-1"><MyIcon type={'settings'}/> Settings</button></Col>
                <Col xs={12}><button onClick={showRightDrawer} className="dashboard-main-drawer-enabler-btn-2"><MyIcon type={'reporting'}/> Reporting</button></Col>
            </Row>}
            <DashboardChatPanel />
        </Col>
        <Col xs={0}  xl={5}>
          <DashboardRightPanel />
        </Col>
      </Row>

      {windowWidth < 1200 && (
        <Drawer headerStyle={{ display: "none" }} placement="left" onClose={closeLeftDrawer} visible={isLeftDrawerVisible} width={300}  bodyStyle={{ padding: 0 }} >
          <DashboardLeftPanel />
        </Drawer>
      )}

      {windowWidth < 1200 && (
        <Drawer headerStyle={{ display: "none" }} placement="right" onClose={closeRightDrawer} visible={isRightDrawerVisible} width={300} bodyStyle={{ padding: 0 }} >
          <DashboardRightPanel />
        </Drawer>
      )}

      
    </div>
  );
};

export default DashboardMain;

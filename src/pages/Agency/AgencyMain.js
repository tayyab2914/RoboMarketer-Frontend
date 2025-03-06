import { Col, Row, Drawer, Spin } from "antd";
import React, { useEffect, useState } from "react";
import useWindowWidth from "../../hooks/useWindowWidth";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AgencyMain.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, setCurrentAccount, setRerenderChatPanel, setRerenderDashboard } from "../../redux/AuthToken/Action";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import AgencyLeftPanel from "./AgencyLeftPanel";
import AgencyWorkArea from "./AgencyWorkArea";
import { API_TEST_TOKEN } from "../../apis/AuthApis";
import AgencyProfile from "./AgencyProfile";
import AgencyWhitelabel from "./AgencyWhitelabel";
import AgencySupport from "./Support/AgencySupport";
import AgencyTrainingOS from "./TrainingOS/AgencyTrainingOS";
import { useParams } from "react-router-dom";

const AgencyMain = () => {
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();
  const { token, rerender_dashboard, rerender_chat_panel,current_account,open_integrations_modal,is_integrations_modal_closed_by_user } = useSelector((state) => state.authToken);
  const logoutUser = useLogoutUser();
  const [isLeftDrawerVisible, setIsLeftDrawerVisible] = useState(false);
  const showLeftDrawer = () => setIsLeftDrawerVisible(true);
  const closeLeftDrawer = () => setIsLeftDrawerVisible(false);
  const { page } = useParams(); // Get the dynamic 'page' param from the route
  const [CurrentMode, setCurrentMode] = useState(0);



  useEffect(() => {
    if (open_integrations_modal && !is_integrations_modal_closed_by_user==undefined || !is_integrations_modal_closed_by_user) { setIsLeftDrawerVisible(true)  }
  }, [open_integrations_modal,rerender_dashboard]);
  

  const testToken = async()=>{
    const response = await API_TEST_TOKEN(token)
    if(!response){
        logoutUser()
    }
  }
  useEffect(() => {
    switch (page) {
      case "support":
        setCurrentMode(3);
        break;
      case "profile":
        setCurrentMode(1);
        break;
      case "whitelabel":
        setCurrentMode(2);
        break;
      case "training":
        setCurrentMode(4);
        break;
      default:
        setCurrentMode(0); // Default to WorkArea
    }
  }, [page]);
  useEffect(() => {
    testToken()
  }, [rerender_dashboard]);

  return (
    <div>
      <Row style={{ width: "100vw" }}>
        {windowWidth > 1200 && (
          <Col style={{ width: "310px", flex: "0 0 310px", zIndex: "3000 !important", }} >
            <AgencyLeftPanel  setCurrentMode={setCurrentMode}/>
          </Col>
        )}

        <Col style={{ width: windowWidth > 1200 ? "calc(100vw - 310px)" : "100vw", }} >
          {windowWidth < 1200 && (
            <div className="agency-main-drawer-enabler-row">
              <button onClick={showLeftDrawer} className="agency-main-drawer-enabler-btn" > <MyIcon type={"settings"} /> Settings </button>
            </div>
          )}
          {CurrentMode == 0 &&<AgencyWorkArea />}
          {CurrentMode == 1 &&<AgencyProfile />}
          {CurrentMode == 2 &&<AgencyWhitelabel />}
          {CurrentMode == 3 &&<AgencySupport />}
          {CurrentMode == 4 &&<AgencyTrainingOS />}
        </Col>

      </Row>

      {windowWidth < 1200 && (
        <Drawer headerStyle={{ display: "none" }} placement="left" onClose={closeLeftDrawer} visible={isLeftDrawerVisible} width={300} bodyStyle={{ padding: 0 }} >
            <AgencyLeftPanel  setCurrentMode={setCurrentMode}/>
        </Drawer>
      )}

    </div>
  );
};

export default AgencyMain;

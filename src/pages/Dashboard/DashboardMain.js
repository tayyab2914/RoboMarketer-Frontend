import { Col, Row, Drawer } from "antd";
import React, { useState } from "react";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import useWindowWidth from "../../hooks/useWindowWidth"; // Assuming you have this custom hook
import MyIcon from "../../components/Icon/MyIcon";
import './styles/DashboardMain.css'
import DashboardChatPanel from "./ChatPanel/DashboardChatPanel";
const DashboardMain = () => {
  const windowWidth = useWindowWidth();

  const [isLeftDrawerVisible, setIsLeftDrawerVisible] = useState(false);
  const [isRightDrawerVisible, setIsRightDrawerVisible] = useState(false);

  // Toggle drawers visibility
  const showLeftDrawer = () => setIsLeftDrawerVisible(true);
  const closeLeftDrawer = () => setIsLeftDrawerVisible(false);
  const showRightDrawer = () => setIsRightDrawerVisible(true);
  const closeRightDrawer = () => setIsRightDrawerVisible(false);

  return (
    <div>
      <Row>
        <Col xs={0} xl={5}>
          <DashboardLeftPanel />
        </Col>
        <Col xs={24} xl={14}>
            {windowWidth < 1200 && <Row className="dashboard-main-drawer-enabler-row">
                <Col xs={12}><button onClick={showLeftDrawer} className="dashboard-main-drawer-enabler-btn-1"><MyIcon type={'settings'}/> Settings</button></Col>
                <Col xs={12}><button onClick={showRightDrawer} className="dashboard-main-drawer-enabler-btn-2"><MyIcon type={'reporting'}/> Reporting</button></Col>
            </Row>}
            <DashboardChatPanel />
        </Col>
        <Col xs={0} xl={5}>
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

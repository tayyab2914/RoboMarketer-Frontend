import { Col, Row, Input, Button, Drawer } from "antd";
import React, { useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import { SearchOutlined } from "@ant-design/icons";
import "./styles/AdminMainPanel.css";
import MyButton from "../../components/Button/Button";
import AdminMainTable from "./AdminMainTable";
import useWindowWidth from "../../hooks/useWindowWidth";
import AdminLeftPanel from "./AdminLeftPanel";

const AdminMainPanel = () => {
  const windowWidth = useWindowWidth();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  // Toggle drawer visibility
  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const HEADER_DATA = () => {
    return (
      <div className="header-data">
        <Input
          placeholder="Search"
          className="admin-main-panel-search-bar"
          prefix={<SearchOutlined style={{marginRight:"10px"}} />}
          size="large"
          onChange={(e) => console.log(e.target.value)}
        />
        <MyButton
          text={
            <span className="admin-panel-sign-up-link">
              <MyIcon type={"sign_up_link"} size="xs" /> Create One-Time Signup
              Link
            </span>
          }
          className="generate-one-time-link-btn"
        />
      </div>
    );
  };

  return (
    <div>
      <Row className="admin-main-panel-header">
        <Col xs={6}>
          <p className="admin-main-panel-header-text">
            <MyIcon type={"users_two"} size="md" /> Users
          </p>
        </Col>
        <Col xs={18} className="admin-main-panel-search">
          {windowWidth >= 992 && <HEADER_DATA />}
          {windowWidth < 1200 && (
            <span className="admin-main-panel-hamburger" onClick={showDrawer}>
              <MyIcon type={"hamburger"} size="lg" />
            </span>
          )}
        </Col>

        {windowWidth < 992 && (
          <Col xs={24} className="admin-main-panel-search-under-lg">
            <HEADER_DATA />
          </Col>
        )}
      </Row>

      <Row>
        <Col xs={24} className="admin-main-panel-table">
          <AdminMainTable />
        </Col>
      </Row>

      {/* Drawer Component for AdminLeftPanel */}
      <Drawer
        headerStyle={{ display: "none" }}
        placement="left"
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width={300} // Adjust width as needed
        bodyStyle={{ padding: 0 }}
      >
        <AdminLeftPanel />
      </Drawer>
    </div>
  );
};

export default AdminMainPanel;

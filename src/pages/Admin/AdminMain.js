import { Col, Row } from "antd";
import React from "react";
import AdminLeftPanel from "./AdminLeftPanel";
import AdminMainPanel from "./AdminMainPanel";
import useWindowWidth from "../../hooks/useWindowWidth";
import "./styles/AdminMainPanel.css";

const AdminMain = () => {
  const windowWidth = useWindowWidth();

  return (
    <Row style={{ width: "100vw" }}>
      {windowWidth > 1200 && (
        <Col
          style={{
            width: "260px",
            flex: "0 0 260px", 
          }}
        >
          <AdminLeftPanel />
        </Col>
      )}
      <Col
        style={{
          width: windowWidth > 1200 ? "calc(100vw - 260px)" : "100vw",
        }}
      >
        <AdminMainPanel />
      </Col>
    </Row>
  );
};

export default AdminMain;

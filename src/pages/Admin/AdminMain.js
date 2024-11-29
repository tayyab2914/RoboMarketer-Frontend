import { Col, Row } from "antd";
import React, { useEffect } from "react";
import AdminLeftPanel from "./AdminLeftPanel";
import AdminMainPanel from "./AdminMainPanel";
import useWindowWidth from "../../hooks/useWindowWidth";
import "./styles/AdminMainPanel.css";
import { API_TEST_TOKEN } from "../../apis/AuthApis";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import { useSelector } from "react-redux";


const AdminMain = () => {
  const windowWidth = useWindowWidth();
  const {
    isLoggedIn,
    token,
    rerender_dashboard,
    rerender_chat_panel,
    current_account,
  } = useSelector((state) => state.authToken);
  const logoutUser = useLogoutUser();
  const testToken = async () => {
    const response = await API_TEST_TOKEN(token);
    console.log('API_TEST_TOKEN',response)
    if (!response) {
      logoutUser();
    }
  };
  useEffect(() => {
    testToken();
  }, []);

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

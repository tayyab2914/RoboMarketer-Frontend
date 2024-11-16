import { Col, Row } from "antd";
import React from "react";
import AdminLeftPanel from "./AdminLeftPanel";
import AdminMainPanel from "./AdminMainPanel";
import useWindowWidth from "../../hooks/useWindowWidth";
import './styles/AdminMainPanel.css'

const AdminMain = () => {
    const windowWidth = useWindowWidth();

    return (
        <Row style={{width:"100%"}}>

            <Col xs={0} xl={5}>
            <AdminLeftPanel />
            </Col>
            <Col xs={24} xl={19} >
            <AdminMainPanel />
            </Col>
        </Row>
    );
};

export default AdminMain;

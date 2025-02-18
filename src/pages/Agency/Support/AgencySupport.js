import { Col, Row } from "antd";
import React from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import '../styles/AgencySupport.css'
import SupportContainers from "./SupportContainers";

const AgencySupport = () => {
  return (
    <div>
      <Row>
        <Col xs={24}>
          <Row className="awa-heading-main">
            <Col xs={24} md={5}>
              <span className="awa-heading">
                <MyIcon type={"support"} /> Support
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs={24} xl={12}>
            <SupportContainers title={"General Questions"} icon={"support_general_questions"} description={"Ask Any General Questions About RoboMarketer Account, Billing, Etc"}/>
            <SupportContainers title={"Bugs"} icon={"support_bugs"} description={"Report Bugs Of Other Technical Issues With RoboMarketer"}/>
            <SupportContainers title={"Feature Requests"} icon={"support_feature_request"} description={"Request New Features That You Would Like Us To Add To RoboMarketer"}/>
        </Col>
      </Row>
    </div>
  );
};

export default AgencySupport;

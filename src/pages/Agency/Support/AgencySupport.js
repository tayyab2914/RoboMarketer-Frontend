import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import '../styles/AgencySupport.css'
import SupportContainers from "./SupportContainers";
import InfoContainer from "./InfoContainer";
import { useSearchParams } from "react-router-dom";

const AgencySupport = () => {
const [CurrentMode, setCurrentMode] = useState(0);

  return (
    <div>
      <Row>
        <Col xs={24}>
          <Row className="awa-heading-main">
            <Col xs={24}>
              <span className="awa-heading support-heading">
                <span onClick={()=>setCurrentMode(0)} className="support-icon-btn"><MyIcon type={"support"} /> Support</span>
                <span className="support-btn-group">
                    <button onClick={()=>setCurrentMode(1)}>Data Protection Policy</button>
                    <button onClick={()=>setCurrentMode(2)}>Privacy Policy</button>
                    <button onClick={()=>setCurrentMode(3)}>Terms & Conditions</button>
                </span>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
       {CurrentMode == 0 && <Col xs={24} xl={12}>
            <SupportContainers title={"General Questions"} icon={"support_general_questions"} description={"Ask Any General Questions About RoboMarketer Account, Billing, Etc"}/>
            <SupportContainers title={"Bugs"} icon={"support_bugs"} description={"Report Bugs Of Other Technical Issues With RoboMarketer"}/>
            <SupportContainers title={"Feature Requests"} icon={"support_feature_request"} description={"Request New Features That You Would Like Us To Add To RoboMarketer"}/>
        </Col>}
        <Col xs={24}>
            {CurrentMode == 1 &&<InfoContainer dataType={"data-protection-policy"}/>}
        </Col>
        <Col xs={24}>
            {CurrentMode == 2 &&<InfoContainer dataType={"privacy-policy"}/>}
        </Col>
        <Col xs={24}>
            {CurrentMode == 3 &&<InfoContainer dataType={"terms-and-conditions"}/>}
        </Col>
      </Row>
    </div>
  );
};

export default AgencySupport;

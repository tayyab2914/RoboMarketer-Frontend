import React, { useState } from "react";
import { Col, Row } from "antd";
import MyIcon from "../../../components/Icon/MyIcon";
import "./styles/AgencyTrainingOS.css";
import TrainingOSContent from "./TrainingOSContent";
import TrainingOSModulePanel from "./TrainingOSModulePanel";

const AgencyTrainingOS = () => {
  const [ModuleID, setModuleID] = useState(1); // Default to Module 1

  return (
    <Row>
      <Col xs={24}>
        <div id="trainingos-main">
          <Row>
            <Col xs={14} className="left-panel-main">
              <div className="left-panel">
                <TrainingOSContent module_id={ModuleID} />
              </div>
            </Col>
            <Col xs={10} className="right-panel-main">
              <div className="right-panel">
                <TrainingOSModulePanel setModuleID={setModuleID} />
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

export default AgencyTrainingOS;

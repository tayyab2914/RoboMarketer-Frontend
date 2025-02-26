import { Col, Row } from "antd";
import React, { useState } from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import "./styles/AgencyTrainingOS.css";
import TrainingOSContent from "./TrainingOSContent";
import TrainingOSModulePanel from "./TrainingOSModulePanel";

const AgencyTrainingOS = () => {
  const [ModuleID, setModuleID] = useState(1); // Default to Module 1
  const [lectureID, setLectureID] = useState(1); // Default to Lesson 1

  return (
      <>
      <Row gutter={[0,0]}>
        <Col xs={24}>
          <Row className="awa-heading-main">
            <Col xs={24}>
              <span className="awa-heading">
                <MyIcon type={"trainingos"} /> Digital Fundraising OS
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs={24}>
          <div id="trainingos-main">
            <Row>
              <Col xs={14} className="left-panel-main">
                <div className="left-panel">
                  <TrainingOSContent module_id={ModuleID} lesson_id={lectureID} />
                </div>
              </Col>
              <Col xs={10} className="right-panel-main">
                <div className="right-panel">
                  <TrainingOSModulePanel setModuleID={setModuleID} setLectureID={setLectureID} />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row></>

  );
};

export default AgencyTrainingOS;

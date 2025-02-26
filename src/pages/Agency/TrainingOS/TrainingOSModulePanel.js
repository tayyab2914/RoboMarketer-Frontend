import React from "react";
import { Collapse } from "antd";
import { TRAINING_OS_CONTENT } from "./TrainingOSData";
import { ICONS } from "../../../data/IconData";
import MyIcon from "../../../components/Icon/MyIcon";

const { Panel } = Collapse;

const TrainingOSModulePanel = ({ setModuleID, setLectureID }) => {
  const handleLessonClick = (moduleId, lessonId) => {
    setModuleID(moduleId);
    setLectureID(lessonId);
  };

  return (
    <div id="trainingos-module">
      <span className="awa-heading">
        <MyIcon type={"trainingos"} /> Digital Fundraising OS
      </span>
      <div className="collapses">
        {TRAINING_OS_CONTENT.map((module) => (
          <Collapse
            key={module.module_id}
            expandIconPosition={"end"}
            expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} style={{ height: "5.5px", transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)", }} /> )}
          >
            <Panel
              header={
                <p className="panel-header">
                  <MyIcon type={"trainingos_module"} />
                  {module.module_name}
                </p>
              }
              key={module.module_id}
            >
              {module.lessons.map((lesson) => (
                <p key={lesson.lesson_id} className="trainingos-module-panel" onClick={() => handleLessonClick(module.module_id, lesson.lesson_id) } >
                  
                  <MyIcon type={"trainingos_lesson"} />{lesson.title}
                </p>
              ))}
            </Panel>
          </Collapse>
        ))}
      </div>
    </div>
  );
};

export default TrainingOSModulePanel;

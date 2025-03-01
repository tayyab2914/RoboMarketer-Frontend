import React from "react";
import { Collapse } from "antd";
import { TRAINING_OS_CONTENT } from "./TrainingOSData";
import { ICONS } from "../../../data/IconData";
import MyIcon from "../../../components/Icon/MyIcon";

const { Panel } = Collapse;

const TrainingOSModulePanel = ({ setModuleID }) => {
  const handleModuleClick = (moduleId) => {
    setModuleID(moduleId);
  };

  return (
    <div id="trainingos-module">
      <span className="awa-heading">
        <MyIcon type={"trainingos"} /> Training
      </span>
      <div className="collapses">
        {TRAINING_OS_CONTENT.map((module) => (
          <div onClick={() => handleModuleClick(module.module_id)} className="module-btn">
    
              <span><MyIcon type={"trainingos_module"} />
              {module.module_name}</span>
              <MyIcon type={'arrow_right'} style={{height:"10px"}}/>
     
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingOSModulePanel;

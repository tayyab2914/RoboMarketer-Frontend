import React from "react";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/DashboardRightPanelInfo.css";

const DashboardRightPanelInfo = ({reportingData}) => {
  return (
    <div className="right-panel-scrollable">
      {reportingData.map((item, index) => (
        <p className="reporting-single-row" key={index}>
          <span className="reporting-text">
            <MyIcon type={item.key} /> {item.label}
          </span>
          <span className={`reporting-data rd-${item.trend}`}>{item.value}</span>
        </p>
      ))}
    </div>
  );
};

export default DashboardRightPanelInfo;

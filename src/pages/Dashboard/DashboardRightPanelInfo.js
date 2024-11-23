import React from "react";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/DashboardRightPanelInfo.css";

const DashboardRightPanelInfo = ({reportingData}) => {
    console.log('reportingData',reportingData)


    const getSuffix = (label) => {
        if (["Ad Spend", "CPC", "CPM", "Return on Ad Spend"].includes(label)) {
            return "$";
        }
        if (["CTR", "Optin Rate", "Appt Rate", "Close Rate"].includes(label)) {
            return "%";
        }
        return ""; 
    };
  return (
    <div className="right-panel-scrollable">
      {reportingData.map((item, index) => (
        <p className="reporting-single-row" key={index}>
          <span className="reporting-text">
            <MyIcon type={item.key} /> {item.label}
          </span>
          <span className={`reporting-data rd-${item.trend}`}>{item.value ? item.value : 0}{getSuffix(item.label)}</span>
        </p>
      ))}
      <div style={{height:"50px"}}></div>
    </div>
  );
};

export default DashboardRightPanelInfo;

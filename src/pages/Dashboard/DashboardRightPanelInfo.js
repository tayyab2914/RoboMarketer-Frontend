import React from "react";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/DashboardRightPanelInfo.css";

const DashboardRightPanelInfo = ({reportingData}) => {

    const getSuffix = (label) => {
        if (["Return on Ad Spend"].includes(label)) {
            return "X";
        }
        if (["CTR", "Optin Rate", "Appt Rate", "Close Rate"].includes(label)) {
            return "%";
        }
        return ""; 
    };
    const getPrefix = (label)=>{
        
        if (["Ad Spend", "CPC", "CPM", "Profit","Revenue"].includes(label)) {
            return "$";
        }
        else
        {
            return ""
        }
    }
    function formatWithCommas(number) {
        // Convert the number to a string and use a regular expression to format it
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
  return (
    <div className="right-panel-scrollable">
      {reportingData.map((item, index) => (
        <p className="reporting-single-row" key={index}>
          <span className="reporting-text" style={{color: "black !important"  }}>
            <MyIcon type={item.key} /> {item.label}
          </span>
          <span className={`reporting-data rd-${item.trend}`}>{getPrefix(item.label)}{item.value ? formatWithCommas(item.value) : 0}{getSuffix(item.label)}</span>
        </p>
      ))}
      <div style={{height:"50px"}}></div>
    </div>
  );
};

export default DashboardRightPanelInfo;

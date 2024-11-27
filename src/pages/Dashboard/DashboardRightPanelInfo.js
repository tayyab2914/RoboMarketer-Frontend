import React from "react";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/DashboardRightPanelInfo.css";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const DashboardRightPanelInfo = ({reportingData}) => {
    const { isLoggedIn, token,rerender_dashboard,current_account } = useSelector((state) => state.authToken);
  
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
        
        if (["Ad Spend", "CPC", "CPM", "Profit","Revenue","CPL","Cost Per Appt"].includes(label)) {
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
  return current_account.historical_data_progress == "Completed" ? (
    <div className="right-panel-scrollable">
      {reportingData?.map((item, index) => (
        <p className="reporting-single-row" key={index}>
          <span className="reporting-text">
            <MyIcon type={item.key} /> {item.label}
          </span>
          <span className={`reporting-data rd-${item.trend}`}>
            {getPrefix(item.label)}
            {item.value ? formatWithCommas(item.value) : 0}
            {getSuffix(item.label)}
          </span>
        </p>
      ))}
      <div style={{ height: "50px" }}></div>
    </div>
  ) : (
    <div className="right-panel-scrollable" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <Spin />
    </div>
  );
};

export default DashboardRightPanelInfo;

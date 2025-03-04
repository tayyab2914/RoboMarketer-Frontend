import React, { useEffect } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/DashboardRightPanelInfo.css";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { getPrefix, getSuffix } from "../../utils/Methods";

const DashboardRightPanelInfo = ({ reportingData }) => {
  const {
    isLoggedIn,
    token,
    rerender_dashboard,
    current_account,
    rerender_right_panel,
  } = useSelector((state) => state.authToken);

  function formatWithCommas(number) {
    // Convert the number to a string and use a regular expression to format it
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(()=>{

  },[rerender_dashboard])
  return current_account?.historical_data_progress != "In Progress" ? (
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
    <div
      className="right-panel-scrollable"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin />
    </div>
  );
};

export default DashboardRightPanelInfo;

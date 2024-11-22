import React, { useEffect, useState } from "react";
import { Collapse, Button, Modal } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import ReportingBtn from "./ReportingBtn";
import DashboardRightPanelInfo from "./DashboardRightPanelInfo";
import "./styles/DashboardRightPanel.css";
import { DownOutlined } from "@ant-design/icons";
import {
  API_FETCH_TOKEN,
  API_GET_REPORTING,
  API_UPDATE_REPORTING,
} from "../../apis/FacebookInsightsApis";
import { useSelector } from "react-redux";
import { getMetricsStatus } from "../../utils/Methods";

const { Panel } = Collapse;

const availableMetrics = [
  { key: "spend", label: "Ad Spend", value: "$200", trend: "green" },
  { key: "impressions", label: "Impressions", value: "200", trend: "red" },
  { key: "clicks", label: "Clicks", value: "200", trend: "red" },
  { key: "cpm", label: "CPM", value: "$200", trend: "green" },
  { key: "ctr", label: "CTR", value: "200%", trend: "green" },
  { key: "cpc", label: "CPC", value: "$200", trend: "red" },
  { key: "optin_rate", label: "Optin Rate", value: "$200", trend: "green" },
  { key: "cpl", label: "CPL", value: "$200", trend: "red" },
  { key: "appointment_rate", label: "Appt Rate", value: "200%", trend: "green" },
  { key: "cost_per_appointment", label: "Cost Per Appt", value: "$200", trend: "red" },
  { key: "leads", label: "Leads", value: "200", trend: "green" },
  { key: "appointments", label: "Appts", value: "200", trend: "red" },
  { key: "close_rate", label: "Close Rate", value: "200%", trend: "red" },
  { key: "sales", label: "Sales", value: "200", trend: "red" },
//   { key: "cpa", label: "CPA", value: "$200", trend: "red" },
  { key: "roas", label: "Return on Ad Spend", value: "$200", trend: "red" },
  { key: "profit", label: "Profit", value: "$200", trend: "red" },
  { key: "revenue", label: "Revenue", value: "$200", trend: "red" },
];

const DashboardRightPanel = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account } = useSelector(
    (state) => state.authToken
  );

  useEffect(() => {
    const fetchSelectedMetrics = async () => {
      const apiSelectedMetrics = [];
      const response = await API_GET_REPORTING(token, setShowSpinner);
      console.log('API_GET_REPORTING',response)
      const resultArray = Object.entries(response)
        .filter(([key, value]) => value === true)
        .map(([key]) => key);
      setSelectedMetrics(resultArray);
    };

    fetchSelectedMetrics();
  }, []);

  const handleSaveSelectedMetrics =async (metrics) => {
    setSelectedMetrics(metrics);
    const response = await API_UPDATE_REPORTING(token,getMetricsStatus(metrics),setShowSpinner)
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="right-panel-container">
      <div className="right-panel-container-inner">
        <Collapse
          className="right-panel-collapse"
          expandIconPosition={"end"}
          expandIcon={({ isActive }) => (
            <DownOutlined
              style={{
                transition: "transform 0.3s ease",
                transform: isActive ? "rotate(-180deg)" : "rotate(0deg)",
              }}
            />
          )}
        >
          <Panel
            header={
              <>
                <span className="panel-header-span">
                  <MyIcon type={"calendar"} /> Today
                </span>
              </>
            }
            key="1"
          >
            <div>
              <Button type="text" className="right-panel-btn">
                Account #1 <MyIcon type={"elipsis"} />
              </Button>
            </div>
            <div>
              <Button type="text" className="right-panel-btn">
                Account #2 <MyIcon type={"elipsis"} />
              </Button>
            </div>
            <div>
              <Button type="text" className="right-panel-btn">
                Account #3 <MyIcon type={"elipsis"} />
              </Button>
            </div>
          </Panel>
        </Collapse>

        <DashboardRightPanelInfo
          reportingData={availableMetrics.filter((metric) =>
            selectedMetrics.includes(metric.key)
          )}
        />

        <ReportingBtn
          availableMetrics={availableMetrics}
          onSave={handleSaveSelectedMetrics}
          selectedMetrics={selectedMetrics}
          onShowModal={handleShowModal}
        />
      </div>
    </div>
  );
};

export default DashboardRightPanel;

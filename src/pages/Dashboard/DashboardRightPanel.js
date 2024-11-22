import React, { useEffect, useState } from "react";
import { Collapse, Button, DatePicker, Space, Modal } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import ReportingBtn from "./ReportingBtn";
import DashboardRightPanelInfo from "./DashboardRightPanelInfo";
import "./styles/DashboardRightPanel.css";
import { DownOutlined } from "@ant-design/icons";
import {
  API_GET_INSIGHTS,
  API_GET_REPORTING,
  API_UPDATE_REPORTING,
} from "../../apis/FacebookInsightsApis";
import { useDispatch, useSelector } from "react-redux";
import { getMetricsStatus } from "../../utils/Methods";
import moment from "moment";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const availableMetrics = [
  { key: "spend", label: "Ad Spend", value: "", trend: "green" },
  { key: "impressions", label: "Impressions", value: "", trend: "red" },
  { key: "clicks", label: "Clicks", value: "", trend: "red" },
  { key: "cpm", label: "CPM", value: "", trend: "green" },
  { key: "ctr", label: "CTR", value: "", trend: "green" },
  { key: "cpc", label: "CPC", value: "", trend: "red" },
  { key: "optin_rate", label: "Optin Rate", value: "", trend: "green" },
  { key: "cpl", label: "CPL", value: "", trend: "red" },
  { key: "appointment_rate", label: "Appt Rate", value: "", trend: "green" },
  {
    key: "cost_per_appointment",
    label: "Cost Per Appt",
    value: "",
    trend: "red",
  },
  { key: "leads", label: "Leads", value: "", trend: "green" },
  { key: "appointments", label: "Appts", value: "", trend: "red" },
  { key: "close_rate", label: "Close Rate", value: "", trend: "red" },
  { key: "sales", label: "Sales", value: "", trend: "red" },
  //   { key: "cpa", label: "CPA", value: " ", trend: "red" },
  { key: "roas", label: "Return on Ad Spend", value: "", trend: "red" },
  { key: "profit", label: "Profit", value: "", trend: "red" },
  { key: "revenue", label: "Revenue", value: "", trend: "red" },
];

function updateMetrics(metrics, values) {
  return metrics.map((metric) => {
    if (values?.hasOwnProperty(metric.key)) {
      return { ...metric, value: values[metric.key] };
    }
    return metric;
  });
}

const DashboardRightPanel = () => {
  const dispatch = useDispatch();
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [Metrics, setMetrics] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [dateRange, setDateRange] = useState([
    moment().startOf("day"),
    moment().endOf("day"),
  ]);
  const [collapseKey, setCollapseKey] = useState("0");

  const { token, rerender_dashboard } = useSelector((state) => state.authToken);

  useEffect(() => {
    const fetchSelectedMetrics = async () => {
      const response = await API_GET_REPORTING(token, setShowSpinner);
      const resultArray = Object.entries(response)
        .filter(([key, value]) => value === true)
        .map(([key]) => key);
      setSelectedMetrics(resultArray);
    };
    fetchSelectedMetrics();
  }, [rerender_dashboard]);

  const getInsights = async (startDate, endDate) => {
    const response = await API_GET_INSIGHTS(
      token,
      startDate,
      endDate,
      setShowSpinner
    );
    const updatedMetrics = updateMetrics(availableMetrics, response);
    setMetrics(updatedMetrics);
  };

  useEffect(() => {
    getInsights(
      dateRange[0].format("YYYY-MM-DD"),
      dateRange[1].format("YYYY-MM-DD")
    );
  }, [dateRange]);

  // Date range selection handlers
  const handleToday = () => {
    setCollapseKey(null);
    setDateRange([moment().startOf("day"), moment().endOf("day")]);
  };
  const handleYesterday = () => {
    setCollapseKey(null);
    setDateRange([
      moment().subtract(1, "days").startOf("day"),
      moment().subtract(1, "days").endOf("day"),
    ]);
  };
  const handleThisWeek = () => {
    setCollapseKey(null);
    setDateRange([moment().startOf("week"), moment().endOf("week")]);
  };
  const handleThisMonth = () => {
    setCollapseKey(null);
    setDateRange([moment().startOf("month"), moment().endOf("month")]);
  };
  const handleThisYear = () => {
    setCollapseKey(null);
    setDateRange([moment().startOf("year"), moment().endOf("year")]);
  };

  const handleCustomRangeChange = (dates) => {
    setCollapseKey(null);
    if (dates) setDateRange(dates);
  };

  const handleSaveSelectedMetrics = async (metrics) => {
    setSelectedMetrics(metrics);
    await API_UPDATE_REPORTING(
      token,
      getMetricsStatus(metrics),
      setShowSpinner
    );
    dispatch(setRerenderDashboard(!rerender_dashboard));
  };

  const handleShowModal = () => setIsModalVisible(true);

  return (
    <div className="right-panel-container">
      <div className="right-panel-container-inner">
        <Collapse
          className="right-panel-collapse"
          expandIconPosition={"end"}
          activeKey={collapseKey}
          onChange={(key) => setCollapseKey(key)}
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
              <span className="panel-header-span">
                <MyIcon type={"calendar"} /> Select Date Range
              </span>
            }
            key="1"
          >
            <Button
              type="text"
              className="right-panel-btn"
              onClick={handleToday}
            >
              Today
            </Button>
            <Button
              type="text"
              className="right-panel-btn"
              onClick={handleYesterday}
            >
              Yesterday
            </Button>
            <Button
              type="text"
              className="right-panel-btn"
              onClick={handleThisWeek}
            >
              This Week
            </Button>
            <Button
              type="text"
              className="right-panel-btn"
              onClick={handleThisMonth}
            >
              This Month
            </Button>
            <Button
              type="text"
              className="right-panel-btn"
              onClick={handleThisYear}
            >
              This Year
            </Button>
            <Space direction="vertical" size={12} style={{ marginTop: "10px" }}>
              <RangePicker onChange={handleCustomRangeChange} />
            </Space>
          </Panel>
        </Collapse>

        <DashboardRightPanelInfo
          reportingData={Metrics.filter((metric) =>
            selectedMetrics.includes(metric.key)
          )}
        />

        <ReportingBtn
          availableMetrics={Metrics}
          onSave={handleSaveSelectedMetrics}
          selectedMetrics={selectedMetrics}
          onShowModal={handleShowModal}
        />
      </div>
    </div>
  );
};

export default DashboardRightPanel;

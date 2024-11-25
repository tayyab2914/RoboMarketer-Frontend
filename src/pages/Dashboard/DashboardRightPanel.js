import React, { useEffect, useState } from "react";
import { Collapse, Button, DatePicker, Space, Modal } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import ReportingBtn from "./ReportingBtn";
import DashboardRightPanelInfo from "./DashboardRightPanelInfo";
import "./styles/DashboardRightPanel.css";
import { DownOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
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
const { RangePicker } = DatePicker; // Use RangePicker instead of DatePicker
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
  const [CurrentMetricRangeName, setCurrentMetricRangeName] = useState('Today');
  const [dateRange, setDateRange] = useState([moment().startOf("day"), moment().endOf("day")]);
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
    setCurrentMetricRangeName("Today");
    setCollapseKey(null);
    setDateRange([moment().startOf("day"), moment().endOf("day")]);
  };

  const handleYesterday = () => {
    setCurrentMetricRangeName("Yesterday");
    setCollapseKey(null);
    setDateRange([ 
      moment().subtract(1, "days").startOf("day"),
      moment().subtract(1, "days").endOf("day"),
    ]);
  };

  const handleCustomRangeChange = (dates) => {
    if (dates) {
      // Format the start and end date as 'DD/MM/YY'
      const startDate = dates[0].format('DD/MM/YY'); // Formats to e.g., "27/11/24"
      const endDate = dates[1].format('DD/MM/YY');   // Formats to e.g., "03/12/24"
      
      // Set the custom range as the current range name
      setCurrentMetricRangeName(`From ${startDate} to ${endDate}`);
      setCollapseKey(null);
      setDateRange(dates); // Update the date range state
    }
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
  const rangePresets = [
    {
      label: 'Today',
      value: [dayjs().startOf('day'), dayjs().endOf('day')], // Starts from midnight to the end of the day
    },
    {
      label: 'Yesterday',
      value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')], // Previous day range
    },
    {
      label: 'Last 7 Days',
      value: [dayjs().subtract(7, 'days'), dayjs()], // Last 7 days range
    },
    {
      label: 'Last 14 Days',
      value: [dayjs().subtract(14, 'days'), dayjs()], // Last 14 days range
    },
    {
      label: 'Last 30 Days',
      value: [dayjs().subtract(30, 'days'), dayjs()], // Last 30 days range
    },
    {
      label: 'Last 90 Days',
      value: [dayjs().subtract(90, 'days'), dayjs()], // Last 90 days range
    },
  ];
  

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
                <MyIcon type={"calendar"} /> {CurrentMetricRangeName}
              </span>
            }
            key="1"
          >
            <Space direction="vertical" size={12} style={{ marginTop: "10px" }}>
              <RangePicker // Changed DatePicker to RangePicker
                onChange={handleCustomRangeChange} 
                presets={rangePresets}
              />
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

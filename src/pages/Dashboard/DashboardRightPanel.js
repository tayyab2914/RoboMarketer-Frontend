import React, { useEffect, useState } from "react";
import { Collapse, Button, Modal } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import ReportingBtn from "./ReportingBtn";
import DashboardRightPanelInfo from "./DashboardRightPanelInfo";
import "./styles/DashboardRightPanel.css";
import { DownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const availableMetrics = [
  { icon: "ad_spend", label: "Ad Spend", value: "$200", trend: "green" },
  { icon: "impressions", label: "Impressions", value: "200", trend: "red" },
  { icon: "clicks", label: "Clicks", value: "200", trend: "red" },
  { icon: "cpm", label: "CPM", value: "$200", trend: "green" },
  { icon: "ctr", label: "CTR", value: "200%", trend: "green" },
  { icon: "cpc", label: "CPC", value: "$200", trend: "red" },
  { icon: "optin_rate", label: "Optin Rate", value: "$200", trend: "green" },
  { icon: "cpl", label: "CPL", value: "$200", trend: "red" },
  { icon: "apt_rate", label: "Appt Rate", value: "200%", trend: "green" },
  { icon: "cost_per_appt", label: "Cost Per Appt", value: "$200", trend: "red" },
  { icon: "leads", label: "Leads", value: "200", trend: "green" },
  { icon: "appts", label: "Appts", value: "200", trend: "red" },
  { icon: "close_rate", label: "Close Rate", value: "200%", trend: "red" },
  { icon: "sales", label: "Sales", value: "200", trend: "red" },
  { icon: "cpa", label: "CPA", value: "$200", trend: "red" }
];

const DashboardRightPanel = () => {
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchSelectedMetrics = () => {
      const apiSelectedMetrics = ["Ad Spend", "Clicks", "Impressions"];
      setSelectedMetrics(apiSelectedMetrics);
    };
    
    fetchSelectedMetrics();
  }, []);

  const handleSaveSelectedMetrics = (metrics) => {
    setSelectedMetrics(metrics);
    console.log(metrics)
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };


  return (
    <div className="right-panel-container">
      <div className="right-panel-container-inner">
        <Collapse className="right-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)',  }} /> )}>
          <Panel header={<><span className='panel-header-span'><MyIcon type={'calendar'} /> Today</span></>} key="1">
            <div><Button type="text" className='right-panel-btn'>Account #1 <MyIcon type={"elipsis"} /></Button></div>
            <div><Button type="text" className='right-panel-btn'>Account #2 <MyIcon type={"elipsis"} /></Button></div>
            <div><Button type="text" className='right-panel-btn'>Account #3 <MyIcon type={"elipsis"} /></Button></div>
          </Panel>
        </Collapse>

        <DashboardRightPanelInfo
          reportingData={availableMetrics.filter((metric) =>
            selectedMetrics.includes(metric.label)
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

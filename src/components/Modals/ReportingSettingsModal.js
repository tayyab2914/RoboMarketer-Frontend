import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import ReportingModal from "../ReportingModal/ReportingModal";

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
  
const ReportingSettingsModal = ({ isVisible, onClose }) => {
    const [selectedMetrics, setSelectedMetrics] = useState([]);
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
    return ( 
        <ReportingModal
          availableMetrics={availableMetrics}
          selectedMetrics={selectedMetrics}
          onSave={handleSaveSelectedMetrics}
          isModalVisible={isVisible}
          onCloseModal={onClose}
        />)

 }
export default ReportingSettingsModal;


// import React, { useState } from "react";
// import { Modal, Select, Collapse, Input, Button, Col, Row } from "antd";
// import MyIcon from "../Icon/MyIcon";
// import FileUploader from "../FileUploader/FileUploader";
// import { DownOutlined } from '@ant-design/icons';

// const { Panel } = Collapse;
// const { Option } = Select;

// // Utility function to format numbers to two decimal places
// const formatToTwoDecimal = (value) => isNaN(value) ? "" : parseFloat(value).toFixed(2);

// // Reusable Row Component for Input Fields
// const InputRow = ({ label, value, prefix, suffix, onChange }) => (
//     <Row className="modal-field">
//       <Col xs={16} className="modal-field-input-label">
//         <label>{label}</label>
//       </Col>
//       <Col xs={8} className="modal-field-input">
//         {prefix && <span className="modal-field-pre-fix">{prefix}</span>}
//         <Input
//           className={prefix ? "modal-field-with-prefix" : suffix ? "modal-field-with-post-fix" : "modal-field-without-prefix"}
//           size="small"
//           value={value}
//           onChange={(e) => onChange(formatToTwoDecimal(e.target.value))}
//         />
//         {suffix && <span className="modal-field-post-fix">{suffix}</span>}
//       </Col>
//     </Row>
//   );

// const RoboMarketerModal = ({ isVisible, onClose }) => {
//   const [fileList, setFileList] = useState([]);
//   const [industryType, setIndustryType] = useState("Select Industry Type");
//   const [targetKPIValues, setTargetKPIValues] = useState({
//     maxDailyBudget: "0.00", ctr: "0.00", cpc: "0.00", cpl: "0.00", cpa: "0.00", cts: "0.00"
//   });
//   const [monthlyGoalsValues, setMonthlyGoalsValues] = useState({
//     leads: "0", appointments: "0", sales: "0.00", revenue: "0.00"
//   });
//   const [preferences, setPreferences] = useState("");

//   // Unified handler for file changes
//   const handleFileChange = ({ fileList }) => setFileList(fileList);

//   // Unified handler for KPI and Goals changes
//   const handleChange = (setValues, field, value) =>
//     setValues((prev) => ({ ...prev, [field]: value }));

//   // Save event
//   const handleSave = () => {
//     console.log("Industry Type:", industryType);
//     console.log("Target KPIs:", targetKPIValues);
//     console.log("Monthly Goals:", monthlyGoalsValues);
//     console.log("Preferences:", preferences);
//     console.log("Uploaded Files:", fileList);
//   };

//   return (
//     <Modal
//       title={
//         <span className="modal-header">
//           <MyIcon type={"robomarketer"} style={{ marginRight: "5px" }} />
//           RoboMarketerIQ
//         </span>
//       }
//       visible={isVisible}
//       centered
//       onCancel={onClose}
//       footer={[
//         <div className="modal-actions" key="footer">
//           <Button onClick={onClose} className="cancel-btn">
//             <MyIcon type="cross_red" /> Cancel
//           </Button>
//           <Button type="primary" onClick={handleSave} className="create-btn">
//             <MyIcon type="tick" /> Save
//           </Button>
//         </div>,
//       ]}
//     >
//       <div>
//         <p className="modal-field-label-block">Select Industry Type</p>
//         <Select
//           style={{ width: "100%" }}
//           placeholder="Select industry type"
//           value={industryType}
//           onChange={setIndustryType}
//         >
//           <Option value="technology">Technology</Option>
//           <Option value="finance">Finance</Option>
//           <Option value="healthcare">Healthcare</Option>
//         </Select>
//       </div>

//       <Collapse className="right-panel-collapse" expandIconPosition="end" defaultActiveKey={[1]} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(0deg)" : "rotate(-180deg)", }} /> )} >
//         {/* Target KPIs Section */}
//         <Panel header="Target KPIs" key="1">
//           <InputRow
//             label="Max Daily Budget (Account)"
//             prefix="$"
//             value={targetKPIValues.maxDailyBudget}
//             onChange={(value) => handleChange(setTargetKPIValues, "maxDailyBudget", value)}
//           />
//           <InputRow
//             label="Click Through Rate (CTR)"
//             suffix="%"
//             value={targetKPIValues.ctr}
//             onChange={(value) => handleChange(setTargetKPIValues, "ctr", value)}
//           />
//           <InputRow
//             label="Cost Per Click (CPC)"
//             prefix="$"
//             value={targetKPIValues.cpc}
//             onChange={(value) => handleChange(setTargetKPIValues, "cpc", value)}
//           />
//           <InputRow
//             label="Cost Per Lead (CPL)"
//             prefix="$"
//             value={targetKPIValues.cpl}
//             onChange={(value) => handleChange(setTargetKPIValues, "cpl", value)}
//           />
//           <InputRow
//             label="Cost Per Appt"
//             prefix="$"
//             value={targetKPIValues.cpa}
//             onChange={(value) => handleChange(setTargetKPIValues, "cpa", value)}
//           />
//           <InputRow
//             label="Cost Per Sale (CTS)"
//             prefix="$"
//             value={targetKPIValues.cts}
//             onChange={(value) => handleChange(setTargetKPIValues, "cts", value)}
//           />
//         </Panel>
//         </Collapse>
//         <Collapse className="right-panel-collapse" expandIconPosition="end" defaultActiveKey={["2"]} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(0deg)" : "rotate(-180deg)", }} /> )} >
//         <Panel header="Target Monthly Goals" key="2">
//           <InputRow
//             label="Leads"
//             value={monthlyGoalsValues.leads}
//             onChange={(value) => handleChange(setMonthlyGoalsValues, "leads", value)}
//           />
//           <InputRow
//             label="Appointments"
//             value={monthlyGoalsValues.appointments}
//             onChange={(value) => handleChange(setMonthlyGoalsValues, "appointments", value)}
//           />
//           <InputRow
//             label="Sales"
//             prefix="$"
//             value={monthlyGoalsValues.sales}
//             onChange={(value) => handleChange(setMonthlyGoalsValues, "sales", value)}
//           />
//           <InputRow
//             label="Revenue"
//             prefix="$"
//             value={monthlyGoalsValues.revenue}
//             onChange={(value) => handleChange(setMonthlyGoalsValues, "revenue", value)}
//           />
//         </Panel>
//         </Collapse>
//         <Collapse className="right-panel-collapse" expandIconPosition="end" defaultActiveKey={["3"]} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(0deg)" : "rotate(-180deg)", }} /> )} >
//         <Panel header="Preferences" key="3">
//           <p className="modal-field-label-block">
//             Type specific goals, preferences, or strategies that you would like your AI Agent RoboMarketer to follow
//           </p>
//           <Input.TextArea
//             rows={4}
//             placeholder="Type Preferences..."
//             value={preferences}
//             onChange={(e) => setPreferences(e.target.value)}
//           />
//         </Panel>
//         /</Collapse>
//         <Collapse className="right-panel-collapse" expandIconPosition="end" defaultActiveKey={["4"]} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(0deg)" : "rotate(-180deg)", }} /> )} >
//         <Panel header="Standard Operating Procedures (SOP)" key="4">
//           <p className="modal-field-label-block">Upload SOP Docs</p>
//           <FileUploader
//             fileList={fileList}
//             onFileChange={handleFileChange}
//             multiple
//             beforeUpload={() => true}  // Allow all file types
//             showRemoveIcon
//           />
//         </Panel>
//       </Collapse>
//     </Modal>
//   );
// };

// export default RoboMarketerModal;

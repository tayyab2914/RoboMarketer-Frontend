import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import ReportingModal from "../ReportingModal/ReportingModal";
import { API_GET_INSIGHTS, API_GET_REPORTING, API_UPDATE_REPORTING } from "../../apis/FacebookInsightsApis";
import { useDispatch, useSelector } from "react-redux";
import { getMetricsStatus } from "../../utils/Methods";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

const availableMetrics = [
    { key: "spend", label: "Ad Spend", value: " ", trend: "green" },
    { key: "impressions", label: "Impressions", value: " ", trend: "red" },
    { key: "clicks", label: "Clicks", value: " ", trend: "red" },
    { key: "cpm", label: "CPM", value: " ", trend: "green" },
    { key: "ctr", label: "CTR", value: "  ", trend: "green" },
    { key: "cpc", label: "CPC", value: " ", trend: "red" },
    { key: "optin_rate", label: "Optin Rate", value: " ", trend: "green" },
    { key: "cpl", label: "CPL", value: " ", trend: "red" },
    { key: "appointment_rate", label: "Appt Rate", value: "  ", trend: "green" },
    { key: "cost_per_appointment", label: "Cost Per Appt", value: " ", trend: "red" },
    { key: "leads", label: "Leads", value: " ", trend: "green" },
    { key: "appointments", label: "Appts", value: " ", trend: "red" },
    { key: "close_rate", label: "Close Rate", value: "  ", trend: "red" },
    { key: "sales", label: "Sales", value: " ", trend: "red" },
  //   { key: "cpa", label: "CPA", value: " ", trend: "red" },
    { key: "roas", label: "Return on Ad Spend", value: " ", trend: "red" },
    { key: "profit", label: "Profit", value: " ", trend: "red" },
    { key: "revenue", label: "Revenue", value: " ", trend: "red" },
  ];

  function updateMetrics(metrics, values) {
    return metrics.map(metric => {
      if (values?.hasOwnProperty(metric.key)) {
        return { ...metric, value: values[metric.key] };
      }
      return metric;
    });
  }
  
const ReportingSettingsModal = ({ isVisible, onClose }) => {
    const dispatch = useDispatch()
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [Metrics, setMetrics] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const { isLoggedIn, token, current_account,rerender_dashboard } = useSelector(
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
      useEffect(() => {
        const getHistoricalData = async () => {
          const apiSelectedMetrics = [];
        //   const response = await API_GET_HISTORICAL_DATA(token, setShowSpinner);
          const response = await API_GET_INSIGHTS(token,'2024-09-22','2024-11-21',setShowSpinner)
          const updatedMetrics = updateMetrics(availableMetrics, response)
          setMetrics(updatedMetrics)
          console.log('API_GET_HISTORICAL_DATA',updatedMetrics)
        };
    
        getHistoricalData();
      }, []);
      const handleSaveSelectedMetrics =async (metrics) => {
        setSelectedMetrics(metrics);
        const response = await API_UPDATE_REPORTING(token,getMetricsStatus(metrics),setShowSpinner)
        dispatch(setRerenderDashboard(!rerender_dashboard))
        console.log("RERENDER CALLED")
      };
    return ( 
        <ReportingModal
        availableMetrics={Metrics}
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

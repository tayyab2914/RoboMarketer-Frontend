import React, { useState } from "react";
import { Modal, Select, Collapse, Input, Button, Upload, Col, Row, Tooltip } from "antd";
import MyIcon from "../Icon/MyIcon";
import "./styles/ModalStyles.css";
import { DownOutlined } from '@ant-design/icons';
import FileUploader from "../FileUploader/FileUploader";

const { Panel } = Collapse;
const { Option } = Select;

// Function to format inputs to two decimal places
const formatToTwoDecimal = (value) => {
  if (isNaN(value)) return "";
  return parseFloat(value).toFixed(2);
};

const RoboMarketerModal = ({ isVisible, onClose }) => {
  const [fileList, setFileList] = useState([]);
  const [industryType, setIndustryType] = useState("Select Industry Type");
  const [targetKPIValues, setTargetKPIValues] = useState({
    maxDailyBudget: "",
    ctr: "",
    cpc: "",
    cpl: "",
    cpa: "",
    cts: "",
  });
  const [monthlyGoalsValues, setMonthlyGoalsValues] = useState({
    leads: "",
    appointments: "",
    sales: "",
    revenue: "",
  });
  const [preferences, setPreferences] = useState({
    preferences: "",
  });

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  const formatToTwoDecimal = (value) => {
    if (isNaN(value)) return "";
    const formattedValue = parseFloat(value).toFixed(2);
    return value;
  };
  
  const handleTargetKPIChange = (field, value) => {
    // Allow partial values, format when input is complete
    if (value === "" || !isNaN(value)) {
      setTargetKPIValues((prev) => ({
        ...prev,
        [field]: value,  // Store the value temporarily before formatting
      }));
    }
  
    // Format value after a valid input
    if (value !== "" && !isNaN(value)) {
      setTargetKPIValues((prev) => ({
        ...prev,
        [field]: formatToTwoDecimal(value),
      }));
    }
  };
  
  const handleMonthlyGoalsChange = (field, value) => {
    // Allow partial values, format when input is complete
    if (value === "" || !isNaN(value)) {
      setMonthlyGoalsValues((prev) => ({
        ...prev,
        [field]: value,  // Store the value temporarily before formatting
      }));
    }
  
    // Format value after a valid input
    if (value !== "" && !isNaN(value)) {
      setMonthlyGoalsValues((prev) => ({
        ...prev,
        [field]: formatToTwoDecimal(value),
      }));
    }
  };

  const handleSave = () => {
    console.log("Industry Type:", industryType);
    console.log("Target KPIs:", targetKPIValues);
    console.log("Monthly Goals:", monthlyGoalsValues);
    console.log("Preferences:", preferences);
    console.log("Uploaded Files:", fileList);
    onClose()
  };

  return (
    <Modal
      title={
        <span className="modal-header">
          <MyIcon type={"robomarketer"} style={{ marginRight: "5px" }} />
          RoboMarketerIQ
        </span>
      }
      visible={isVisible}
      centered
      onCancel={onClose}
      footer={[
        <div className="modal-actions">
        <span className='btn-1'><Button onClick={onClose} className="cancel-btn"><MyIcon type={'cross_red'}/>Cancel</Button></span>
        <span className='btn-2'><Button type="primary" onClick={handleSave} className="create-btn"><MyIcon type={'tick'}/>Save</Button></span>
      </div>
      ]}
    >
      {/* Industry Type Select */}
          <div className="">
            <p className="modal-field-label-block">Select Industry Type</p>
        <Select
          style={{ width: "100%" }}
          placeholder="Select industry type"
          value={industryType}
          onChange={(value) => setIndustryType(value)}
        >
          <Option value="technology">Technology</Option>
          <Option value="finance">Finance</Option>
          <Option value="healthcare">Healthcare</Option>
          {/* Add more options as needed */}
        </Select>
      </div>

      {/* Target KPIs Collapse */}
      <Collapse className="left-panel-collapse" defaultActiveKey={[1]} expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)',  }} /> )}>
         
        <Panel header="Target KPIs" key="1">
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Max Daily Budget (Account)</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input placeholder="0.00" className="modal-field-with-prefix" size="small" value={targetKPIValues.maxDailyBudget} onChange={(e) => handleTargetKPIChange("maxDailyBudget", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Click Through Rate (CTR)</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <Input placeholder="0.00" className="modal-field-with-post-fix" size="small" value={targetKPIValues.ctr} onChange={(e) => handleTargetKPIChange("ctr", e.target.value)} />
              <span className="modal-field-post-fix">%</span>
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Cost Per Click (CPC)</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input placeholder="0.00" className="modal-field-with-prefix" size="small" value={targetKPIValues.cpc} onChange={(e) => handleTargetKPIChange("cpc", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Cost Per Lead (CPL)</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input placeholder="0.00"  className="modal-field-with-prefix" size="small" value={targetKPIValues.cpl} onChange={(e) => handleTargetKPIChange("cpl", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Cost Per Appt</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input placeholder="0.00"  className="modal-field-with-prefix" size="small" value={targetKPIValues.cpa} onChange={(e) => handleTargetKPIChange("cpa", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Cost Per Sale (CTS)</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input placeholder="0.00"  className="modal-field-with-prefix" size="small" value={targetKPIValues.cts} onChange={(e) => handleTargetKPIChange("cts", e.target.value) } />
            </Col>
          </Row>
        </Panel>
        </Collapse>
        <Collapse  defaultActiveKey={[1]} className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)',  }} /> )}>

        {/* Target Monthly Goals Collapse */}
        <Panel header="Target Monthly Goals" key="1">
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Leads</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <Input placeholder="0"  className="modal-field-without-prefix" size="small" value={monthlyGoalsValues.leads} onChange={(e) => handleMonthlyGoalsChange("leads", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Appointments</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <Input placeholder="0"  className="modal-field-without-prefix" size="small" value={monthlyGoalsValues.appointments} onChange={(e) => handleMonthlyGoalsChange("appointments", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Sales</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input  placeholder="0.00" className="modal-field-with-prefix" size="small" value={monthlyGoalsValues.sales} onChange={(e) => handleMonthlyGoalsChange("sales", e.target.value) } />
            </Col>
          </Row>
          <Row className="modal-field">
            <Col xs={16} className="modal-field-input-label">
              <label>Revenue</label>
            </Col>
            <Col xs={8} className="modal-field-input">
              <span className="modal-field-pre-fix">$</span>
              <Input placeholder="0.00"  className="modal-field-with-prefix" size="small" value={monthlyGoalsValues.revenue} onChange={(e) => handleMonthlyGoalsChange("revenue", e.target.value) } />
            </Col>
          </Row>
        </Panel>
        </Collapse>
        <Collapse  defaultActiveKey={[1]} className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)',  }} /> )}>
        {/* Preferences Collapse */}
        <Panel header="Preferences" key="1">
          <div className="">
            <p className="modal-field-label-block">Type specific goals, preferences, or strategies that you would like your AI Agent RoboMarketer to follow</p>
            <Input.TextArea
              rows={4}
              placeholder="Type Preferences..."
              value={preferences.preferences}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  preferences: e.target.value,
                }))
              }
            />
          </div>
        </Panel>
        </Collapse>
        <Collapse  defaultActiveKey={[1]} className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)',  }} /> )}>
        {/* SOP Documents Upload Collapse */}
        <Panel header="Standard Operating Procedures (SOP)" key="1">
          <div className="">
          <p className="modal-field-label-block ">Upload SOP Docs</p>
            <FileUploader
              fileList={fileList}
              onFileChange={handleFileChange}
              multiple={true}
              beforeUpload={() => true}  // Allow all file types
              showRemoveIcon={true}
              
            />
          </div>
        </Panel>
      </Collapse>
    </Modal>
  );
};

export default RoboMarketerModal;

import React, { useEffect, useState } from "react";
import { Modal, Select, Collapse, Input, Button, Row, Col, Spin } from "antd";
import MyIcon from "../Icon/MyIcon";
import "./styles/ModalStyles.css";
import { DownOutlined } from '@ant-design/icons';
import FileUploader from "../FileUploader/FileUploader";
import { UTILS_COMBINE_DATA } from "../../utils/Methods";
import { API_GET_ROBOMARKETER_IQ, API_UPDATE_ROBOMARKETER_IQ } from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";

const { Panel } = Collapse;
const { Option } = Select;

const formatToTwoDecimal = (value) => {
  return value
};

const InputRow = ({ label, value, onChange, prefix, suffix, placeholder }) => (
  <Row className="modal-field">
    <Col xs={16} className="modal-field-input-label">
      <label>{label}</label>
    </Col>
    <Col xs={8} className="modal-field-input">
      {prefix && <span className="modal-field-pre-fix">{prefix}</span>}
      <Input placeholder={placeholder} className={prefix ? "modal-field-with-prefix" : "modal-field-without-prefix"} size="small" value={value} onChange={onChange} />
      {suffix && <span className="modal-field-post-fix">{suffix}</span>}
    </Col>
  </Row>
);

const RoboMarketerModal = ({ isVisible, onClose }) => {
    const { token } = useSelector((state) => state.authToken);
    const [showSpinner, setShowSpinner] = useState(false);
  const [FormValues, setFormValues] = useState({ max_daily_budget: "", clickthrough_rate_percentage: "", cost_per_click_cpc: "", cost_per_lead_cpl: "", cost_per_appointment: "", cost_per_sale_cpa: "",return_on_ad_spend_roas:"", leads: "", appointments: "", sales: "", revenue: "", industry_type: "", preferences: "", file_group: { sop_files:[], desription:'', id:'' } });

  const handleValueChange = (field, value) => {
    if(field == 'industry_type'){
        setFormValues((prev) => ({ ...prev, industry_type: value }));  
        
    }
    else if (field === "file_group") {
      setFormValues((prev) => ({ ...prev, file_group: {sop_files:value} }));  
    } else if (field === "preferences") {
        setFormValues((prev) => ({ ...prev, preferences: value }));  
    }
    else if (value === "" || !isNaN(value)) {
      setFormValues((prev) => ({
        ...prev,
        [field]: formatToTwoDecimal(value),
      }));
    }
  };
  
  const getRobomarketerIq = async()=>{
    const response = await API_GET_ROBOMARKETER_IQ(token,setShowSpinner)
    if(response)
    {
        console.log('getRobomarketerIq',response)
        setFormValues(response)
    }
  }
  useEffect(()=>{
    getRobomarketerIq()
  },[])

  const handleSave = async() => {
    console.log(FormValues)
    const response =API_UPDATE_ROBOMARKETER_IQ(token,FormValues,setShowSpinner)
    onClose();
  };

  return (
    <>
    {showSpinner && <Spin fullscreen/>}
    <Modal title={ <span className="modal-header"> <MyIcon type={"robomarketer"} style={{ marginRight: "5px" }} /> RoboMarketerIQ </span> } visible={isVisible} centered onCancel={onClose}
      footer={[
        <div className="modal-actions" key="footer">
          <span className="btn-1"> <Button onClick={onClose} className="cancel-btn"> <MyIcon type={"cross_red"} /> Cancel </Button> </span>
          <span className="btn-2"> <Button type="primary" onClick={handleSave} className="create-btn"> <MyIcon type={"tick"} /> Save </Button></span>
        </div>
      ]}
    >
      {/* Industry Type Select */}
      <div>
        <p className="modal-field-label-block">Select Industry Type</p>
        <Select style={{ width: "100%" }} placeholder="Select industry type" value={FormValues.industry_type} onChange={(value) => handleValueChange("industry_type", value)} >
          <Option value="technology">Technology</Option>
          <Option value="finance">Finance</Option>
          <Option value="healthcare">Healthcare</Option>
        </Select>
      </div>

      {/* Target KPIs Collapse */}
      <Collapse className="left-panel-collapse" defaultActiveKey={[1]} expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )} >
        <Panel header="Target KPIs" key="1">
          <InputRow label="Max Daily Budget (Account)" value={FormValues.max_daily_budget} onChange={(e) => handleValueChange("max_daily_budget", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Click Through Rate (CTR)" value={FormValues.clickthrough_rate_percentage} onChange={(e) => handleValueChange("clickthrough_rate_percentage", e.target.value)} suffix="%" placeholder="0.00" />
          <InputRow label="Cost Per Click (CPX)" value={FormValues.cost_per_click_cpc} onChange={(e) => handleValueChange("cost_per_click_cpc", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Cost Per Lead (CPL)" value={FormValues.cost_per_lead_cpl} onChange={(e) => handleValueChange("cost_per_lead_cpl", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Cost Per Appt" value={FormValues.cost_per_appointment} onChange={(e) => handleValueChange("cost_per_appointment", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Cost Per Sale (CPS)" value={FormValues.cost_per_sale_cpa} onChange={(e) => handleValueChange("cost_per_sale_cpa", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Return On Ad Spend (ROAS)" value={FormValues.return_on_ad_spend_roas} onChange={(e) => handleValueChange("return_on_ad_spend_roas", e.target.value)} suffix="X" placeholder="0.00" />
        </Panel>
      </Collapse>

      {/* Target Monthly Goals Collapse */}
      <Collapse className="left-panel-collapse" defaultActiveKey={[1]} expandIconPosition={"end"}>
        <Panel header="Target Monthly Goals" key="1">
          <InputRow label="Leads" value={FormValues.leads} onChange={(e) => handleValueChange("leads", e.target.value)} placeholder="0" />
          <InputRow label="Appointments" value={FormValues.appointments} onChange={(e) => handleValueChange("appointments", e.target.value)} placeholder="0" />
          <InputRow label="Sales" value={FormValues.sales} onChange={(e) => handleValueChange("sales", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Revenue" value={FormValues.revenue} onChange={(e) => handleValueChange("revenue", e.target.value)} prefix="$" placeholder="0.00" />
        </Panel>
      </Collapse>

      {/* Preferences and File Uploader Collapse */}
      <Collapse className="left-panel-collapse" defaultActiveKey={[1]} expandIconPosition={"end"}>
        <Panel header="Preferences" key="1">
          <div>
            <p className="modal-field-label-block"> Type specific goals, preferences, or strategies that you would like your AI Agent RoboMarketer to follow </p>
            <Input.TextArea rows={4} placeholder="Type Preferences..." value={FormValues.preferences} onChange={(e) => handleValueChange("preferences", e.target.value)} />
          </div>
        </Panel>
        </Collapse>
        <Collapse className="left-panel-collapse" defaultActiveKey={[1]} expandIconPosition={"end"}>
        <Panel header="Standard Operating Procedures (SOP)" key="1">
          <div className="">
            <p className="modal-field-label-block">Upload SOP Docs</p>
            <FileUploader fileList={FormValues.file_group.sop_files} onFileChange={({ fileList }) => handleValueChange("file_group", fileList)} multiple={true} beforeUpload={() => true} showRemoveIcon={true} />
        </div>
        </Panel>
      </Collapse>
    </Modal></>
  );
};

export default RoboMarketerModal;

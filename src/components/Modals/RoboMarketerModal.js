import React, { useEffect, useState } from "react";
import { Modal, Select, Collapse, Input, Button, Row, Col, Spin } from "antd";
import MyIcon from "../Icon/MyIcon";
import "./styles/ModalStyles.css";
import { DownOutlined } from '@ant-design/icons';
import FileUploader from "../FileUploader/FileUploader";
import { INDUSTRIES, UTILS_COMBINE_DATA } from "../../utils/Methods";
import { API_GET_ROBOMARKETER_IQ, API_UPDATE_ROBOMARKETER_IQ } from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";
import { ICONS } from "../../data/IconData";

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
  const [FormValues, setFormValues] = useState({ max_daily_budget: "", clickthrough_rate_percentage: "", cost_per_click_cpc: "", cost_per_lead_cpl: "", cost_per_appointment: "", cost_per_sale_cpa: "",return_on_ad_spend_roas:"", leads: "", appointments: "", sales: "", revenue: "", industry_type: "", preferences: "", file_group: [] });

  const handleValueChange = (field, value) => {
    console.log(value.label)
    if(field == 'industry_type'){
        setFormValues((prev) => ({ ...prev, industry_type: value.label }));  
    } else if (field === "file_group") {
        setFormValues((prev) => ({ ...prev, file_group:value }));  
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

  const handleSave = async () => {
    const formData = new FormData();
    
    // Append each form field to the FormData object
    formData.append("max_daily_budget", FormValues.max_daily_budget || "");
    formData.append("clickthrough_rate_percentage", FormValues.clickthrough_rate_percentage || "");
    formData.append("cost_per_click_cpc", FormValues.cost_per_click_cpc || "");
    formData.append("cost_per_lead_cpl", FormValues.cost_per_lead_cpl || "");
    formData.append("cost_per_appointment", FormValues.cost_per_appointment || "");
    formData.append("cost_per_sale_cpa", FormValues.cost_per_sale_cpa || "");
    formData.append("return_on_ad_spend_roas", FormValues.return_on_ad_spend_roas || "");
    formData.append("leads", FormValues.leads || "");
    formData.append("appointments", FormValues.appointments || "");
    formData.append("sales", FormValues.sales || "");
    formData.append("revenue", FormValues.revenue || "");
    formData.append("industry_type", FormValues.industry_type || "");
    formData.append("preferences", FormValues.preferences || "");
  
    FormValues.file_group?.forEach((file, index) => {
      formData.append(`file_group[${index}]`, file.originFileObj);
    });
  
    const response = await API_UPDATE_ROBOMARKETER_IQ(token, formData, setShowSpinner);
    
    if (response) {
      console.log("Form submitted successfully", response);
      onClose();
    }
  };
  
  return (
    <>
    {showSpinner && <Spin fullscreen/>}
    <Modal
          title={ false }
          centered
          visible={isVisible}
          onCancel={onClose}
          closable={false}
          footer={false}
        >
           
           <div className="custom-modal-header">
    <span className="modal-header"> <MyIcon type="robomarketer" style={{ marginRight: "5px" }} size="md"/> RoboMarketerIQ
 </span>
 <span ><MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon"/></span>
    </div>
            
    <div className="custom-modal-content modal-content">
      <p className="modal-description">Customize your RoboMarketer AI Agent With Your Target KPIs, Monthly Goals, And Preferences</p>
      <div>
        {/* <p className="modal-field-label-block">Select Industry Type</p> */}
        <Select 
        style={{ width: "100%" }}
        className="modal-select"
        placeholder={<p className="select-placeholder"><MyIcon type={'select_industry'}/>Select industry type</p>}
        value={FormValues.industry_type || undefined} // Shows placeholder if industry_type is undefined or empty
        onChange={(value) => {
            const selectedIndustry = INDUSTRIES.find((industry) => industry.key === value);
            handleValueChange("industry_type", { value, label: selectedIndustry?.label });
          }}
        suffixIcon={<img src={ICONS.arrow_down} height={7} style={{marginRight:"6px"}}/>}
        >
        {INDUSTRIES.map((industry) => (
            <Option key={industry.key} value={industry.key} className="modal-select-item">
            {industry.label}
            </Option>
        ))}
        </Select>

      </div>

      {/* Target KPIs Collapse */}
      <Collapse className="modal-collapse" defaultActiveKey={[0]} expandIconPosition={"end"} expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )} 
               >
        <Panel header={<p className="modal-panel-header"><MyIcon type={'target_kpi_modal'}/> Target KPIs</p>} key="1">
          <InputRow label="Max Daily Budget (Account)" value={FormValues.max_daily_budget} onChange={(e) => handleValueChange("max_daily_budget", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Click Through Rate (CTR)" value={FormValues.clickthrough_rate_percentage} onChange={(e) => handleValueChange("clickthrough_rate_percentage", e.target.value)} suffix="%" placeholder="0.00" />
          <InputRow label="Cost Per Click (CPC)" value={FormValues.cost_per_click_cpc} onChange={(e) => handleValueChange("cost_per_click_cpc", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Cost Per Lead (CPL)" value={FormValues.cost_per_lead_cpl} onChange={(e) => handleValueChange("cost_per_lead_cpl", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Cost Per Appt" value={FormValues.cost_per_appointment} onChange={(e) => handleValueChange("cost_per_appointment", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Cost Per Sale (CPA)" value={FormValues.cost_per_sale_cpa} onChange={(e) => handleValueChange("cost_per_sale_cpa", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Return On Ad Spend (ROAS)" value={FormValues.return_on_ad_spend_roas} onChange={(e) => handleValueChange("return_on_ad_spend_roas", e.target.value)} suffix="X" placeholder="0.00" />
        </Panel>
      </Collapse>

      {/* Target Monthly Goals Collapse */}
      <Collapse className="modal-collapse" defaultActiveKey={[0]} expandIconPosition={"end"}  expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={<p className="modal-panel-header"><MyIcon type={'target_monthly_goal'}/> Target Monthly Goals</p>} key="1">
          <InputRow label="Leads" value={FormValues.leads} onChange={(e) => handleValueChange("leads", e.target.value)} placeholder="0" />
          <InputRow label="Appointments" value={FormValues.appointments} onChange={(e) => handleValueChange("appointments", e.target.value)} placeholder="0" />
          <InputRow label="Sales" value={FormValues.sales} onChange={(e) => handleValueChange("sales", e.target.value)} prefix="$" placeholder="0.00" />
          <InputRow label="Revenue" value={FormValues.revenue} onChange={(e) => handleValueChange("revenue", e.target.value)} prefix="$" placeholder="0.00" />
        </Panel>
      </Collapse>

      {/* Preferences and File Uploader Collapse */}
      <Collapse className="modal-collapse" defaultActiveKey={[0]} expandIconPosition={"end"}expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={<p className="modal-panel-header"><MyIcon type={'preferences'}/> Preferences</p>} key="1">
          <div>
      <p className="modal-description">Type specific goals, preferences, or strategies that you would like your AI Agent RoboMarketer to follow</p>
           
            <Input.TextArea rows={4} placeholder="Type Preferences..." value={FormValues.preferences} onChange={(e) => handleValueChange("preferences", e.target.value)} />
          </div>
        </Panel>
        </Collapse>
        {/* <Collapse className="modal-collapse" defaultActiveKey={[0]} expandIconPosition={"end"}  expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={<p className="modal-panel-header"><MyIcon type={'preferences'}/> Standard Operating Procedures (SOP)</p>} key="1">
          <div className="">
            <p className="modal-field-label-block">Upload SOP Docs</p>
            <FileUploader fileList={FormValues?.file_group} onFileChange={({ fileList }) => handleValueChange("file_group", fileList)} multiple={true} beforeUpload={() => true} showRemoveIcon={true} accept={".docs, .docx"}/>
        </div>
        </Panel>
      </Collapse> */}
      </div>
      <div className="modal-actions" key="footer">
              <span className="btn-2"> <Button type="primary" onClick={handleSave} className="create-btn"> <MyIcon type={"tick"} /> Save </Button></span>
              <span className="btn-1"> <Button onClick={onClose} className="cancel-btn"> <MyIcon type={"cross_red"} /> Cancel </Button> </span>
            </div>
    </Modal></>
  );
};

export default RoboMarketerModal;

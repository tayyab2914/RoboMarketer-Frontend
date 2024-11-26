import React, { useEffect, useState } from "react";
import { Collapse, Input, Radio, Button, Form } from "antd";
import MyIcon from "../Icon/MyIcon";
import { DownOutlined } from "@ant-design/icons";
import "../Modals/styles/ModalStyles.css";
import { NAME_RULES_REQUIRED } from "../Modals/AccountModal";
import { ICONS } from "../../data/IconData";

const { Panel } = Collapse;

const InputSection = ({ label, name, placeholder, isTextArea = false, isNumber = false }) => (
    <Form.Item name={name} label={label} className="form-item" rules={name === "product_name" ? NAME_RULES_REQUIRED : []} required={false}>
      {isNumber ? (
        <Input style={{ width: "100%" }} placeholder={placeholder} type="number"/>
      ) : isTextArea ? (
        <Input.TextArea rows={4} placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );

const EditProductForm = ({ initialValues = {}, onFinish, onClose }) => {
    const [selectedType, setSelectedType] = useState("product");
  const [form] = Form.useForm();

  useEffect(() => {
    console.log("EditFunnelForm rerendered with values:", initialValues);
    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };
  return (
   <>
    <Form form={form} onFinish={onFinish} layout="vertical">
    <div className="custom-modal-content modal-content">
      <Form.Item name="type" initialValue="product">
      <Radio.Group onChange={handleTypeChange}>
          <Radio.Button value="product">
            <span className="modal-radio-selector">
              <MyIcon type={selectedType === "product" ? "products_white" : "products"} />
            Product
            </span>
          </Radio.Button>
          <Radio.Button value="service">
            <span className="modal-radio-selector">
              <MyIcon type={selectedType === "service" ? "service_white" : "service"} />
            Service
            </span>
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Collapse defaultActiveKey={["0"]} expandIconPosition="right" expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={ <span className="modal-panel-header"> <MyIcon type="product_service_details" style={{ marginRight: "5px" }} /> Product / Service Details </span> } key="1"  >
          <InputSection name="product_name" label="Product / Service Name" placeholder="Type Name..." />
          <InputSection name="product_description" label="Description" placeholder="Type Description..." />
          <InputSection name="product_core_benefits" label="Core Benefits" placeholder="Core Benefits..." />
          <InputSection name="product_features" label="Features / Deliverables" placeholder="Features / Deliverables..." />
          <InputSection name="product_problems_solved" label="Problems Solved" placeholder="Type Problems Solved..." />
          <InputSection name="product_ideal_use_case" label="Ideal Use Case" placeholder="Ideal Use Case..." />
          <InputSection name="product_unique_selling_proposition" label="Unique Selling Proposition" placeholder="Unique Selling Proposition..." />
          <InputSection name="product_customer_testimonials" label="Customer Testimonials" placeholder="Customer Testimonials..." />
          <InputSection name="product_pricing" label="Pricing" placeholder="Pricing..." isNumber />
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={["0"]} expandIconPosition="right" expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={ <span className="modal-panel-header"> <MyIcon type="user" style={{ marginRight: "5px" }} /> Target Audience </span> } key="1" >
          <InputSection name="target_audience_description" label="Target Audience Description" placeholder="Describe the target audience..." isTextArea />
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={["0"]} expandIconPosition="right" expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={ <span className="modal-panel-header"> <MyIcon type="demographics" style={{ marginRight: "5px" }} /> Demographics </span> } key="1" >
          <InputSection name="demographics_age_range" label="Age Range" placeholder="Age Range (e.g., 18-25)" />
          <InputSection name="demographics_gender" label="Gender" placeholder="Gender (e.g., Male, Female, Other)" />
          <InputSection name="demographics_education_level" label="Education Level" placeholder="Education Level (e.g., High School, College, Degree)" />
          <InputSection name="demographics_income_range" label="Income Range" placeholder="Income Range (e.g., $30k - $50k)" />
          <InputSection name="demographics_occupation" label="Occupation" placeholder="Occupation (e.g., Software Developer, Student)" />
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={["0"]} expandIconPosition="right" expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={ <span className="modal-panel-header"> <MyIcon type="user" style={{ marginRight: "5px" }} /> Interests </span> } key="1" >
          <InputSection name="primary_interest" label="Primary Interests" placeholder="Primary Interests..." />
          <InputSection name="secondary_interest" label="Secondary Interests" placeholder="Secondary Interests..." />
        </Panel>
      </Collapse>

      <Collapse defaultActiveKey={["0"]} expandIconPosition="right" expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={ <span className="modal-panel-header"> <MyIcon type="psychographics" style={{ marginRight: "5px" }} /> Psychographics </span> } key="1" >
          <InputSection name="paid_points_or_challenges" label="Paid Points / Challenges" placeholder="Paid Points / Challenges..." />
          <InputSection name="goals_motivation" label="Goals / Motivations" placeholder="Goals / Motivations..." />
          <InputSection name="desired_benefits" label="Desired Benefits" placeholder="Desired Benefits..." />
          <InputSection name="emotional_drivers" label="Emotional Drivers" placeholder="Emotional Drivers..." />
          <InputSection name="unique_needs_or_preferences" label="Unique Needs / Preferences" placeholder="Unique Needs / Preferences..." />
        </Panel>
      </Collapse></div>
    
    
    <div className="modal-actions">
    <span className="btn-2">
  <Button type="primary" htmlType="submit" className="create-btn">
  <MyIcon type={"tick"} />Update Product
  </Button>
    </span>
  <span className="btn-1">
  <Button onClick={() => {
      form.resetFields()
      onClose()}} className="cancel-btn">
  <MyIcon type={"cross_red"} /> Cancel
  </Button>
    </span>
  </div></Form>
  </>
  );
};

export default EditProductForm;

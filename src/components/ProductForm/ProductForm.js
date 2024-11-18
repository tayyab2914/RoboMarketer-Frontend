// ProductForm.js
import { Collapse, Form, Input, Radio, Button } from "antd";
import React from "react";
import MyIcon from "../Icon/MyIcon";
import { DownOutlined } from "@ant-design/icons";
import "../Modals/styles/ModalStyles.css";

const { Panel } = Collapse;

const InputSection = ({ label, name, placeholder, isTextArea = false, isNumber = false }) => (
    <Form.Item name={name} label={label}>
      {isNumber ? (
        <Input style={{ width: "100%" }} placeholder={placeholder} type="number"/>
      ) : isTextArea ? (
        <Input.TextArea rows={4} placeholder={placeholder} />
      ) : (
        <Input placeholder={placeholder} />
      )}
    </Form.Item>
  );

const ProductForm = ({ form, onFinish, onCancel }) => (
  <Form form={form} onFinish={onFinish} layout="vertical">
    <Form.Item name="type" initialValue="product">
      <Radio.Group style={{ marginBottom: 8 }}>
        <Radio.Button value="product">Product</Radio.Button>
        <Radio.Button value="service">Service</Radio.Button>
      </Radio.Group>
    </Form.Item>

    <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
      <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Product / Service Details </span>} key="1">
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

    <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
      <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Target Audience</span>} key="1">
        <InputSection name="target_audience_description" label="Target Audience Description" placeholder="Describe the target audience..." isTextArea />
      </Panel>
    </Collapse>

    <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
      <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Demographics</span>} key="1">
        <InputSection name="demographics_age_range" label="Age Range" placeholder="Age Range (e.g., 18-25)" />
        <InputSection name="demographics_gender" label="Gender" placeholder="Gender (e.g., Male, Female, Other)" />
        <InputSection name="demographics_education_level" label="Education Level" placeholder="Education Level (e.g., High School, College, Degree)" />
        <InputSection name="demographics_income_range" label="Income Range" placeholder="Income Range (e.g., $30k - $50k)" />
        <InputSection name="demographics_occupation" label="Occupation" placeholder="Occupation (e.g., Software Developer, Student)" />
      </Panel>
    </Collapse>

    <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
      <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Interests</span>} key="1">
        <InputSection name="primary_interest" label="Primary Interests" placeholder="Primary Interests..." />
        <InputSection name="secondary_interest" label="Secondary Interests" placeholder="Secondary Interests..." />
      </Panel>
    </Collapse>

    <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
      <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Psychographics</span>} key="1">
        <InputSection name="paid_points_or_challenges" label="Paid Points / Challenges" placeholder="Paid Points / Challenges..." />
        <InputSection name="goals_motivation" label="Goals / Motivations" placeholder="Goals / Motivations..." />
        <InputSection name="desired_benefits" label="Desired Benefits" placeholder="Desired Benefits..." />
        <InputSection name="emotional_drivers" label="Emotional Drivers" placeholder="Emotional Drivers..." />
        <InputSection name="unique_needs_or_preferences" label="Unique Needs / Preferences" placeholder="Unique Needs / Preferences..." />
      </Panel>
    </Collapse>
    <div className="modal-actions">
        <span className="btn-1">
        <Button onClick={onCancel} style={{ marginRight: '10px' }} className="cancel-btn">
        <MyIcon type={"cross_red"} /> Cancel
        </Button>
          </span>
          <span className="btn-2">
        <Button type="primary" htmlType="submit" className="create-btn">
        <MyIcon type={"tick"} />Add Product
        </Button>
          </span>
        </div>
  </Form>
);

export default ProductForm;

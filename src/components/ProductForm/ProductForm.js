import { Collapse, Input, Radio } from 'antd'
import React from 'react'
import MyIcon from '../Icon/MyIcon';
const { Panel } = Collapse;

const InputSection = ({ label, value, onChange, placeholder, isTextArea = false }) => (
    <div>
      <p className="modal-field-label-block">{label}</p>
      {isTextArea ? (
        <Input.TextArea rows={4} placeholder={placeholder} value={value} onChange={onChange} />
      ) : (
        <Input placeholder={placeholder} value={value} onChange={onChange} />
      )}
    </div>
  );

const ProductForm = ({initialValues,callbacks}) => {
    const {setType,setNewProductName,setDescription,setCoreBenefits,setFeatures,setUseCase,setUniqueSellingPoint, setCustomerTestimonials, setPricing, setTargetAudienceDescription,setAgeRange,setGender,setEducationLevel,setIncomeRange,setOccupation,setPrimaryInterests,setSecondaryInterests, setPaidPoints,setGoals, setDesiredBenefits, setEmotionalDrivers, setUniqueNeeds } = callbacks
    const {type,newProductName,description, coreBenefits, features, useCase, uniqueSellingPoint, customerTestimonials, pricing, targetAudienceDescription,ageRange,gender,educationLevel,incomeRange,occupation, primaryInterests, secondaryInterests, paidPoints, goals, desiredBenefits, emotionalDrivers, uniqueNeeds} = initialValues
  console.log(type)
    return (
    <div>
        <Radio.Group
        onChange={(e) => setType(e.target.value)}
        value={type}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="product">Product</Radio.Button>
        <Radio.Button value="service">Service</Radio.Button>
      </Radio.Group>
      <Collapse defaultActiveKey={['1']} expandIconPosition="right">
        <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Product / Service Details </span>} key="1">
          <InputSection label="Product / Service Name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} placeholder="Type Name..." />
          <InputSection label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type Description..." />
          <InputSection label="Core Benefits" value={coreBenefits} onChange={(e) => setCoreBenefits(e.target.value)} placeholder="Core Benefits..." />
          <InputSection label="Features / Deliverables" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="Features / Deliverables..." />
          <InputSection label="Ideal Use Case" value={useCase} onChange={(e) => setUseCase(e.target.value)} placeholder="Ideal Use Case..." />
          <InputSection label="Unique Selling Proposition" value={uniqueSellingPoint} onChange={(e) => setUniqueSellingPoint(e.target.value)} placeholder="Unique Selling Proposition..." />
          <InputSection label="Customer Testimonials" value={customerTestimonials} onChange={(e) => setCustomerTestimonials(e.target.value)} placeholder="Customer Testimonials..." />
          <InputSection label="Pricing" value={pricing} onChange={(e) => setPricing(e.target.value)} placeholder="Pricing..." />
        </Panel>
      </Collapse>

      {/* Target Audience Section */}
      <Collapse defaultActiveKey={['1']} expandIconPosition="right">
        <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Target Audience</span>} key="1">
          <InputSection label="Target Audience Description" value={targetAudienceDescription} onChange={(e) => setTargetAudienceDescription(e.target.value)} placeholder="Describe the target audience..." isTextArea />
        </Panel>
      </Collapse>

      {/* Demographics Section */}
      <Collapse defaultActiveKey={['1']} expandIconPosition="right">
        <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Demographics</span>} key="1">
          <InputSection label="Age Range" value={ageRange} onChange={(e) => setAgeRange(e.target.value)} placeholder="Age Range (e.g., 18-25)" />
          <InputSection label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender (e.g., Male, Female, Other)" />
          <InputSection label="Education Level" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} placeholder="Education Level (e.g., High School, College, Degree)" />
          <InputSection label="Income Range" value={incomeRange} onChange={(e) => setIncomeRange(e.target.value)} placeholder="Income Range (e.g., $30k - $50k)" />
          <InputSection label="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} placeholder="Occupation (e.g., Software Developer, Student)" />
        </Panel>
      </Collapse>

      {/* Interests Section */}
      <Collapse defaultActiveKey={['1']} expandIconPosition="right">
        <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Interests</span>} key="1">
          <InputSection label="Primary Interests" value={primaryInterests} onChange={(e) => setPrimaryInterests(e.target.value)} placeholder="Primary Interests..." />
          <InputSection label="Secondary Interests" value={secondaryInterests} onChange={(e) => setSecondaryInterests(e.target.value)} placeholder="Secondary Interests..." />
        </Panel>
      </Collapse>

      {/* Psychographics Section */}
      <Collapse defaultActiveKey={['1']} expandIconPosition="right">
        <Panel header={<span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Psychographics</span>} key="1">
          <InputSection label="Paid Points / Challenges" value={paidPoints} onChange={(e) => setPaidPoints(e.target.value)} placeholder="Paid Points / Challenges..." />
          <InputSection label="Goals / Motivations" value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="Goals / Motivations..." />
          <InputSection label="Desired Benefits" value={desiredBenefits} onChange={(e) => setDesiredBenefits(e.target.value)} placeholder="Desired Benefits..." />
          <InputSection label="Emotional Drivers" value={emotionalDrivers} onChange={(e) => setEmotionalDrivers(e.target.value)} placeholder="Emotional Drivers..." />
          <InputSection label="Unique Needs / Preferences" value={uniqueNeeds} onChange={(e) => setUniqueNeeds(e.target.value)} placeholder="Unique Needs / Preferences..." />
        </Panel>
      </Collapse>
    </div>
  )
}

export default ProductForm

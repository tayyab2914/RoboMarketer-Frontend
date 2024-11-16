import { Collapse, Input, Button, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import MyIcon from '../Icon/MyIcon';
import { DownOutlined, PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Option } = Select;

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

const FunnelForm = ({ initialValues, callbacks }) => {
  const { setNewFunnelName, setDescription, setFunnelType, setSteps } = callbacks;

  // Fallback to default values if initialValues is empty or undefined
  const { newFunnelName = "", description = "", funnelType = "sales", funnelSteps = [] } = initialValues || {};

  const [steps, setLocalSteps] = useState(funnelSteps);

  useEffect(() => {
    setLocalSteps(funnelSteps);
  }, [funnelSteps]);

  const handleAddStep = () => {
    const newStep = { name: '', description: '', url: '' };
    setLocalSteps(prevSteps => {
      const updatedSteps = [...prevSteps, newStep];
      setSteps(updatedSteps); // Pass updated steps to parent
      return updatedSteps;
    });
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setLocalSteps(updatedSteps);
    setSteps(updatedSteps); // Pass updated steps to parent
  };

  return (
    <div>
      <InputSection
        label="Funnel Name"
        value={newFunnelName}
        onChange={(e) => setNewFunnelName(e.target.value)}
        placeholder="Type Name..."
      />

      <div>
        <p className="modal-field-label-block">Funnel Type</p>
        <Select
          value={funnelType}
          onChange={(value) => setFunnelType(value)}
          placeholder="Select Funnel Type"
          style={{ width: "100%" }}
        >
          <Option value="sales">Sales Funnel</Option>
          <Option value="marketing">Marketing Funnel</Option>
          <Option value="leadGeneration">Lead Generation</Option>
          <Option value="conversion">Conversion Funnel</Option>
        </Select>
      </div>

      <InputSection
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Type Description..."
      />

<Collapse defaultActiveKey={[1]} expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)',  }} /> )}>
        <Panel header={<span className="panel-header"><MyIcon type="products" style={{ marginRight: "5px" }} />Funnel Steps</span>} key="1">
          {steps.map((step, index) => (
            <div key={index} className="funnel-step">
              <p className="modal-field-label-block">{`Funnel Step #${index + 1}`}</p>
              <InputSection
                label="Step Name"
                value={step.name}
                onChange={(e) => handleStepChange(index, 'name', e.target.value)}
                placeholder="Type Step Name..."
              />
              <InputSection
                label="Step Description"
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                placeholder="Type Description..."
                isTextArea
              />
              <InputSection
                label="Step URL"
                value={step.url}
                onChange={(e) => handleStepChange(index, 'url', e.target.value)}
                placeholder="Paste URL..."
              />
            </div>
          ))}

          <Button type="dashed" onClick={handleAddStep} icon={<PlusOutlined />} style={{ marginTop: '10px' }}>
            Add Funnel Step
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FunnelForm;

import { Collapse, Input, Button, Select, Form } from 'antd';
import React, { useState } from 'react';
import MyIcon from '../Icon/MyIcon';
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import '../Modals/styles/ModalStyles.css'

const { Panel } = Collapse;
const { Option } = Select;

const FunnelForm = ({ initialValues = {}, onFinish, onCancel}) => {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState(initialValues.steps || []);

  const handleAddStep = () => {
    setSteps([...steps, { name: '', description: '', url: '' }]);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
    form.setFieldsValue({ steps: updatedSteps });
  };

  return (
    <Form form={form} initialValues={initialValues} onFinish={(values) => onFinish({ ...values, steps })} layout="vertical">
      <Form.Item
        name="name"
        label="Funnel Name"
        rules={[{ required: true, message: "Funnel Name is required." }]}
      >
        <Input placeholder="Type Name..." />
      </Form.Item>

      <Form.Item name="funnel_type" label="Funnel Type" initialValue="sales">
        <Select placeholder="Select Funnel Type">
          <Option value="sales">Sales Funnel</Option>
          <Option value="marketing">Marketing Funnel</Option>
          <Option value="leadGeneration">Lead Generation</Option>
          <Option value="conversion">Conversion Funnel</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Description is required." }]}
      >
        <Input.TextArea rows={4} placeholder="Type Description..." />
      </Form.Item>

      <Collapse
        defaultActiveKey={[1]}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <DownOutlined
            style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)' }}
          />
        )}
      >
        <Panel header={<span className="panel-header"><MyIcon type="products" style={{ marginRight: "5px" }} />Funnel Steps</span>} key="1">
          {steps.map((step, index) => (
            <div key={index} className="funnel-step">
              <Form.Item
                name={['steps', index, 'name']}
                label={`Funnel Step #${index + 1} - Name`}
                rules={[{ required: true, message: "Step Name is required." }]}
              >
                <Input placeholder="Type Step Name..." onChange={(e) => handleStepChange(index, 'name', e.target.value)} />
              </Form.Item>

              <Form.Item
                name={['steps', index, 'description']}
                label="Step Description"
                rules={[{ required: true, message: "Step Description is required." }]}
              >
                <Input.TextArea rows={2} placeholder="Type Step Description..." onChange={(e) => handleStepChange(index, 'description', e.target.value)} />
              </Form.Item>

              <Form.Item
                name={['steps', index, 'url']}
                label="Step URL"
                rules={[
                  { required: true, message: "URL is required." },
                  { type: 'url', message: "Invalid URL format." }
                ]}
              >
                <Input placeholder="Paste URL..." onChange={(e) => handleStepChange(index, 'url', e.target.value)} />
              </Form.Item>
            </div>
          ))}

          <Button type="dashed" onClick={handleAddStep} icon={<PlusOutlined />} style={{ marginTop: '10px' }}>
            Add Funnel Step
          </Button>
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
        <MyIcon type={"tick"} />Add Funnel
        </Button>
          </span>
        </div>
    </Form>
  );
};

export default FunnelForm;

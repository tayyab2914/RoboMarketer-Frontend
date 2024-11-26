import React, { useEffect, useState } from "react";
import { Collapse, Input, Button, Select, Form } from "antd";
import MyIcon from "../Icon/MyIcon";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import "../Modals/styles/ModalStyles.css";
import { ICONS } from "../../data/IconData";

const { Panel } = Collapse;
const { Option } = Select;

const EditFunnelForm = ({ initialValues = {}, onFinish,onClose }) => {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState(initialValues.steps || []);

  useEffect(() => {
    console.log("EditFunnelForm rerendered with values:", initialValues);
    if (initialValues && Object.keys(initialValues).length > 0) {
      form.setFieldsValue(initialValues);
      setSteps(initialValues.steps || []); // Ensure steps are set to initial values
    }
  }, [initialValues, form]);

  const handleAddStep = () => {
    setSteps([...steps, { name: "", description: "", url: "" }]);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
    form.setFieldsValue({ steps: updatedSteps });
  };

  return (
   <>
    
    <Form form={form} initialValues={initialValues} onFinish={(values) => onFinish({ ...values, steps })} layout="vertical" >
    <div className="custom-modal-content modal-content"> <Form.Item name="name" label="Funnel Name" rules={[{ required: true, message: "Funnel Name is required." }]}   className='form-item'
                required={false}>
        <Input placeholder="Type Name..." />
      </Form.Item>

      <Form.Item name="funnel_type" label="Funnel Type" initialValue="sales"   className='form-item'
                required={false}>
        <Select placeholder="Select Funnel Type">
          <Option value="sales">Sales Funnel</Option>
          <Option value="marketing">Marketing Funnel</Option>
          <Option value="leadGeneration">Lead Generation</Option>
          <Option value="conversion">Conversion Funnel</Option>
        </Select>
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true, message: "Description is required." }]}   className='form-item'
      required={false}>
        <Input.TextArea rows={4} placeholder="Type Description..." />
      </Form.Item>

      <Collapse defaultActiveKey={[0]} expandIconPosition="end" expandIcon={({ isActive }) => ( <img src={ICONS.arrow_down} height={7} style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)" }} /> )}>
        <Panel header={ <span className="panel-header"> <MyIcon type="products" style={{ marginRight: "5px" }} /> Funnel Steps </span> } key="1" >
          {steps.map((step, index) => (
            <div key={index} className="funnel-step">
              <Form.Item name={["steps", index, "name"]} label={`Funnel Step #${index + 1} - Name`} rules={[{ required: true, message: "Step Name is required." }]}   className='form-item'
                required={false}>
                <Input  placeholder="Type Step Name..." onChange={(e) => handleStepChange(index, "name", e.target.value) } value={step.name} />
              </Form.Item>

              <Form.Item name={["steps", index, "description"]} label="Step Description" rules={[{ required: true, message: "Step Description is required." }]}   className='form-item'
                required={false}>
                <Input.TextArea rows={2} placeholder="Type Step Description..." onChange={(e) => handleStepChange(index, "description", e.target.value) } value={step.description} />
              </Form.Item>

              <Form.Item name={["steps", index, "url"]} label="Step URL" rules={[ { required: true, message: "URL is required." }, { type: "url", message: "Invalid URL format." }, ]}   className='form-item'
                required={false}>
                <Input placeholder="Paste URL..." onChange={(e) => handleStepChange(index, "url", e.target.value) } value={step.url} />
              </Form.Item>
            </div>
          ))}

          <Button type="dashed" onClick={handleAddStep} icon={<PlusOutlined />} style={{ marginTop: "10px" }} > Add Funnel Step
          </Button>
        </Panel>
      </Collapse>
      </div>
    
    
    <div className="modal-actions">
    <span className="btn-2">
  <Button type="primary" htmlType="submit" className="create-btn">
  <MyIcon type={"tick"} />Update Funnel
  </Button>
    </span>
  <span className="btn-1">
  <Button onClick={() => {
      form.resetFields()
      onClose()
  }} className="cancel-btn">
  <MyIcon type={"cross_red"} /> Cancel
  </Button>
    </span>
  </div></Form></>
  
  );
};

export default EditFunnelForm;

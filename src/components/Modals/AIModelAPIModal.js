import React, { useState } from "react";
import { Modal, Input, Button, Select, Form } from "antd";
import MyIcon from "../Icon/MyIcon";
import { useDispatch, useSelector } from "react-redux";
import "./styles/ModalStyles.css";
import "./styles/AIModelAPIModal.css";
import { API_UPDATE_API_KEY } from "../../apis/ChatApis";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

const { Option } = Select;

const AIModelAPIModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { token, rerender_dashboard } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const [APIKey, setAPIKey] = useState("");
  const [aiModelType, setAiModelType] = useState("gpt-3.5");

  const handleSubmit = async () => {
    console.log(APIKey, aiModelType);
    await API_UPDATE_API_KEY(token, APIKey, aiModelType);
    dispatch(setRerenderDashboard(!rerender_dashboard));
    onClose();
  };

  return (
    <div className="chatgpt-modal">
      <Modal title={false} centered visible={isVisible} onCancel={onClose} closable={false} footer={null}>
        <div className="custom-modal-header" style={{ display: "flex" }}>
          <span className="product-modal-header" style={{ width: "100%" }}>
            <span>
              <MyIcon type="ai_model_api" style={{ marginRight: "5px" }} size="md" /> AI Model API
              <MyIcon type={"question_round"} style={{ marginLeft: "5px" }} />
            </span>
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>
        <div style={{ padding: "5px 15px 0px 15px" }}>
          <p className="input-group-label">Add Your AI Model API To RoboMarketer</p>
          <Form initialValues={{ api_key: APIKey, ai_model: "gpt-3.5" }}>
          <Form.Item name="ai_model" style={{ marginBottom: 10 }}>
              <Select size="middle" value={aiModelType} onChange={(value) => setAiModelType(value)} className="ai-model-select">
                <Option value="GPT-3.5">GPT-3.5</Option>
                <Option value="GPT-4">GPT-4</Option>
                <Option value="DeepSeek">DeepSeek</Option>
              </Select>
            </Form.Item>
            <Form.Item name="api_key" >
              <Input placeholder="Enter ChatGPT API key" style={{height:"40px",margin:"0px"}} value={APIKey} onChange={(e) => setAPIKey(e.target.value)} />
            </Form.Item>
            
          </Form>
        </div>
        <div className="modal-actions">
          <span className="btn-2" onClick={handleSubmit}>
            <Button type="primary" htmlType="submit" className="create-btn">
              <MyIcon type={"tick"} /> Save
            </Button>
          </span>
          <span className="btn-1">
            <Button onClick={onClose} className="cancel-btn">
              <MyIcon type={"cross_red"} /> Cancel
            </Button>
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default AIModelAPIModal;

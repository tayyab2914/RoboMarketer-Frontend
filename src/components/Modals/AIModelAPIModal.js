import React, { useState } from "react";
import { Modal, Input, Button, Form, Collapse, Radio } from "antd";
import MyIcon from "../Icon/MyIcon";
import { useDispatch, useSelector } from "react-redux";
import "./styles/ModalStyles.css";
import "./styles/AIModelAPIModal.css";
import { API_UPDATE_API_KEY } from "../../apis/ChatApis";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";
import { AI_MODELS } from "../../utils/GlobalSettings";

const { Panel } = Collapse;

const AIModelAPIModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { token, rerender_dashboard } = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const [APIKey, setAPIKey] = useState("");
  const [aiModelType, setAiModelType] = useState("gpt-4o");
  const [selectedModelName, setSelectedModelName] = useState("GPT-4o");

  const handleModelChange = (value, name) => {
    setAiModelType(value);
    setSelectedModelName(name);
  };

  const handleSubmit = async () => {
    console.log(APIKey, aiModelType);
    await API_UPDATE_API_KEY(token, APIKey, aiModelType);
    dispatch(setRerenderDashboard(!rerender_dashboard));
    onClose();
  };

  return (
    <div className="chatgpt-modal">
      <Modal title={false} centered open={isVisible} onCancel={onClose} closable={false} footer={null}>
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
          <Form initialValues={{ api_key: APIKey }}>
            <Form.Item name="ai_model">
              {/* Parent Collapse - Shows Selected Model */}
              <Collapse accordion>
                <Panel header={`Selected Model: ${selectedModelName}`} key="selectedModel">
                  <Collapse accordion expandIconPosition="end">
                    {Object.keys(AI_MODELS).map((company) => (
                      <Panel
                        header={
                          <span>
                            <MyIcon type={AI_MODELS[company].icon} style={{ marginRight: "5px" }} />
                            {company}
                          </span>
                        }
                        
                        key={company}
                      >
                        <Radio.Group
                          value={aiModelType}
                          onChange={(e) =>
                            handleModelChange(
                              e.target.value,
                              AI_MODELS[company].models.find((m) => m.value === e.target.value).name
                            )
                          }
                          style={{ display: "flex", flexDirection: "column", alignItems: "start" }}
                        >
                          {AI_MODELS[company].models.map((model) => (
                            <Radio key={model.value} value={model.value}>
                              {model.name}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </Panel>
                    ))}
                  </Collapse>
                </Panel>
              </Collapse>
            </Form.Item>

            <Form.Item name="api_key">
              <Input
                placeholder="Enter API key"
                style={{ height: "40px", margin: "0px" }}
                value={APIKey}
                onChange={(e) => setAPIKey(e.target.value)}
              />
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

import React, { useState } from "react";
import { Modal, Input, Button,  Upload, Form,  } from "antd";
import MyIcon from "../Icon/MyIcon";
import { useDispatch, useSelector } from "react-redux";
import "./styles/ModalStyles.css";
import { NAME_RULES_REQUIRED } from "./AccountModal";
import './styles/ChatgptModal.css'
import { API_KEY_RULES_REQUIRED } from "../../utils/Rules";

const ChatgptAPIModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [APIKey, setAPIKey] = useState('736346384394');

    const handleHowToFindChatGPTapi = ()=>{
        console.log('handleHowToFindChatGPTapi')
    }
    const handleSubmit = ()=>{
        console.log(APIKey)
    }
  return (
    <div className="chatgpt-modal">
      <Modal className="" title={false} centered visible={isVisible} onCancel={onClose} closable={false} footer={null} >
      <div className="custom-modal-header" style={{ display: "flex" }}>
          <span className="product-modal-header" style={{ width: "100%" }}>
            <span> <MyIcon type="chatgpt" style={{ marginRight: "5px" }} size="md" /> ChatGPT API</span>
            <Button icon={<MyIcon type={'question_round'}/>} className="add-product-btn" onClick={handleHowToFindChatGPTapi} >  How To Find ChatGPT API </Button>
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>
        <div style={{padding:"15px 15px 0px 15px"}}>
        <p className="input-group-label">Paste ChatGPT API Key</p>
          <div className=" form-item chatgpt-modal-form">
              <Form initialValues={{ api_key: APIKey}}>
                <Form.Item name="api_key" rules={API_KEY_RULES_REQUIRED} style={{ marginBottom: 0 }} >
                  <Input placeholder="Enter ChatGPT API key" value={APIKey} onChange={(e) => setAPIKey(e.target.value)}/>
                </Form.Item>
              </Form>
          </div>
        </div>
        <div className="modal-actions">
            <span className="btn-2" onClick={handleSubmit}> <Button type="primary" htmlType="submit" className="create-btn"> <MyIcon type={"tick"} /> Save </Button> </span>
            <span className="btn-1"> <Button onClick={onClose} className="cancel-btn"> <MyIcon type={"cross_red"} /> Cancel </Button>  </span>
        </div>
      </Modal>
    </div>
  );
};

export default ChatgptAPIModal;

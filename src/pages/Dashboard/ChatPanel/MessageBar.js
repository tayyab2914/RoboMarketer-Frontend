import React, { useState } from "react";
import { Row, Col, Badge } from "antd";
import MyIcon from "../../../components/Icon/MyIcon";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setRerenderChatPanel,
  setTemporaryMessage,
  setRerenderDashboard,
} from "../../../redux/AuthToken/Action";
import { API_GET_RESPONSE } from "../../../apis/ChatApis";
import { RENDER_FILE_PREVIEW, SHOW_API_NOT_SETUP_ERROR, SHOW_ERROR } from "../../../utils/Methods";
import "./styles/MessageBar.css";
import UpdateAccessComponent from "../UpdateAccessComponent";
import Banners from "./Banners";

const MessageBar = ({ isDisabled,selectedChannel }) => {
  const dispatch = useDispatch();
  const { token, rerender_chat_panel, rerender_dashboard, current_account } = useSelector((state) => state.authToken);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [LimitEnded, setLimitEnded] = useState(false);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setIsFileUploading(true); // Start file upload process
      setFile(selectedFile);

      // Simulate file upload completion after 2 seconds (or replace with actual upload logic)
      setTimeout(() => {
        setIsFileUploading(false); // Mark upload as complete
      }, 2000);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsFileUploading(false); // Reset upload state when file is removed
    document.getElementById("file-upload").value = null;
  };

  const handleSendMessage = async () => {
  
    if(selectedChannel?.id == -1)
    {
        SHOW_ERROR("Please select a channel")
        return
    }
    if(!current_account?.is_openapi_setup)
    {
        SHOW_API_NOT_SETUP_ERROR()
        return
    }
    if (!message && !file) return;

    const localMessage = message || " ";
    const localFile = file;
    console.log("1. ",{ message, file })
    dispatch(setTemporaryMessage({ message, file }));
    setMessage("");
    setFile(null);

    if (localMessage.trim() || localFile) {
      setShowSpinner(true);

      const formData = new FormData();
      if (localFile) {
        formData.append("file_group", localFile);
      }
      formData.append("message", localMessage);
      formData.append("channel_id", selectedChannel?.id);

      try {
        const response = await API_GET_RESPONSE( token, localMessage, formData, setShowSpinner );
        dispatch(setRerenderDashboard(!rerender_dashboard));
        if(response?.limit_end)
        {
          setLimitEnded(true)
        }
        dispatch(setTemporaryMessage(null));
        dispatch(setRerenderChatPanel(!rerender_chat_panel));
      } catch (error) {
        console.error("Error sending message/file:", error);
      } finally {
        dispatch(setTemporaryMessage(null));
        console.log("Error sending mes")
        setShowSpinner(false);
      }
    }
  };

  return (
    <>
    <Banners/>
    <Row align="middle" className="message-bar">
      <Col xs={24}>
        {file && (
          <div className="file-preview-container">
            <Badge count={ <CloseOutlined onClick={handleRemoveFile} className="file-preview-container-badge-icon" /> } className="file-preview-container-badge">
              {RENDER_FILE_PREVIEW(file, 30, false)}
            </Badge>
          </div>
        )}
      </Col>
      <Col>
        <label htmlFor="file-upload">
          <MyIcon type="plus_black" className={`message-bar-plus ${isFileUploading ? "disabled" : ""}`} size="lg" style={{ cursor: isFileUploading ? "not-allowed" : "pointer" }} />
        </label>
        <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileSelect} accept=".docs, .docx" disabled={isFileUploading} />
      </Col>
      <Col flex="auto">
        <input
          type="text"
          placeholder="Type Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-bar-input"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isFileUploading) handleSendMessage();
          }}
        />
      </Col>
      {LimitEnded && <UpdateAccessComponent visible={LimitEnded} onClose={()=>setLimitEnded(false)} modal={true}/>}
      <Col>
        <MyIcon type="arrow_up" size="lg" className={`message-arrow-up ${isFileUploading ? "disabled-icon" : ""}`} onClick={!isFileUploading ? handleSendMessage : undefined}/>
      </Col>
    </Row></>

  );
};

export default MessageBar;
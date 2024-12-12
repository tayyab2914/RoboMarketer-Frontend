import React, { useState } from "react";
import { Row, Col, Badge } from "antd";
import MyIcon from "../../../components/Icon/MyIcon";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setRerenderChatPanel,
  setTemporaryMessage,
} from "../../../redux/AuthToken/Action";
import { API_GET_RESPONSE } from "../../../apis/ChatApis";
import { RENDER_FILE_PREVIEW } from "../../../utils/Methods";
import "./styles/MessageBar.css";

const MessageBar = ({ isDisabled }) => {
  const dispatch = useDispatch();
  const { token, rerender_chat_panel } = useSelector((state) => state.authToken);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setIsFileUploading(true); // Start file upload process
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);

      // Simulate file upload completion after 2 seconds (or replace with actual upload logic)
      setTimeout(() => {
        setIsFileUploading(false); // Mark upload as complete
        console.log("File upload complete");
      }, 2000);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsFileUploading(false); // Reset upload state when file is removed
    document.getElementById("file-upload").value = null;
  };

  const handleSendMessage = async () => {
    if (!message && !file) return;

    const localMessage = message || " ";
    const localFile = file;
    dispatch(setTemporaryMessage({ message, file }));
    dispatch(setRerenderChatPanel(!rerender_chat_panel));
    setMessage("");
    setFile(null);

    if (localMessage.trim() || localFile) {
      setShowSpinner(true);

      const formData = new FormData();
      if (localFile) {
        formData.append("file_group", localFile);
      }
      formData.append("message", localMessage);

      try {
        await API_GET_RESPONSE(
          token,
          localMessage,
          formData,
          setShowSpinner
        );
        console.log("GET REPOSNE")
        dispatch(setTemporaryMessage(null));
        dispatch(setRerenderChatPanel(!rerender_chat_panel));
      } catch (error) {
        console.error("Error sending message/file:", error);
      } finally {
        dispatch(setTemporaryMessage(null));
        setShowSpinner(false);
      }
    }
  };

  return (
    <Row align="middle" className="message-bar">
      <Col xs={24}>
        {file && (
          <div className="file-preview-container">
            <Badge
              count={
                <CloseOutlined
                  onClick={handleRemoveFile}
                  className="file-preview-container-badge-icon"
                />
              }
              className="file-preview-container-badge"
            >
              {RENDER_FILE_PREVIEW(file, 30, false)}
            </Badge>
          </div>
        )}
      </Col>
      <Col>
        <label htmlFor="file-upload">
          <MyIcon
            type="plus_black"
            className={`message-bar-plus ${isFileUploading ? "disabled" : ""}`}
            size="lg"
            style={{ cursor: isFileUploading ? "not-allowed" : "pointer" }}
          />
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept=".docs, .docx"
          disabled={isFileUploading}
        />
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
      <Col>
        <MyIcon
          type="arrow_up"
          size="lg"
          className={`message-arrow-up ${isFileUploading ? "disabled-icon" : ""}`}
          onClick={!isFileUploading ? handleSendMessage : undefined}
        //   style={{ cursor: isFileUploading ? "not-allowed" : "pointer" }}
        />
      </Col>
    </Row>
  );
};

export default MessageBar;

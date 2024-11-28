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

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    document.getElementById("file-upload").value = null;
  };

  const handleSendMessage = async () => {
    // if (!disabled) {
    if(!message)
    {
        setMessage(" ")
    }
    const local_message = message
    const local_file = file
      dispatch(setTemporaryMessage({message,file}));
        setMessage("")
        setFile(null)
      if (local_message.trim() || local_file) {
        setShowSpinner(true);

        const formData = new FormData();
        if (local_file) {
          formData.append("file_group", local_file);
        }
        formData.append("message", local_message);

        try {
        //   setdisabled(true);
          await API_GET_RESPONSE(
            token,
            local_message || " ",
            formData,
            setShowSpinner
          );
          dispatch(setRerenderChatPanel(!rerender_chat_panel));
        } catch (error) {
          console.error("Error sending message/file:", error);
        } finally {
          setMessage("");
        //   setdisabled(false);
          handleRemoveFile();
          dispatch(setTemporaryMessage(null));
          setShowSpinner(false);
        }
    //   }
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
          <MyIcon type="plus_black" className="message-bar-plus" size="lg" />
        </label>
        <input
          id="file-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelect}
          accept=".docs, .docx"
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
            if (e.key === "Enter") handleSendMessage();
          }}
        />
      </Col>
      <Col>
        <MyIcon
          type="arrow_up"
          size="lg"
          className="message-arrow-up"
          onClick={handleSendMessage}
        />
      </Col>
    </Row>
  );
};

export default MessageBar;

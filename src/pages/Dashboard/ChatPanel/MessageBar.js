import React, { useEffect, useState } from 'react';
import './styles/MessageBar.css';
import { Col, Input, Row, Badge } from 'antd';
import MyIcon from '../../../components/Icon/MyIcon';
import { CloseOutlined } from '@ant-design/icons';
import { API_GET_RESPONSE } from '../../../apis/ChatApis';
import { useDispatch, useSelector } from 'react-redux';
import { setRerenderChatPanel, setRerenderDashboard, setTemporaryMessage } from '../../../redux/AuthToken/Action';
import { FilePdfOutlined, FileExcelOutlined, FileWordOutlined, FileOutlined } from '@ant-design/icons';
import { RENDER_FILE_PREVIEW } from '../../../utils/Methods';

const MessageBar = () => {
  const dispatch = useDispatch();
  const [disabled, setdisabled] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, rerender_chat_panel,temporary_message } = useSelector((state) => state.authToken);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);


  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    const fileInput = document.getElementById("file-upload");
    fileInput.value = null; 
  };
  const handleSendMessage = async () => {
    if (!disabled) {
        dispatch(setTemporaryMessage(message))
      if (message.trim() || file) {
        setShowSpinner(true);

        const formData = new FormData();
        if (file) {
          formData.append('file_group', file); 
        }
        formData.append('message', message); 

        try {
            setdisabled(true)
            await API_GET_RESPONSE(token, message || null, formData, setShowSpinner);
            dispatch(setRerenderChatPanel(!rerender_chat_panel));
        } catch (error) {
            console.error("Error sending message/file:", error);
        } finally {
            setMessage("");
            setdisabled(false)
            handleRemoveFile();
            dispatch(setTemporaryMessage(null))
            setShowSpinner(false);
        }
      }
    }
  };

  return (
    <Row align="middle" className="message-bar">
      <Col className="file-preview-container">
        <label htmlFor="file-upload"> <MyIcon type={"plus_black"} className={`message-bar-plus ${disabled ? 'disabled-icon' : ''}`} size="xl" /> </label>
        {file && ( <div className="file-preview-container"> <Badge count={ <CloseOutlined onClick={handleRemoveFile} style={{ fontSize: 14, color: 'red', cursor: 'pointer', }} /> } style={{ marginLeft: '0px', cursor: 'pointer', position:"relative", left:"-20px", top:"-20px" }} > {RENDER_FILE_PREVIEW(file)}</Badge> </div> )}
        <input id="file-upload" type="file" style={{ display: 'none' }} onChange={handleFileSelect} disabled={disabled} />
      </Col>
      <Col flex="auto">
        <Input placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onPressEnter={handleSendMessage} className="message-bar-input" disabled={disabled} />
      </Col>
      <Col>
        <MyIcon type={"arrow_up"} onClick={message ? () => handleSendMessage() : null} size="lg" className={`message-arrow-up ${message && !disabled ? "" : "disabled-icon"}`} />
      </Col>
    </Row>
  );
};

export default MessageBar;

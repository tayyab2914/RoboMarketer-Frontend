import React, { useState } from 'react';
import './styles/MessageBar.css';
import { Col, Input, Row, Tooltip } from 'antd';
import MyIcon from '../../../components/Icon/MyIcon';
import { API_GET_RESPONSE } from '../../../apis/ChatApis';
import { useDispatch, useSelector } from 'react-redux';
import { setRerenderChatPanel } from '../../../redux/AuthToken/Action';
import { FilePdfOutlined, FileExcelOutlined, FileWordOutlined, FileOutlined } from '@ant-design/icons';
import { RENDER_FILE_PREVIEW } from '../../../utils/Methods';

const MessageBar = ({ disabled }) => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, rerender_chat_panel } = useSelector((state) => state.authToken);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // State to handle selected files

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);
    }
  };

  // Function to send file or message
  const handleSendMessage = async () => {
        if (!disabled) {
          if (message.trim() || file) {
            setShowSpinner(true);
    
            const formData = new FormData();
            if (file) {
              formData.append('file_group', file); // Add file to formData
            }
            formData.append('message', message); // Add message to formData
    
            try {
              await API_GET_RESPONSE(token, message || null, formData, setShowSpinner);
              dispatch(setRerenderChatPanel(!rerender_chat_panel));
            } catch (error) {
              console.error("Error sending message/file:", error);
            } finally {
              setMessage("");
              setFile(null);
              setShowSpinner(false);
            }
          }
        }
    
    
  };
  return (
    <>
    <Row align="middle" className="message-bar">
      <Col className='file-preview-container'>
        <label htmlFor="file-upload">
          <MyIcon
            type={'plus_black'}
            className={`message-bar-plus ${disabled ? 'disabled-icon' : ''}`}
            size='xl'
          />
        </label>
        
    {file && (
        <span className="file-preview-container">
          {RENDER_FILE_PREVIEW(file)}
        </span>
      )}
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
          disabled={disabled}
        />
      </Col>
      <Col flex="auto">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          className='message-bar-input'
          disabled={disabled}
        />
      </Col>
      <Col>
        <MyIcon
          type={'arrow_up'}
          onClick={handleSendMessage}
          size='lg'
          className={`message-arrow-up ${disabled ? 'disabled-icon' : ''}`}
        />
      </Col>

    </Row>
    </>
  );
};

export default MessageBar;

import React, { useState } from 'react';
import './styles/MessageBar.css';
import { Col, Input, Row } from 'antd';
import MyIcon from '../../../components/Icon/MyIcon';

const MessageBar = ({ disabled }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() && !disabled) {
      console.log("Message sent:", message);
      setMessage(""); 
    }
  };

  return (
    <Row align="middle" className="message-bar">
      <Col>
        <MyIcon
          type={'plus_black'}
          className={`message-bar-plus ${disabled ? 'disabled-icon' : ''}`}
          size='xl'
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
          size='md'
          className={`message-arrow-up ${disabled ? 'disabled-icon' : ''}`}
        />
      </Col>
    </Row>
  );
};

export default MessageBar;

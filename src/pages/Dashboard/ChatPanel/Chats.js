import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import './styles/Chats.css';
import { RobotOutlined } from '@ant-design/icons'; // Importing icons from Ant Design

const Chats = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account, rerender_chat_panel } = useSelector((state) => state.authToken);
  const [ChatData, setChatData] = useState([]);

  // Reference to the container that holds the messages
  const chatContainerRef = useRef(null);

  const get_history = async () => {
    const response = await API_GET_HISTORY(token, current_account?.id, setShowSpinner);
    setChatData(response?.reverse());
    console.log(response);
  };

  useEffect(() => {
    get_history();
  }, [rerender_chat_panel]);

  useEffect(() => {
    // Scroll to the bottom when the chat data changes (new messages added)
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [ChatData]); // Scrolls every time ChatData is updated

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {ChatData?.map((item, index) => (
        <div key={index} className="chat-message-container">
          
          {/* User's message */}
          <div className="user-message">
            <span className="message">{item?.message}</span>
          </div>

          {/* Bot's response */}
          <div className="bot-response">
            <div className="response-content">
              <RobotOutlined className="response-icon" /> {/* Bot icon from Ant Design */}
              <span className="response-text">{item?.response}</span>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Chats;

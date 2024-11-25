import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import "./styles/Chats.css";
import { RobotOutlined } from "@ant-design/icons"; // Importing icons from Ant Design
import DOMPurify from "dompurify";
import MyIcon from "../../../components/Icon/MyIcon";

const Chats = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const {
    isLoggedIn,
    token,
    current_account,
    rerender_chat_panel,
    temporary_message,
  } = useSelector((state) => state.authToken);
  const [ChatData, setChatData] = useState([]);

  // Reference to the container that holds the messages
  const chatContainerRef = useRef(null);

  const get_history = async () => {
    const response = await API_GET_HISTORY(
      token,
      current_account?.id,
      setShowSpinner
    );
    setChatData(response?.reverse());
  };

  useEffect(() => {
    get_history();
  }, [rerender_chat_panel]);

  useEffect(() => {
    // Scroll to the bottom when the chat data changes (new messages added)
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [ChatData, temporary_message]); // Scrolls every time ChatData is updated
  const parseHTML = (htmlContent) => {
    return {
      __html: DOMPurify.sanitize(htmlContent), // Sanitize HTML to prevent XSS attacks
    };
  };
  return (
    <div className="chat-container" ref={chatContainerRef}>
      {ChatData?.map((item, index) => (
        <>
          <div key={index} className="chat-message-container">
            {/* User's message */}
            <div className="user-message">
              <span className="message">{item?.message}</span>
            </div>

            <div className="bot-response">
              <span className="robot-icon-wrapper">
                <MyIcon type={"robot"} className={"response-icon"} size="md" />
              </span>
              <div className="response-content">
                <div />
                <span
                  className="response-text"
                  dangerouslySetInnerHTML={parseHTML(item?.response)}
                ></span>
              </div>
            </div>
          </div>
        </>
      ))}
      {temporary_message && (
        <div className="chat-message-container">
          <div className="user-message">
            <span className="message">{temporary_message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
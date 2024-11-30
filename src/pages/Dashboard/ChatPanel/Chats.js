import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import "./styles/Chats.css";
import DOMPurify from "dompurify";
import MyIcon from "../../../components/Icon/MyIcon";
import { setTemporaryMessage } from "../../../redux/AuthToken/Action";
import renderFile, { formatTextToHTML } from "../../../utils/Methods";
import { DOMAIN_NAME } from "../../../utils/GlobalSettings";
import { CiCircleFilled } from "@ant-design/icons";
import AccountSetupComponent from "./AccountSetupComponent";
import FacebookIntegration from "../FacebookIntegration";
import FacebookIntegrationSelectAccount from "../FacebookIntegrationSelectAccount";

const Chats = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { token, current_account, rerender_chat_panel, temporary_message,facebook_state } =
    useSelector((state) => state.authToken);
    // const [isAccountSetup, setisAccountSetup] = useState(current_account?.is_facebook_connected);
  
  const [ChatData, setChatData] = useState([]);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
//   useEffect(() => {
//     setisAccountSetup(current_account?.is_facebook_connected);
//   }, [current_account?.is_facebook_connected]);
  // Fetch chat history
  const get_history = async () => {
    const response = await API_GET_HISTORY(
      token,
      current_account?.id,
      setShowSpinner
    );
    setChatData(response?.reverse() || []);
    dispatch(setTemporaryMessage({})); // Clear temporary message after fetching
  };

  useEffect(() => {
    get_history();
  }, [rerender_chat_panel]);

  // Add temporary message to ChatData
  useEffect(() => {
    if (temporary_message?.message || temporary_message?.file) {
      setChatData((prev) => [
        ...prev,
        {
          message: temporary_message?.message,
          response: null,
          isLoading: true,
          uploads: temporary_message?.file ? [temporary_message.file] : [],
        },
      ]);
      get_history();
    }
  }, [temporary_message]);

  // Auto-scroll to the bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [ChatData]);

  // Sanitize HTML
  const parseHTML = (htmlContent) => ({
    __html: DOMPurify.sanitize(htmlContent),
  });

  return (
    <div className="chat-container" ref={chatContainerRef}>
  {!current_account?.is_facebook_connected && <><FacebookIntegration isInIntegrationComponent={false}  /></>}
  {ChatData.map((item, index) => (
        <div key={index} className="chat-message-container">
          <div className="user-message">
            <div style={{ display: "block" }}>
              {item?.uploads && item?.uploads.map((upload, idx) => ( <div key={idx}> {renderFile(`${DOMAIN_NAME}${upload.file}`, upload.file)} </div> ))}
            </div>
            <div className="user-message-div">
              <span className="message" ><span dangerouslySetInnerHTML={{ __html: item?.message && DOMPurify.sanitize(formatTextToHTML(item?.message))}}></span></span>
            </div>
          </div>

          <div className="bot-response">
            <span className="robot-icon-wrapper">
              <MyIcon type="robot" className="response-icon" size="md" style={item.isLoading ? { opacity: 0.5 } : { opacity: 1 }} />
            </span>
            <div className="bot-response-content">
            {item.isLoading ? (
                <span className="response-text"></span> 
                ) : item?.response ? (
                <span
                    className="response-text"
                    dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(formatTextToHTML(item?.response)),
                    }}
                ></span> 
                ) : (
                <span className="chat-loader"></span> 
                )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;

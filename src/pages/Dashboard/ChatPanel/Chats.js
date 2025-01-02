import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import "./styles/Chats.css";
import DOMPurify from "dompurify";
import MyIcon from "../../../components/Icon/MyIcon";
import { setTemporaryMessage } from "../../../redux/AuthToken/Action";
import renderFile, {  formatTextToHTML, PARSED_TEXT } from "../../../utils/Methods";
import { DOMAIN_NAME } from "../../../utils/GlobalSettings";
import { CiCircleFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import AccountSetupComponent from "./AccountSetupComponent";
import FacebookIntegration from "../FacebookIntegration";
import FacebookIntegrationSelectAccount from "../FacebookIntegrationSelectAccount";
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import RoboMarketerMessage from "../RoboMarketerMessage";
import AddProductMessage from "../AddProductMessage";
import AddFunnelMessage from "../AddFunnelMessage";
import { Tag } from "antd";

const Chats = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [getHistoryCalled, setgetHistoryCalled] = useState(false);
  const { token, current_account, rerender_chat_panel, temporary_message,facebook_state } =
    useSelector((state) => state.authToken);
  
  const [ChatData, setChatData] = useState([]);
  const chatContainerRef = useRef(null);
  const dispatch = useDispatch();
  const get_history = async () => {
    console.log("GET HISTORT CALLED")
    const response = await API_GET_HISTORY(
      token,
      current_account?.id,
      setShowSpinner
    );

    console.log("GET HISTORT RETURNED",response)
    
    setChatData(response?.reverse() || []);
  };

  useEffect(() => {
    get_history();
  }, []);

  useEffect(() => {
    console.log("2. ",temporary_message)
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
    //   if(temporary_message?.sent_from_left_panel && !temporary_message?.wait)
    //     {
    //         get_history()
    //     } 
    }
  }, [temporary_message]);

  useEffect(()=>{
    console.log("3. ",temporary_message)
    if(!temporary_message)
    {
        get_history()
    }
  },[temporary_message])
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [ChatData]);


  return (
    <div className="chat-container" ref={chatContainerRef}>
  {<><FacebookIntegration isInIntegrationComponent={false}  /></>}
  {current_account?.is_facebook_connected && <RoboMarketerMessage/>}
  {current_account?.is_facebook_connected && current_account?.is_robomarketeriq_setup && <AddProductMessage/>}
  {current_account?.is_facebook_connected && current_account?.is_robomarketeriq_setup &&  current_account?.is_product_setup && <AddFunnelMessage/>}

  {ChatData?.map((item, index) => (
        <div key={index} className="chat-message-container">
          <div className="user-message">
            <div style={{ display: "block" }}>
              {item?.uploads && item?.uploads.map((upload, idx) => ( <div key={idx}> {renderFile(`${DOMAIN_NAME}${upload.file}`, upload.file)} </div> ))}
            </div>
            <div className="user-message-div">
              
            <span  className="message"  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(formatTextToHTML(item?.message)) } }></span>
            </div>
          </div>

          <div className="bot-response">
            <span className="robot-icon-wrapper">
              <MyIcon type="robot" className="response-icon" size="md"  />
            </span>
            <div className="bot-response-content">
            {item.isLoading ? (<span style={{display:"flex"}}>
                <span className="response-text"></span> 
                <span className="chat-loader"></span> </span>
                ) : item?.response ? (
                <div className="response-text-wrapper">
                    <span
                    className="response-text"
                ><Markdown remarkPlugins={[remarkGfm]}>
                    {item?.response}
                </Markdown></span> 
                </div>
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

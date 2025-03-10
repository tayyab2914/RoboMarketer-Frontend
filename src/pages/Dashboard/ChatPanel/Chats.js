import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Chats.css";
import DOMPurify from "dompurify";
import MyIcon from "../../../components/Icon/MyIcon";
import { setTemporaryResponse } from "../../../redux/AuthToken/Action";
import renderFile, { formatTextToHTML } from "../../../utils/Methods";
import { DOMAIN_NAME } from "../../../utils/GlobalSettings";
import FacebookIntegration from "../FacebookIntegration";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RoboMarketerMessage from "../RoboMarketerMessage";
import AddProductMessage from "../AddProductMessage";
import AddFunnelMessage from "../AddFunnelMessage";
import SummaryMessageView from "../../../components/JsonMessageView/SummaryMessageView/SummaryMessageView";
import CampaignMessage from "../../../components/JsonMessageView/CampaignMessageView/products";
import RecommendationsList from "../../../components/JsonMessageView/RecommendationMessageView/RecommendationsList";
import { Brain, CircleArrowDown, Forward, RotateCw, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button, message } from "antd";

const Chats = ({ onLikeDislikeClick, submittedFeedback, prompts, chat_data }) => {
  const { channel, current_account, temporary_message, temporary_loading, temporary_response, } = useSelector((state) => state.authToken);
  const [ChatData, setChatData] = useState(chat_data);
  const chatContainerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const PAGE_LIMIT = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    setChatData(chat_data);
  }, [chat_data]);

  useEffect(() => {
    if (temporary_message?.message || temporary_message?.file) {
      setChatData((prev) => [
        ...prev,
        {
          message: temporary_message?.message,
          type: "USER",
          uploads: temporary_message?.file ? [temporary_message.file] : [],
        },
        {
          message: "",
          type: "LLM",
          isLoading: true,
        },
      ]);
    }
  }, [temporary_message]);

  useEffect(() => {
    if (temporary_loading) {
      setChatData((prev) => {
        return [ ...prev.slice(0, -1), { ...prev[prev.length - 1], isLoading: true, },];
      });
    }
  }, [temporary_loading, temporary_response]);

  useEffect(() => {
    if (temporary_response) {
      setChatData((prev) => {
        const updatedChatData = [...prev];
        const lastLLMIndex = updatedChatData.findLastIndex( (item) => item.type === "LLM" && item.isLoading );
        if (lastLLMIndex !== -1) {
          updatedChatData[lastLLMIndex] = { ...temporary_response, isLoading: false, };
        } else {
          if (lastLLMIndex === -1 && submittedFeedback?.type === "redo") {
            updatedChatData[ChatData?.length - 1] = { ...temporary_response, isLoading: false, };
          } else {
            dispatch(setTemporaryResponse(null));
          }
        }
        return updatedChatData;
      });
    }
  }, [temporary_response]);

  useEffect(() => {
    submittedFeedback.id = "";
  }, [temporary_message]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =chatContainerRef.current.scrollHeight;
    }
  }, [ChatData, currentPage, isLoadingMore]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success("Message Copied Successfully");
    } catch (err) {
      message.error("Failed to copy message");
    }
  };

  const scrollToBottom = () => {
    const scrollElement = chatContainerRef.current;
    if (scrollElement) {
      scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: "smooth", });
    }
  };

  const getChatHeight = () => {
    const { is_facebook_connected, is_openapi_setup } = current_account || {};
  
    if (!is_facebook_connected && !is_openapi_setup) return "calc(100vh - 160px)";
    if (!is_facebook_connected || !is_openapi_setup) return "calc(100vh - 120px)";
    
    return "calc(100vh - 80px)";
  };
  

  return (
    <>
      <div className="chat-container" ref={chatContainerRef} style={{ height: getChatHeight() }}      >
        {channel?.name == "General" && ( <> <FacebookIntegration isInIntegrationComponent={false} /> </> )}
        {channel?.name == "General" && current_account?.is_facebook_connected && <RoboMarketerMessage />}
        {channel?.name == "General" && current_account?.is_facebook_connected && current_account?.is_robomarketeriq_setup && <AddProductMessage />}
        {channel?.name == "General" && current_account?.is_facebook_connected && current_account?.is_robomarketeriq_setup && current_account?.is_product_setup && <AddFunnelMessage />}

        {ChatData?.map((item, index) => {
          item.meta_data = (typeof item.meta_data === 'string')  ? JSON.parse(item.meta_data) : item.meta_data;  
          item.json_message = (typeof item.json_message === 'string')  ? JSON.parse(item.json_message)    : item.json_message; 

          const isPositive = item?.feedback ? item.feedback.feedback_type === "positive" && item.feedback.response === item.id : !submittedFeedback?.id || (submittedFeedback.id === item.id && submittedFeedback.type === "positive");
          const isNegative = item?.feedback ? item.feedback.feedback_type === "negative" && item.feedback.response === item.id : !submittedFeedback?.id || (submittedFeedback.id === item.id && submittedFeedback.type === "negative");
          const isFeedBackSubmitted = submittedFeedback.id || item?.feedback;
          return (
            <div key={index} className="chat-message-container">
              {item.type === "USER" && (
                <div className="user-message">
                  <div style={{ display: "block" }}>
                    {item?.uploads && item.uploads.map((upload, idx) => ( <div key={idx}> {renderFile( `${DOMAIN_NAME}${upload.file}`, upload.file )} </div> ))}
                  </div>
                  <div className="user-message-div">
                    <span className="message" dangerouslySetInnerHTML={{  __html: DOMPurify.sanitize( formatTextToHTML(item?.message, prompts) ),  }} ></span>
                  </div>
                </div>
              )}
              {item.type === "LLM" && (
                <div className="bot-response">
                  <span className="robot-icon-wrapper">
                    <MyIcon type="robot" className="response-icon" size="md" />
                  </span>
                  <div className="bot-response-content">
                    {item.isLoading ? (
                      <span style={{ display: "flex" }}>
                        <span className="response-text"></span>
                        <span className="chat-loader"></span>
                      </span>
                    ) : (
                      <div>
                        <div className="response-text-wrapper">
                          {item.message_type === "TEXT" && item.message ? ( <Markdown remarkPlugins={[remarkGfm]}>{item.message}</Markdown>
                          ) : item.message_type === "JSON" && item.json_message && item.meta_data.contains === "summarize_data" ? (<SummaryMessageView data={item.json_message} level={item.json_message.level} currency={item.json_message.currency} />
                          ) : item.message_type === "JSON" && item.json_message && item.meta_data.contains === "recommendation_on_data" ? ( <RecommendationsList data={item.recommendations} />
                          ) : item.message_type === "JSON" && item.json_message && item.meta_data.contains === "create_campaign" ? ( <CampaignMessage data={item} /> ) : (
                            <span className="response-text"> No response available </span>
                          )}
                        </div>
                        {index === ChatData.length - 1 && (
                          <div className="response-buttons mt-2">
                            <div className="flex gap-2">
                              {item.message_type === "TEXT" && item?.message && ( <button className="view-ads-button flex gap-2" style={{width:"110px"}} onClick={() => handleCopy(item?.message)} > <Forward size={15} /> Share </button> )}
                              <button className="view-ads-button" style={{width:"110px"}} onClick={() => onLikeDislikeClick(item?.id, "redo") } > <RotateCw size={15} /> Redo </button>
                            </div>
                            <div className="feedback-btns flex">
                              <div className="flex gap-2 px-2">
                                <Brain size={15} /> <span className="feedback-text">Feedback</span>
                              </div>
                              {isPositive && (
                                <button className="like-dislike" onClick={() => { if (!isFeedBackSubmitted) onLikeDislikeClick(item?.id, "positive"); }} >
                                  <ThumbsUp  size={15} fill={ isFeedBackSubmitted ? "black" : "white" } />
                                </button>
                              )}
                              {isNegative && (
                                <button className="like-dislike" onClick={() => { if (!isFeedBackSubmitted) onLikeDislikeClick(item?.id, "negative"); }} >
                                  <ThumbsDown size={15} fill={ isFeedBackSubmitted ? "black" : "white" } />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isVisible && (
        <div className="dashboard-chat-panel-main-message-bar">
          <div className="back-to-bottom">
            <CircleArrowDown size={30} onClick={scrollToBottom} className="back-icon" />
          </div>
        </div>
      )}
    </>
  );
};

export default Chats;

import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./styles/DashboardChatPanel.css";
import MessageBar from "./MessageBar";
import AccountSetupComponent from "./AccountSetupComponent";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import { CircleArrowDown } from "lucide-react";
import { API_GET_PROMPTS } from "../../../apis/ChatApis";
import { API_GET_HISTORY } from "../../../apis/ChatApis";
import ChannelsPopup from "./Channels/ChannelsPopup";
const DashboardChatPanel = ({
  onLikeDislikeClick = () => {}, 
  submittedFeedback = null, 
  FetchedPrompts = [],
  limitEnded = false, 
  setLimitEnded = () => {}, 
  isAIResponseLoading = false, 
  setIsAIResponseLoading = () => {},
}) => {
  const {
    isLoggedIn,
    token,
    rerender_dashboard,
    facebook_state,
    rerender_chat_panel,
    current_account,
    channel,
  } = useSelector((state) => state.authToken);

  const [isAccountSetup, setisAccountSetup] = useState(
    current_account?.is_facebook_connected
  );

  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const data = await API_GET_PROMPTS(token);
      const allPrompts = data.reduce((acc, category) => {
        return [...acc, ...category.prompts];
      }, []);
      setPrompts(allPrompts);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };

  // Define the missing scrollableRef
  const scrollableRef = useRef(null);

  const [ChatData, setChatData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);

  const get_history = async () => {
    try {
      const response = await API_GET_HISTORY(token, current_account?.id, channel);
      setChatData(response?.reverse() || []);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    get_history();
  }, [selectedChannel, rerender_dashboard]);

  return (
    <Row className="dashboard-chat-panel-main">
      <Col ref={scrollableRef} style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <ChannelsPopup setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel} />
        <Chats
          isaccount_open={!isAccountSetup}
          chat_data={ChatData}
          get_history={get_history}
          selectedChannel={selectedChannel}
          onLikeDislikeClick={onLikeDislikeClick}
          submittedFeedback={submittedFeedback}
          prompts={prompts}
        />
      </Col>

      <Col className="dashboard-chat-panel-main-message-bar">
        <MessageBar
          isDisabled={!isAccountSetup}
          limitEnded_Redo={limitEnded}
          setLimitEnded_Redo={setLimitEnded}
          isAIResponseLoading={isAIResponseLoading}
          setIsAIResponseLoading={setIsAIResponseLoading}
          selectedChannel={selectedChannel}
        />
      </Col>
    </Row>
  );
};

export default DashboardChatPanel;

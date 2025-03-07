import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Badge, Popover, Spin } from "antd";
import MyIcon from "../../../components/Icon/MyIcon";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setRerenderChatPanel,
  setTemporaryMessage,
  setTemporaryResponse,
  setRerenderDashboard,
} from "../../../redux/AuthToken/Action";
import { API_GET_PROMPTS, API_GET_RESPONSE } from "../../../apis/ChatApis";
import {
  RENDER_FILE_PREVIEW,
  SHOW_API_NOT_SETUP_ERROR,
  SHOW_ERROR,
} from "../../../utils/Methods";
import "./styles/MessageBar.css";
import UpdateAccessComponent from "../UpdateAccessComponent";
import Banners from "./Banners";

const MessageBar = ({
  isDisabled,
  selectedChannel,
  limitEnded_Redo,
  setLimitEnded_Redo,
  isAIResponseLoading,
  setIsAIResponseLoading,
}) => {
  const dispatch = useDispatch();
  const { token, rerender_chat_panel, rerender_dashboard, current_account } =
    useSelector((state) => state.authToken);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [LimitEnded, setLimitEnded] = useState(false);

  const [prompts, setPrompts] = useState([]);
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(false);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [mentionStart, setMentionStart] = useState(-1);
  const [selectedPromptId, setSelectedPromptId] = useState(null);

  const [cursorPosition, setCursorPosition] = useState(null);

  const inputRef = useRef(null);
  const selectedPromptRef = useRef(null);

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (selectedPromptRef.current) {
      selectedPromptRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSuggestionIndex]);

  useEffect(() => {
    if (inputRef.current && cursorPosition !== null) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [message, cursorPosition]);

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

  const handleInputChange = (e) => {
    const { value, selectionStart } = e.target;
    setMessage(value);
    setCursorPosition(selectionStart);

    const atIndex = value.lastIndexOf("@");
    if (atIndex !== -1) {
      const searchStr = value.slice(atIndex + 1).toLowerCase();
      setSearchTerm(searchStr);
      setMentionStart(atIndex);

      const filtered = prompts
        .filter(
          (prompt) =>
            prompt.prompt_hashtag.toLowerCase().includes(searchStr) ||
            prompt.prompt_name.toLowerCase().includes(searchStr)
        )
        .slice(0, 5);

      setFilteredPrompts(filtered);
      setShowPromptSuggestions(filtered.length > 0);
      setSelectedSuggestionIndex(0);

      const exactMatch = filtered.find(
        (p) => p.prompt_hashtag.toLowerCase() === searchStr
      );
      if (exactMatch) {
        selectPrompt(exactMatch);
      }
    } else {
      setShowPromptSuggestions(false);
      setSelectedPromptId(null);
      setMentionStart(-1);
    }
  };
  const isShowSpinner = isAIResponseLoading || showSpinner;

  const handleKeyDown = (e) => {
    if (showPromptSuggestions && filteredPrompts.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedSuggestionIndex(
          (prev) => (prev + 1) % filteredPrompts.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev === 0 ? filteredPrompts.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        selectPrompt(filteredPrompts[selectedSuggestionIndex]);
      } else if (e.key === "Escape") {
        setShowPromptSuggestions(false);
      }
    } else if (e.key === "Enter" && !isFileUploading && !isShowSpinner) {
      handleSendMessage();
    } else if (
      e.key === "Backspace" &&
      selectedPromptId &&
      mentionStart !== -1
    ) {
      // If user backspaces right after a mention
      const cursorPos = e.target.selectionStart;
      const promptText = message.slice(mentionStart);
      if (cursorPos === message.length && promptText.startsWith("@")) {
        e.preventDefault();
        setMessage(message.slice(0, mentionStart));
        setSelectedPromptId(null);
        setMentionStart(-1);
      }
    }
  };

  // const selectPrompt = (prompt) => {
  //   if (mentionStart !== -1) {
  //     const newMsg =
  //       message.slice(0, mentionStart) + "@" + prompt.prompt_hashtag + " ";
  //     setMessage(newMsg);
  //     const newCursorPos = mentionStart + 1 + prompt.prompt_hashtag.length + 1;
  //     setCursorPosition(newCursorPos);

  //     setShowPromptSuggestions(false);
  //     setSelectedPromptId(prompt.id);

  //     // Focus & set cursor after update
  //     setTimeout(() => {
  //       if (inputRef.current) {
  //         inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
  //         inputRef.current.focus();
  //       }
  //     }, 0);
  //   }
  // };

  const selectPrompt = (prompt) => {
    if (mentionStart !== -1) {
      // Determine the boundaries of the current mention and insert the prompt hashtag.
      const spaceIndex = message.indexOf(" ", mentionStart);
      const mentionEnd = spaceIndex === -1 ? message.length : spaceIndex;
      const newMsg =
        message.slice(0, mentionStart) +
        "@" +
        prompt.prompt_hashtag +
        " " +
        message.slice(mentionEnd);
      const newCursorPos = mentionStart + 1 + prompt.prompt_hashtag.length + 1;
      setMessage(newMsg);
      setCursorPosition(newCursorPos);
      setShowPromptSuggestions(false);

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setIsFileUploading(true);
      setFile(selectedFile);

      // Simulate file upload completion after 2 seconds (or replace with actual upload logic)
      setTimeout(() => {
        setIsFileUploading(false); // Mark upload as complete
      }, 2000);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setIsFileUploading(false);
    document.getElementById("file-upload").value = null;
  };

  // const handleSendMessage = async () => {
  //   if (!current_account?.is_openapi_setup) {
  //     SHOW_API_NOT_SETUP_ERROR();
  //     return;
  //   }
  //   if (!message && !file) return;

  //   // Dispatch a "temporary" local message
  //   dispatch(setTemporaryMessage({ message, file }));
  //   setMessage("");
  //   setFile(null);

  //   if (message.trim() || file) {
  //     setShowSpinner(true);

  //     const formData = new FormData();
  //     if (file) {
  //       formData.append("file_group", file);
  //     }
  //     formData.append("prompt", selectedPromptId || "");
  //     formData.append("message", message);

  //     try {
  //       const data = await API_GET_RESPONSE(
  //         token,
  //         message,
  //         formData,
  //         setShowSpinner
  //       );
  //       dispatch(setTemporaryResponse(data));
  //       dispatch(setTemporaryMessage(null));
  //       dispatch(setRerenderChatPanel(!rerender_chat_panel));
  //     } catch (error) {
  //       console.error("Error sending message/file:", error);
  //     } finally {
  //       dispatch(setTemporaryMessage(null));
  //       setShowSpinner(false);
  //       setSelectedPromptId(null);
  //       setMentionStart(-1);
  //     }
  //   }
  // };

  const handleSendMessage = async () => {
    if (selectedChannel?.id == -1) {
      SHOW_ERROR("Please select a channel");
      return;
    }
    if (!current_account?.is_openapi_setup) {
      SHOW_API_NOT_SETUP_ERROR();
      return;
    }
    if (!message && !file) return;

    dispatch(setTemporaryMessage({ message, file }));
    setMessage("");
    setFile(null);

    if (message.trim() || file) {
      setShowSpinner(true);
      const formData = new FormData();
      if (file) {
        formData.append("file_group", file);
      }

      const mentionRegex = /@([\w-]+)/g;
      let match;
      const collectedIds = [];
      while ((match = mentionRegex.exec(message)) !== null) {
        const mentionHashtag = match[1].toLowerCase();
        const foundPrompt = prompts.find(
          (p) => p.prompt_hashtag.toLowerCase() === mentionHashtag
        );
        if (foundPrompt && !collectedIds.includes(foundPrompt.id)) {
          collectedIds.push(foundPrompt.id);
        }
      }

      formData.append("prompts", JSON.stringify(collectedIds));

      formData.append("message", message);
      formData.append("channel_id", selectedChannel?.id);

      try {
        const response = await API_GET_RESPONSE(
          token,
          message,
          formData,
          setShowSpinner
        );
        dispatch(setTemporaryResponse(response));
        dispatch(setRerenderDashboard(!rerender_dashboard));
        if (response?.limit_end) {
          setLimitEnded(true);
        }
        dispatch(setTemporaryMessage(null));
        dispatch(setRerenderChatPanel(!rerender_chat_panel));
      } catch (error) {
        console.error("Error sending message/file:", error);
      } finally {
        dispatch(setTemporaryMessage(null));
        setShowSpinner(false);
      }
    }
  };

  const highlightAtText = (text) => {
    const regex = /@[^\s]+/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      if (lastIndex < start) {
        parts.push(text.slice(lastIndex, start));
      }
      parts.push(
        <span key={start} style={{ color: "#1890ff" }}>
          {" "}
          {match[0]}
        </span>
      );
      lastIndex = end;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };
  const showLimitEnded = LimitEnded || limitEnded_Redo;

  return (
    <div className="suggestions-container">
      {/* Suggestions dropdown */}
      {showPromptSuggestions && filteredPrompts.length > 0 && (
        <div className="suggestions-panel">
          {filteredPrompts.map((prompt, index) => (
            <div key={prompt.id} ref={index === selectedSuggestionIndex ? selectedPromptRef : null} className={`suggestion-item ${ index === selectedSuggestionIndex ? "suggestion-selected" : "" }`} onClick={() => selectPrompt(prompt)} >
              @{prompt.prompt_hashtag}
            </div>
          ))}
        </div>
      )}

      <Banners />
      <Row align="middle" className="message-bar">
        <Col xs={24}>
          {file && (
            <div className="file-preview-container">
              <Badge count={ <CloseOutlined onClick={handleRemoveFile} className="file-preview-container-badge-icon" /> } className="file-preview-container-badge" >
                {RENDER_FILE_PREVIEW(file, 30, false)}
              </Badge>
            </div>
          )}
        </Col>

        {/* "+" icon for file upload */}
        <Col>
          <label htmlFor="file-upload">
            <div className={`message-bar-plus ${ isFileUploading ? "disabled" : "" }`} style={{ cursor: isFileUploading ? "not-allowed" : "pointer" }} >
              +
            </div>
          </label>
          <input id="file-upload" type="file" style={{ display: "none" }} onChange={handleFileSelect} accept=".docs, .docx" disabled={isFileUploading} />
        </Col>

        <Col flex="auto">
          <div className="message-input-wrapper" style={{ position: "relative" }} >
            <div className="message-display" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", padding: "0 8px", display: "flex", alignItems: "center", color: "#000", backgroundColor: "transparent", overflowWrap: "break-word", }} >
              {highlightAtText(message)}
            </div>

            <input ref={inputRef} type="text" placeholder="Type @ to use preset prompts..." value={message} onChange={handleInputChange} onKeyDown={handleKeyDown} className="message-bar-input" style={{ position: "relative", backgroundColor: "transparent", color: "transparent", caretColor: "#000", }}/>
          </div>
        </Col>

        {showLimitEnded && (
          <UpdateAccessComponent visible={showLimitEnded} onClose={() => { setLimitEnded(false); if (typeof setLimitEnded_Redo === "function") { setLimitEnded_Redo(false); } }}  modal={true} />
        )}
        <Col>
          {isShowSpinner ? (
            <div className="message-arrow-up"> <Spin size="small" style={{ color: "#fff" }} /> </div>
          ) : (
            <div className={`message-arrow-up ${ isFileUploading ? "disabled-icon" : "" }`} onClick={!isFileUploading ? handleSendMessage : undefined} >
              ↑
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default MessageBar;

import React, { useEffect, useState } from "react";
import { IMAGES } from "../../data/ImageData";
import { Button, Collapse, Popconfirm, Spin } from "antd";
import { SettingOutlined, DownOutlined } from "@ant-design/icons";
import "./styles/DashboardLeftPanel.css";
import MyButton from "../../components/Button/Button";
import MyIcon from "../../components/Icon/MyIcon";
import { ICONS } from "../../data/IconData";
import AddPromptBtn from "./AddPromptBtn";
import SettingsBtn from "./SettingsBtn";
import {
  FILTER_PROMPTS_BY_CATEGORY,
  GET_PROMPT_CATEGORIES,
} from "../../utils/Methods";
import {
  API_DELETE_PROMPT,
  API_GET_PROMPTS,
  API_GET_RESPONSE,
} from "../../apis/ChatApis";
import { useDispatch, useSelector } from "react-redux";
import {
  setRerenderChatPanel,
  setRerenderDashboard,
  setTemporaryMessage,
} from "../../redux/AuthToken/Action";

const { Panel } = Collapse;

const DashboardLeftPanel = ({ Accounts, SwitchAccount }) => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, rerender_dashboard, rerender_chat_panel } =
    useSelector((state) => state.authToken);
  const [CurrentAccount, setCurrentAccount] = useState({});
  const [FetchedPrompts, setFetchedPrompts] = useState([]);
  const [AccountCollapseActiveKey, setAccountCollapseActiveKey] = useState(["0"]);

  // Effect to set the current account
  useEffect(() => {
    if (Accounts && Accounts.length) {
      const current = Accounts.find((account) => account.is_current_account);
      setCurrentAccount(current);
    }
  }, [Accounts]);

  // Fetch prompts
  const getPrompts = async () => {
    const response = await API_GET_PROMPTS(token, setShowSpinner);
    setFetchedPrompts(response);
  };

  // Handle prompt click
  const handlePromptClick = async (prompt) => {
    const formData = new FormData();
    formData.append("prompt", prompt);
    dispatch(setTemporaryMessage(prompt));
    await API_GET_RESPONSE(token, prompt, formData, setShowSpinner);
    dispatch(setRerenderChatPanel(!rerender_chat_panel));
    dispatch(setTemporaryMessage(null));
  };

  // UseEffect to fetch prompts on initial render and when rerender_dashboard changes
  useEffect(() => {
    getPrompts();
  }, []);

  useEffect(() => {
    getPrompts();
  }, [rerender_dashboard]);

  // Handle account switch
  const handleAccountSwitch = (accountId) => {
    SwitchAccount(accountId);
    setAccountCollapseActiveKey([]);
  };

  // Handle prompt deletion
  const handleDeletePrompt = async (id) => {
    await API_DELETE_PROMPT(token, id, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));
  };

  return (
    <div className="left-panel-container">
      {showSpinner && <Spin fullscreen />}
      <div className="left-panel-container-inner">
        <div className="left-panel-logo-wrapper">
          <img
            src={IMAGES.panel_logo}
            alt="Panel Logo"
            className="left-panel-logo"
          />
        </div>

        <div className="side-bar-btn-wrapper">
          <Collapse
            className="left-panel-collapse-account"
            expandIconPosition={"end"}
            expandIcon={({ isActive }) => (
              <DownOutlined
                style={{
                  transition: "transform 0.3s ease",
                  transform: isActive ? "rotate(-180deg)" : "rotate(0deg)",
                }}
              />
            )}
            activeKey={AccountCollapseActiveKey}
            onChange={(key) => setAccountCollapseActiveKey(key)}
          >
            <Panel
              header={
                <>
                  <span className="panel-header-span">
                    <MyIcon type={"user"} /> {CurrentAccount?.name}
                  </span>
                </>
              }
              key="1"
            >
              {Accounts?.filter((account) => !account.is_current_account).map(
                (account) => (
                  <div key={account.id}>
                    <Button
                      type="text"
                      className="left-panel-btn"
                      onClick={() => handleAccountSwitch(account.id)}
                    >
                      {account.name}
                      <MyIcon type={"elipsis"} />
                    </Button>
                  </div>
                )
              )}
            </Panel>
          </Collapse>

          <AddPromptBtn />
        </div>

        <div className="left-panel-scrollable">
          <Collapse
            className="left-panel-collapse"
            expandIconPosition={"end"}
            expandIcon={({ isActive }) => (
              <DownOutlined
                style={{
                  transition: "transform 0.3s ease",
                  transform: isActive ? "rotate(-180deg)" : "rotate(0deg)",
                }}
              />
            )}
          >
            {GET_PROMPT_CATEGORIES?.map((panel) => (
              <Panel
                header={
                  <>
                    <span className="panel-header-span">
                      <MyIcon type={panel.icon} /> {panel.header}
                    </span>
                  </>
                }
                key={panel.key}
              >
                {FILTER_PROMPTS_BY_CATEGORY(FetchedPrompts, panel.header)?.map(
                  (item) => (
                    <div key={item.id}>
                      <Button
                        type="text"
                        className="left-panel-btn"
                        
                      >
                        <span style={{width:"100%", textAlign:"start"}} onClick={() => handlePromptClick(item?.id)}> {item?.prompt_name}</span>
                        <Popconfirm
                          title="Are you sure you want to delete this prompt?"
                          onConfirm={() => handleDeletePrompt(item?.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <MyIcon
                            type="elipsis"
                            style={{
                              cursor: "pointer",
                              marginLeft: 10,
                              marginRight: "0px",
                            }}
                            onClick={(e) => e.stopPropagation()} // Prevent button click
                          />
                        </Popconfirm>
                      </Button>
                    </div>
                  )
                )}
              </Panel>
            ))}
          </Collapse>
          <div style={{ height: "40px" }}></div>
        </div>
      </div>
      <SettingsBtn />
    </div>
  );
};

export default DashboardLeftPanel;

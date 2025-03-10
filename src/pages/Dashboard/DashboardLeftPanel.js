import React, { useEffect, useState } from "react";
import { IMAGES } from "../../data/ImageData";
import { Button, Collapse, Popconfirm, Spin, Dropdown, Menu, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Import EllipsisOutlined for the dropdown
import "./styles/DashboardLeftPanel.css";
import MyIcon from "../../components/Icon/MyIcon";
import { ICONS } from "../../data/IconData";
import AddPromptBtn from "./AddPromptBtn";
import SettingsBtn from "./SettingsBtn";
import { TRUNCATE_STRING } from "../../utils/Methods";
import { API_DELETE_PROMPT, API_GET_CATEGORY_ORDERING, API_GET_PROMPTS, API_GET_RESPONSE } from "../../apis/ChatApis";
import { useDispatch, useSelector } from "react-redux";
import { setRerenderChatPanel, setRerenderDashboard, setTemporaryMessage } from "../../redux/AuthToken/Action";
import { DOMAIN_NAME } from "../../utils/GlobalSettings";
import EditPromptModal from "../../components/Modals/EditPromptModal";
import AccountSwitcher from "../Agency/AccountSwitcher/AccountSwitcher";
import UpdateAccessComponent from "./UpdateAccessComponent";

const { Panel } = Collapse;

const DashboardLeftPanel = ({ Accounts, isAIResponseLoading, setIsAIResponseLoading }) => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const { channel, token, rerender_dashboard, rerender_chat_panel, } = useSelector((state) => state.authToken);
  const [CurrentAccount, setCurrentAccount] = useState(null);
  const [FetchedPrompts, setFetchedPrompts] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedPrompt, setselectedPrompt] = useState(null);
  const [FetchedCategories, setFetchedCategories] = useState([]);
  const [LimitEnded, setLimitEnded] = useState(false);
  const [selectedCategory, setselectedCategory] = useState("");

  useEffect(() => {
    if (Accounts && Accounts.length) { 
      const current = Accounts.find((account) => account.is_current_account);
      setCurrentAccount(current);
    }
  }, [Accounts]);

  const getPrompts = async () => {
    const response = await API_GET_PROMPTS(token, setShowSpinner);
    setFetchedPrompts(response);
  };

  const handlePromptClick = async (message, id) => {
    if (!message) return;
    if (isAIResponseLoading) return;

    const localMessage = message || " ";
    dispatch(setTemporaryMessage({ message }));
    setIsAIResponseLoading(true);
    if (localMessage.trim()) {
      const formData = new FormData();
      formData.append("prompt", id);
      formData.append("channel_id", channel?.id);
      try {
        const response = await API_GET_RESPONSE( token, id, formData, setShowSpinner );
        if (response?.limit_end) {
          setLimitEnded(true);
        }
        dispatch(setRerenderDashboard(!rerender_dashboard));
        dispatch(setTemporaryMessage(null));
        dispatch(setRerenderChatPanel(!rerender_chat_panel));
      } catch (error) {
        console.error("Error sending message/file:", error);
      } finally {
        dispatch(setTemporaryMessage(null));
        setShowSpinner(false);
        setIsAIResponseLoading(false);
      }
    }
  };

  useEffect(() => {
    getPrompts();
  }, []);

  useEffect(() => {
    getPrompts();
  }, [rerender_dashboard]);



  const handleDeletePrompt = async (id) => {
    await API_DELETE_PROMPT(token, id, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));
  };

  const handleEditPrompt = (item, category_name, category_id) => {
    setselectedPrompt(item);
    setselectedCategory({ category_name: category_name, category_id: category_id, });
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setselectedPrompt(null);
  };

  const renderDropdownMenu = (item, category_name, category_id) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEditPrompt(item, category_name, category_id)} >
        <span style={{ display: "flex", alignItems: "center" }}>
          <EditOutlined style={{ marginRight: "10px" }} /> Edit{" "}
        </span>
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm title="Are you sure you want to delete this prompt?" onConfirm={() => handleDeletePrompt(item?.id)} okText="Yes" cancelText="No" >
          <span style={{ display: "flex", alignItems: "center" }}> {" "} <DeleteOutlined style={{ marginRight: "10px" }} /> Delete{" "} </span>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const fetchCategoryOrdering = async () => {
    const response = await API_GET_CATEGORY_ORDERING(token, null);
    setFetchedCategories(response);
  };

  useEffect(() => {
    fetchCategoryOrdering();
  }, []);

  

  return (
    <>
      <div className="left-panel-container">
        {showSpinner && <Spin fullscreen />}
        <div className="left-panel-container-inner">
          <div className="left-panel-logo-wrapper">
            <img src={ CurrentAccount?.logo ? `${DOMAIN_NAME}${CurrentAccount?.logo}` : IMAGES.logo_png } alt="Panel Logo" className="left-panel-logo" />
          </div>

          {CurrentAccount?.is_main_user ? (
            <AccountSwitcher />
          ) : (
            <div className="side-bar-btn-wrapper" style={{ marginTop: "10px" }}>
              <span className="dashboard-account-name">
                {CurrentAccount?.account_image ? (
                  <img src={`${DOMAIN_NAME}${CurrentAccount?.account_image}`} alt="" height={25} style={{ height: "auto", maxWidth: "30px", maxHeight: "25px", borderRadius: "20px", }} />
                ) : (
                  <MyIcon type={"user"} />
                )}
                {CurrentAccount?.name ? TRUNCATE_STRING(CurrentAccount?.name, 17):<Spin size="small" style={{marginLeft:"90px"}}/>}
              </span>
            </div>
          )}
          <div className="side-bar-btn-wrapper" style={{ marginTop: "10px" }}>
            <AddPromptBtn />
          </div>

          <div className="left-panel-scrollable">
            <Collapse
              className="left-panel-collapse"
              expandIconPosition={"end"}
              expandIcon={({ isActive }) => (
                <img src={ICONS.arrow_down} style={{ height: "5.5px", transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)", }} />
              )}
            >
              {FetchedPrompts &&
                FetchedPrompts?.map((panel) => (
                  <Panel header={ <span className="panel-header-span"> {panel.category_name}{" "} </span> } key={panel.category_id} >
     
                    {panel?.prompts?.map((item) => (
                      <div key={item.category_id}>
                        <Button type="text" className="left-panel-btn" style={{ width: "100%" }} >
                          <Tooltip title={item?.prompt_name}>
                            <span className="two-line-ellipsis" style={{ textAlign: "start" }} onClick={() => handlePromptClick(item?.prompt, item?.id) } >
               
                              <div className="flex-parent">
                                    <div className="flex-child short-and-fixed"></div>
                                    
                                    <div className="flex-child long-and-truncated">
                                        <span>
                                        {item?.prompt_name}
                                            </span>
                                    </div>
                                    
                                    <div className="flex-child short-and-fixed"></div>
                                </div>
                            </span>
                          </Tooltip>
                          <Dropdown overlay={renderDropdownMenu( item, panel?.category_name, panel?.category_id )} trigger={["click"]} >
                            <MyIcon type="elipsis" style={{ cursor: "pointer", marginLeft: 10, marginRight: 0, }} />
                          </Dropdown>
                        </Button>
                      </div>
                    ))}
                  </Panel>
                ))}
            </Collapse>
          </div>
        </div>
        {LimitEnded && ( <UpdateAccessComponent visible={LimitEnded} onClose={() => setLimitEnded(false)} modal={true} />)}
        {CurrentAccount?.access_type == 0 && ( <UpdateAccessComponent chatCount={CurrentAccount?.chat_count} /> )}
        <span>
          <SettingsBtn />
        </span>

        {/* <div style={{ height: "130px" }}></div> */}
        {isEditModalVisible && ( <EditPromptModal visible={isEditModalVisible} onClose={closeEditModal} prompt={selectedPrompt} CATEGORY={selectedCategory} /> )}
      </div>
    </>
  );
};

export default DashboardLeftPanel;

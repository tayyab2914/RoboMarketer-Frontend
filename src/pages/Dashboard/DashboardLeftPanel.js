import React, { useEffect, useState } from "react";
import { IMAGES } from "../../data/ImageData";
import { Button, Collapse, Popconfirm, Spin, Dropdown, Menu } from "antd";
import { SettingOutlined, DownOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";  // Import EllipsisOutlined for the dropdown
import "./styles/DashboardLeftPanel.css";
import MyButton from "../../components/Button/Button";
import MyIcon from "../../components/Icon/MyIcon";
import { ICONS } from "../../data/IconData";
import AddPromptBtn from "./AddPromptBtn";
import SettingsBtn from "./SettingsBtn";
import { FILTER_PROMPTS_BY_CATEGORY, GET_PROMPT_CATEGORIES, TRUNCATE_STRING } from "../../utils/Methods";
import { API_DELETE_PROMPT, API_GET_CATEGORY_ORDERING, API_GET_PROMPTS, API_GET_RESPONSE } from "../../apis/ChatApis";
import { useDispatch, useSelector } from "react-redux";
import { setFacebookState, setRerenderChatPanel, setRerenderDashboard, setTemporaryMessage } from "../../redux/AuthToken/Action";
import { DOMAIN_NAME } from "../../utils/GlobalSettings";
import EditPromptModal from "../../components/Modals/EditPromptModal";  
import AccountSwitcher from "../Agency/AccountSwitcher/AccountSwitcher";
import UpdateAccessComponent from "./UpdateAccessComponent";

const { Panel } = Collapse;

const DashboardLeftPanel = ({ Accounts, SwitchAccount }) => {
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn,channel, token, rerender_dashboard, rerender_chat_panel ,current_account} =useSelector((state) => state.authToken);
  const [CurrentAccount, setCurrentAccount] = useState(null);
  const [FetchedPrompts, setFetchedPrompts] = useState([]);
  const [AccountCollapseActiveKey, setAccountCollapseActiveKey] = useState(["0"]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);  
  const [selectedPrompt, setselectedPrompt] = useState(null);  
  const [FetchedCategories, setFetchedCategories] = useState([]);
  const [LimitEnded, setLimitEnded] = useState(false);
  const [selectedCategory, setselectedCategory] = useState('');

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

    const localMessage = message || " ";
    dispatch(setTemporaryMessage({ message }));
    if (localMessage.trim() ) {
      const formData = new FormData();
      formData.append("prompt", id);
      formData.append("channel_id", channel?.id);
      try {
        const response = await API_GET_RESPONSE(token, id, formData, setShowSpinner);
        if(response?.limit_end)
        {
          setLimitEnded(true)
        }
        dispatch(setRerenderDashboard(!rerender_dashboard));
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


  useEffect(() => {
    getPrompts();
  }, []);

  useEffect(() => {
    getPrompts();
  }, [rerender_dashboard]);

  const handleAccountSwitch = (accountId) => {
    SwitchAccount(accountId);
    setAccountCollapseActiveKey([]);
    dispatch(setFacebookState(null))
  };

  const handleDeletePrompt = async (id) => {
    await API_DELETE_PROMPT(token, id, setShowSpinner);
    dispatch(setRerenderDashboard(!rerender_dashboard));
  };

  const handleEditPrompt = (item,category_name,category_id) => {
    console.log("item",item,category_name)
    setselectedPrompt(item); 
    setselectedCategory({category_name:category_name,category_id:category_id})
    setIsEditModalVisible(true); 
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setselectedPrompt(null);
  };

  const renderDropdownMenu = (item,category_name,category_id) => (
    <Menu>
        <Menu.Item key="edit" onClick={() => handleEditPrompt(item,category_name,category_id)}> <span style={{ display: "flex", alignItems: "center" }}> <EditOutlined style={{ marginRight: '10px' }} /> Edit </span></Menu.Item>
        <Menu.Item key="delete">
            <Popconfirm title="Are you sure you want to delete this prompt?" onConfirm={() => handleDeletePrompt(item?.id)} okText="Yes" cancelText="No" >
                <span style={{ display: "flex", alignItems: "center" }}> <DeleteOutlined style={{ marginRight: '10px' }} /> Delete </span>
            </Popconfirm>
        </Menu.Item>
        
  </Menu>
  );

    const fetchCategoryOrdering = async () => {
      const response = await API_GET_CATEGORY_ORDERING(token, null);
      setFetchedCategories(response);
      console.log('setFetchedCategories',response)
    };
  
    useEffect(() => {
      fetchCategoryOrdering();
    }, []);

    if (!CurrentAccount) {
      // Wait for CurrentAccount to load before rendering
      return null;
    }

  return (
    <>
    <div className="left-panel-container"> 
      {showSpinner && <Spin fullscreen />}
      <div className="left-panel-container-inner">
        <div className="left-panel-logo-wrapper">
          <img src={CurrentAccount?.logo ?`${DOMAIN_NAME}${CurrentAccount?.logo}`:IMAGES.logo_png} alt="Panel Logo" className="left-panel-logo" />
        </div>

       
            {current_account?.is_main_user ? <AccountSwitcher/>
            :
            <div className="side-bar-btn-wrapper" style={{marginTop:"10px"}}><span className="dashboard-account-name">
                    {CurrentAccount?.account_image ? (
                      <img src={`${DOMAIN_NAME}${CurrentAccount?.account_image}`} alt="" height={25} style={{ height: "auto", maxWidth: "30px", maxHeight: "25px", borderRadius: "20px", }} />
                    ) : ( <MyIcon type={"user"} /> )}
                    {TRUNCATE_STRING(CurrentAccount?.name,17)}
            </span>
            </div>}
            <div className="side-bar-btn-wrapper" style={{marginTop:"10px"}}>
          <AddPromptBtn />
        </div>

        <div className="left-panel-scrollable">
          <Collapse className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => (
              <img src={ICONS.arrow_down} style={{ height: "5.5px", transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)", }} />
            )}
          >
            {FetchedPrompts && FetchedPrompts?.map((panel) => (
              <Panel header={ <span className="panel-header-span">  {panel.category_name} </span>} key={panel.category_id} >
                {panel?.prompts?.map(
                  (item) => (
                    <div key={item.category_id}>
                      <Button type="text" className="left-panel-btn">
                        <span style={{ width: "100%", textAlign: "start" }} onClick={() => handlePromptClick(item?.prompt, item?.id)} > {" "} {TRUNCATE_STRING(item?.prompt_name,25)} </span>
                        <Dropdown overlay={renderDropdownMenu(item,panel?.category_name,panel?.category_id)} trigger={["click"]} >
                            <MyIcon type="elipsis" style={{ cursor: "pointer", marginLeft: 10, marginRight: "0px", }} />
                        </Dropdown>
                      </Button>
                    </div>
                  )
                )}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
          {/* <UpdateAccessComponent visible={true} modal={true}/> */}
          {LimitEnded && <UpdateAccessComponent visible={LimitEnded} onClose={()=>setLimitEnded(false)} modal={true}/>}
          {CurrentAccount?.access_type == 0 && <UpdateAccessComponent chatCount={CurrentAccount?.chat_count}/>}
      <span>
      <SettingsBtn />
      </span>

      <div style={{ height: "130px" }}></div>
      {isEditModalVisible && ( <EditPromptModal visible={isEditModalVisible} onClose={closeEditModal} prompt={selectedPrompt} CATEGORY={selectedCategory}/>  )}
    </div></>
  );
};

export default DashboardLeftPanel;



// import React, { useEffect, useState } from "react";
// import { IMAGES } from "../../data/ImageData";
// import { Button, Collapse, Popconfirm, Spin, Dropdown, Menu } from "antd";
// import { SettingOutlined, DownOutlined, EllipsisOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";  // Import EllipsisOutlined for the dropdown
// import "./styles/DashboardLeftPanel.css";
// import MyButton from "../../components/Button/Button";
// import MyIcon from "../../components/Icon/MyIcon";
// import { ICONS } from "../../data/IconData";
// import AddPromptBtn from "./AddPromptBtn";
// import SettingsBtn from "./SettingsBtn";
// import { FILTER_PROMPTS_BY_CATEGORY, GET_PROMPT_CATEGORIES, TRUNCATE_STRING } from "../../utils/Methods";
// import { API_DELETE_PROMPT, API_GET_PROMPTS, API_GET_RESPONSE } from "../../apis/ChatApis";
// import { useDispatch, useSelector } from "react-redux";
// import { setFacebookState, setRerenderChatPanel, setRerenderDashboard, setTemporaryMessage } from "../../redux/AuthToken/Action";
// import { DOMAIN_NAME } from "../../utils/GlobalSettings";
// import EditPromptModal from "../../components/Modals/EditPromptModal";  

// const { Panel } = Collapse;

// const DashboardLeftPanel = ({ Accounts, SwitchAccount }) => {
//   const dispatch = useDispatch();
//   const [showSpinner, setShowSpinner] = useState(false);
//   const { isLoggedIn, token, rerender_dashboard, rerender_chat_panel ,current_account} =useSelector((state) => state.authToken);
//   const [CurrentAccount, setCurrentAccount] = useState({});
//   const [FetchedPrompts, setFetchedPrompts] = useState([]);
//   const [AccountCollapseActiveKey, setAccountCollapseActiveKey] = useState(["0"]);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);  
//   const [selectedPrompt, setselectedPrompt] = useState(null);  

//   useEffect(() => {
//     if (Accounts && Accounts.length) {
//       const current = Accounts.find((account) => account.is_current_account);
//       setCurrentAccount(current);
//     }
//   }, [Accounts]);

//   const getPrompts = async () => {
//     const response = await API_GET_PROMPTS(token, setShowSpinner);
//     setFetchedPrompts(response);
//   };

//   const handlePromptClick = async (message, id) => {
//     dispatch(setTemporaryMessage({ message,wait:true }));
//     const formData = new FormData();
//     formData.append("prompt", id);
//     await API_GET_RESPONSE(token, id, formData, setShowSpinner);
//     dispatch(setTemporaryMessage({}));
//     dispatch(setRerenderChatPanel(!rerender_chat_panel));
//     dispatch(setRerenderDashboard(!rerender_dashboard));
//   };

//   useEffect(() => {
//     getPrompts();
//   }, []);

//   useEffect(() => {
//     getPrompts();
//   }, [rerender_dashboard]);

//   const handleAccountSwitch = (accountId) => {
//     SwitchAccount(accountId);
//     setAccountCollapseActiveKey([]);
//     dispatch(setFacebookState(null))
//   };

//   const handleDeletePrompt = async (id) => {
//     await API_DELETE_PROMPT(token, id, setShowSpinner);
//     dispatch(setRerenderDashboard(!rerender_dashboard));
//   };

//   const handleEditPrompt = (item) => {
//     console.log("item",item)
//     setselectedPrompt(item); 
//     setIsEditModalVisible(true); 
//   };

//   const closeEditModal = () => {
//     setIsEditModalVisible(false);
//     setselectedPrompt(null);
//   };

//   const renderDropdownMenu = (item) => (
//     <Menu>
//         <Menu.Item key="edit" onClick={() => handleEditPrompt(item)}> <span style={{ display: "flex", alignItems: "center" }}> <EditOutlined style={{ marginRight: '10px' }} /> Edit </span></Menu.Item>
//         <Menu.Item key="delete">
//             <Popconfirm title="Are you sure you want to delete this prompt?" onConfirm={() => handleDeletePrompt(item?.id)} okText="Yes" cancelText="No" >
//                 <span style={{ display: "flex", alignItems: "center" }}> <DeleteOutlined style={{ marginRight: '10px' }} /> Delete </span>
//             </Popconfirm>
//         </Menu.Item>
//   </Menu>
//   );

//   return (
//     <div className="left-panel-container">
//       {showSpinner && <Spin fullscreen />}
//       <div className="left-panel-container-inner">
//         <div className="left-panel-logo-wrapper">
//           <img src={IMAGES.logo_png} alt="Panel Logo" className="left-panel-logo" />
//         </div>

//         <div className="side-bar-btn-wrapper">
//           <Collapse className="left-panel-collapse-account" expandIconPosition={"end"} expandIcon={({ isActive }) => (
//               <img src={ICONS.arrow_up_down} style={{ height: "14px", transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)", }} />
//             )}
//             activeKey={AccountCollapseActiveKey}
//             onChange={(key) => setAccountCollapseActiveKey(key)}
//           >
//             <Panel
//               header={
//                 <>
//                   <span className="panel-header-span">
//                     {CurrentAccount?.account_image ? (
//                       <img src={`${DOMAIN_NAME}${CurrentAccount?.account_image}`} alt="" height={25} style={{ height: "auto", maxWidth: "30px", maxHeight: "25px", borderRadius: "50%", }} />
//                     ) : ( <MyIcon type={"user"} /> )}
//                     {TRUNCATE_STRING(CurrentAccount?.name,17)}
//                   </span>
//                 </>
//               }
//               key="1"
//             >
//               {Accounts?.filter((account) => !account.is_current_account).map(
//                 (account) => (
//                   <div key={account.id}>
//                     <Button type="text" className="left-panel-btn" style={{ justifyContent: "left" }} onClick={() => handleAccountSwitch(account.id)} >
//                       {account?.account_image ? (
//                         <img src={`${DOMAIN_NAME}${account?.account_image}`} alt="" height={25} style={{ height: "auto", maxWidth: "30px", maxHeight: "25px", borderRadius: "50%", }} /> ) : (
//                         <MyIcon type={"user"} />
//                       )}
//                       {TRUNCATE_STRING(account?.name,20)}
//                     </Button>
//                   </div>
//                 )
//               )}
//             </Panel>
//           </Collapse>

//           <AddPromptBtn />
//         </div>

//         <div className="left-panel-scrollable">
//           <Collapse className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => (
//               <img src={ICONS.arrow_down} style={{ height: "5.5px", transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)", }} />
//             )}
//           >
//             {GET_PROMPT_CATEGORIES?.map((panel) => (
//               <Panel header={ <span className="panel-header-span"> <MyIcon type={panel.icon} /> {panel.header} </span>} key={panel.key} >
//                 {FILTER_PROMPTS_BY_CATEGORY(FetchedPrompts, panel.header)?.map(
//                   (item) => (
//                     <div key={item.id}>
//                       <Button type="text" className="left-panel-btn">
//                         <span style={{ width: "100%", textAlign: "start" }} onClick={() => handlePromptClick(item?.prompt, item?.id)} > {" "} {TRUNCATE_STRING(item?.prompt_name,25)} </span>
//                         <Dropdown overlay={renderDropdownMenu(item)} trigger={["click"]} >
//                             <MyIcon type="elipsis" style={{ cursor: "pointer", marginLeft: 10, marginRight: "0px", }} />
//                         </Dropdown>
//                       </Button>
//                     </div>
//                   )
//                 )}
//               </Panel>
//             ))}
//           </Collapse>
//           <div style={{ height: "70px" }}></div>
//         </div>
//       </div>
//       <SettingsBtn />

//       {isEditModalVisible && ( <EditPromptModal visible={isEditModalVisible} onClose={closeEditModal} prompt={selectedPrompt} />  )}
//     </div>
//   );
// };

// export default DashboardLeftPanel;

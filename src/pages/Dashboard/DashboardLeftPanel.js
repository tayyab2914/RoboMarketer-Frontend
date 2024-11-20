import React, { useEffect, useState } from 'react';
import { IMAGES } from '../../data/ImageData';
import { Button, Collapse, Popconfirm, Spin } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './styles/DashboardLeftPanel.css';
import MyButton from '../../components/Button/Button';
import MyIcon from '../../components/Icon/MyIcon';
import { ICONS } from '../../data/IconData';
import AddPromptBtn from './AddPromptBtn';
import { DownOutlined } from '@ant-design/icons';
import SettingsBtn from './SettingsBtn';
import { FILTER_PROMPTS_BY_CATEGORY, GET_PROMPT_CATEGORIES } from '../../utils/Methods';
import { API_DELETE_PROMPT, API_GET_PROMPTS, API_GET_RESPONSE } from '../../apis/ChatApis';
import { useDispatch, useSelector } from 'react-redux';
import { setRerenderChatPanel, setRerenderDashboard } from '../../redux/AuthToken/Action';

const { Panel } = Collapse;


const DashboardLeftPanel = ({ Accounts, SwitchAccount }) => {
    const dispatch= useDispatch()
    const [showSpinner, setShowSpinner] = useState(false);
    const { isLoggedIn, token,rerender_dashboard,rerender_chat_panel } = useSelector((state) => state.authToken);
  const [CurrentAccount, setCurrentAccount] = useState({});
  const [FetchedPrompts, setFetchedPrompts] = useState([]);
  const [AccountCollapseActiveKey, setAccountCollapseActiveKey] = useState(["0"]);

  useEffect(() => {
    if (Accounts && Accounts.length) {
      const current = Accounts.find((account) => account.is_current_account);
      setCurrentAccount(current);
    }
  }, [Accounts]);

  const getPrompts = async()=>{
    const response = await API_GET_PROMPTS(token,setShowSpinner)
    setFetchedPrompts(response)
  }
  const handlePromptClick = async(message)=>{
    
    await API_GET_RESPONSE(token,message,setShowSpinner)
    dispatch(setRerenderChatPanel(!rerender_chat_panel))
  }
  useEffect(()=>{
    getPrompts()
  },[])
  useEffect(()=>{
    getPrompts()
  },[rerender_dashboard])
  const handleAccountSwitch = (accountId) => {
    SwitchAccount(accountId);
    setAccountCollapseActiveKey([]); 
  };

  const handleDeletePrompt = async(id)=>{
    await API_DELETE_PROMPT(token,id,setShowSpinner)
    dispatch(setRerenderDashboard(!rerender_dashboard))
  }
  return (
    <div className="left-panel-container">
        {showSpinner &&<Spin fullscreen/>}
      <div className="left-panel-container-inner">
        <img src={IMAGES.panel_logo} alt="Panel Logo" className="left-panel-logo" />

        <Collapse className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)' }} /> )} activeKey={AccountCollapseActiveKey} onChange={(key) => setAccountCollapseActiveKey(key)} >
          <Panel header={<><span className='panel-header-span'><MyIcon type={'user'} /> {CurrentAccount?.name}</span></>} key="1" >
            {Accounts?.filter(account => !account.is_current_account).map((account) => (
              <div key={account.id}><Button type="text" className='left-panel-btn' onClick={() => handleAccountSwitch(account.id)}>{account.name}<MyIcon type={"elipsis"} /></Button></div>
            ))}
          </Panel>
        </Collapse>

        <AddPromptBtn />

        <div className="left-panel-scrollable">
          <Collapse className="left-panel-collapse" expandIconPosition={"end"} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: 'transform 0.3s ease', transform: isActive ? 'rotate(-180deg)' : 'rotate(0deg)' }} /> )} >
            {GET_PROMPT_CATEGORIES?.map(panel => (
              <Panel header={<><span className='panel-header-span'><MyIcon type={panel.icon} /> {panel.header}</span></>} key={panel.key}>
                {FILTER_PROMPTS_BY_CATEGORY(FetchedPrompts,panel.header).map((item)=>
                 <div><Button type="text" className='left-panel-btn' onClick={()=>handlePromptClick(item?.prompt)}>
                    {item?.prompt_name}
                    <Popconfirm title="Are you sure you want to delete this prompt?" onConfirm={() => handleDeletePrompt(item?.id)} okText="Yes" cancelText="No" >
                    <MyIcon  type="elipsis"   style={{ cursor: 'pointer', marginLeft: 10 }}  />
                </Popconfirm>
                    </Button></div>
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

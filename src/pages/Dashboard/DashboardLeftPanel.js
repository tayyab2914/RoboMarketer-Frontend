import React, { useEffect, useState } from 'react';
import { IMAGES } from '../../data/ImageData';
import { Button, Collapse, Spin } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './styles/DashboardLeftPanel.css';
import MyButton from '../../components/Button/Button';
import MyIcon from '../../components/Icon/MyIcon';
import { ICONS } from '../../data/IconData';
import AddPromptBtn from './AddPromptBtn';
import { DownOutlined } from '@ant-design/icons';
import SettingsBtn from './SettingsBtn';
import { GET_PROMPT_CATEGORIES } from '../../utils/Methods';
import { API_GET_PROMPTS } from '../../apis/ChatApis';
import { useSelector } from 'react-redux';

const { Panel } = Collapse;


const DashboardLeftPanel = ({ Accounts, SwitchAccount }) => {
    const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account } = useSelector((state) => state.authToken);
  const [CurrentAccount, setCurrentAccount] = useState({});
  const [AccountCollapseActiveKey, setAccountCollapseActiveKey] = useState(["0"]);

  useEffect(() => {
    if (Accounts && Accounts.length) {
      const current = Accounts.find((account) => account.is_current_account);
      setCurrentAccount(current);
    }
  }, [Accounts]);

  const getPrompts = async()=>{
    const response = await API_GET_PROMPTS(token,setShowSpinner)
  }
  useEffect(()=>{
    getPrompts()
  },[])

  const handleAccountSwitch = (accountId) => {
    SwitchAccount(accountId);
    setAccountCollapseActiveKey([]); 
  };

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
                <div><Button type="text" className='left-panel-btn'>Prompt #1 <MyIcon type={"elipsis"} /></Button></div>
                <div><Button type="text" className='left-panel-btn'>Prompt #2 <MyIcon type={"elipsis"} /></Button></div>
                <div><Button type="text" className='left-panel-btn'>Prompt #3 <MyIcon type={"elipsis"} /></Button></div>
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

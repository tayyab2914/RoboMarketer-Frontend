import React, { useEffect, useState } from 'react';
import { IMAGES } from '../../data/ImageData';
import { Button, Collapse } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './styles/DashboardLeftPanel.css';
import MyButton from '../../components/Button/Button';
import MyIcon from '../../components/Icon/MyIcon';
import { ICONS } from '../../data/IconData';
import AddPromptBtn from './AddPromptBtn';
import { DownOutlined } from '@ant-design/icons';
import SettingsBtn from './SettingsBtn';

const { Panel } = Collapse;

const panelsData = [
  { header: "Campaign", key: "2", icon: 'note' },
  { header: "Analytics", key: "3", icon: 'analytics' },
  { header: "Questions", key: "4", icon: 'question' },
  { header: "Help", key: "5", icon: 'help' },
  { header: "Copywriting", key: "6", icon: 'copywriting' },
  { header: "Recommendations", key: "7", icon: 'recommendations' },
  { header: "CRO", key: "8", icon: 'cro' },
  { header: "Funnels", key: "9", icon: 'funnels' },
  { header: "Marketing", key: "10", icon: 'marketing' },
  { header: "Strategy", key: "11", icon: 'strategy' },
  { header: "Offer", key: "12", icon: 'offer' },
  { header: "Competitors", key: "13", icon: 'competitor' },
  { header: "Charts", key: "14", icon: 'chart' }
];

const DashboardLeftPanel = ({ Accounts, SwitchAccount }) => {
  const [CurrentAccount, setCurrentAccount] = useState({});
  const [AccountCollapseActiveKey, setAccountCollapseActiveKey] = useState(["0"]);

  useEffect(() => {
    if (Accounts && Accounts.length) {
      const current = Accounts.find((account) => account.is_current_account);
      setCurrentAccount(current);
    }
  }, [Accounts]);

  const handleAccountSwitch = (accountId) => {
    SwitchAccount(accountId);
    setAccountCollapseActiveKey([]); // Close the collapse panel after switching accounts
  };

  return (
    <div className="left-panel-container">
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
            {panelsData.map(panel => (
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

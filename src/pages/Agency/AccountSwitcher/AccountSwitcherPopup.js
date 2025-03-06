import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import MyIcon from "../../../components/Icon/MyIcon";
import { TRUNCATE_STRING } from "../../../utils/Methods";
import { DOMAIN_NAME } from "../../../utils/GlobalSettings";
import { useDispatch, useSelector } from "react-redux";
import {  API_GET_ACCOUNTS, API_SWITCH_ACCOUNT } from "../../../apis/AuthApis";
import { SearchOutlined } from "@ant-design/icons"; 
import { useNavigate } from "react-router-dom";
import { setAuthToken, setRerenderChatPanel, setRerenderDashboard } from "../../../redux/AuthToken/Action";
// import { API_GET_ACCOUNTS } from "../../../apis/AgencyApis";
import { IMAGES } from "../../../data/ImageData";

const AccountSwitcherPopup = () => {
    const dispatch=useDispatch()
  const { token, current_account,rerender_dashboard,rerender_chat_panel } = useSelector((state) => state.authToken);
  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate()

  const fetchAccounts = async () => {
    const response = await API_GET_ACCOUNTS(token);
    setAccounts(response);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);
  useEffect(() => {
    fetchAccounts();
  }, [current_account]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAccountSwitch = async(accountId) => {
      const response = await API_SWITCH_ACCOUNT(token, accountId, null);
         dispatch(setAuthToken(response));
        dispatch(setRerenderDashboard(!rerender_dashboard));
        dispatch(setRerenderChatPanel(!rerender_chat_panel));
       navigate('/chat')

  };
  const goToAgencyHandler = async()=>{
    
    const mainAccount = accounts.find(account => account.is_main_user);
    if (mainAccount) {
        const response = await API_SWITCH_ACCOUNT(token, mainAccount.id, null);
        dispatch(setAuthToken(response));
        navigate('/agency')
    }
  }

  return (
      <>
      <div className="account-switcher-top">
        <span className="account-switcher-search-bar">
            <Input placeholder="Search.." value={searchTerm} onChange={handleSearchChange} className="account-switcher-search" size="medium" allowClear prefix={<SearchOutlined style={{color:"#575A7B"}}/>}/>
        </span>
        <div className="account-switcher-agency-btn-row">
            <span className="account-switcher-agency-btn-row-icon"> <MyIcon type={'user'}/> Accounts </span>
            <Button className="go-to-agency-btn" onClick={goToAgencyHandler} ><MyIcon type={'go_to_agency_view'}/> Go to Agency View </Button>
        </div>
      </div>

      <div className="account-switcher-list">
        
        <div className="account-list-wrapper">
            {accounts ?.filter( (account) =>  account.name.toLowerCase().includes(searchTerm.toLowerCase()) ).map((account) => (
                <div key={account.id}>
                <Button type="text" className="left-panel-btn" style={{ justifyContent: "left" }} onClick={() => handleAccountSwitch(account.id)} >
                    {account?.account_image ? (
                        <img src={` ${DOMAIN_NAME}${account?.account_image}`} alt="" height={25} className="account-switcher-account-img" />
                    ) : (
                        <MyIcon type={"user"} />
                    )}
                    {TRUNCATE_STRING(account?.name, 20)}
                </Button>
                </div>
            ))}
        </div>
      </div>
      </>
  );
};

export default AccountSwitcherPopup;

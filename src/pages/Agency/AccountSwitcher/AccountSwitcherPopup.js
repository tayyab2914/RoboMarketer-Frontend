import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import MyIcon from "../../../components/Icon/MyIcon";
import { TRUNCATE_STRING } from "../../../utils/Methods";
import { DOMAIN_NAME } from "../../../utils/GlobalSettings";
import { useSelector } from "react-redux";
import AccountSwitcherPopup from "./AccountSwitcherPopup";
import { API_GET_ACCOUNTS } from "../../../apis/AuthApis";
import { SearchOutlined } from "@ant-design/icons"; 
import { useNavigate } from "react-router-dom";

const AccountSwitcher = () => {
  const { token, current_account } = useSelector((state) => state.authToken);
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAccountSwitch = (accountId) => {
    console.log(`Switching to account ID: ${accountId}`);
  };

  return (
      <>
      <div className="account-switcher-top">
        <span className="account-switcher-search-bar">
            <Input placeholder="Search.." value={searchTerm} onChange={handleSearchChange} className="account-switcher-search" size="medium" allowClear prefix={<SearchOutlined style={{color:"#575A7B"}}/>}/>
        </span>
        <div className="account-switcher-agency-btn-row">
            <span className="account-switcher-agency-btn-row-icon"> <MyIcon type={'user'}/> Accounts </span>
            <Button className="go-to-agency-btn" onClick={() => navigate("/agency")} ><MyIcon type={'go_to_agency_view'}/> Go to Agency View </Button>
        </div>
      </div>

      <div className="account-switcher-list">
        
        <div className="account-list-wrapper">
            {accounts ?.filter( (account) => !account.is_current_account && account.name.toLowerCase().includes(searchTerm.toLowerCase()) ).map((account) => (
                <div key={account.id}>
                <Button type="text" className="left-panel-btn" style={{ justifyContent: "left" }} onClick={() => handleAccountSwitch(account.id)} >
                    {account?.account_image ? (
                    <img src={`${DOMAIN_NAME}${account?.account_image}`} alt="" height={25} className="account-switcher-account-img" />
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

export default AccountSwitcher;

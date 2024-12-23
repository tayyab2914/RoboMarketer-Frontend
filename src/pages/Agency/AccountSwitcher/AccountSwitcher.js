import React, { useState, useEffect } from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import { TRUNCATE_STRING } from "../../../utils/Methods";
import { DOMAIN_NAME } from "../../../utils/GlobalSettings";
import { Collapse, Popover } from "antd";
import { ICONS } from "../../../data/IconData";
import { useSelector } from "react-redux";
import AccountSwitcherPopup from "./AccountSwitcherPopup";
import "./styles/AccountSwitcher.css";
import useWindowWidth from "../../../hooks/useWindowWidth";

const AccountSwitcher = () => {
  const { current_account } = useSelector((state) => state.authToken);
const windowWidth = useWindowWidth()
  console.log(current_account)
  const popoverPlacement = windowWidth < 700 ? "bottomLeft" : "rightTop";
  return (
    <div className="side-bar-btn-wrapper">
      <Popover content={<AccountSwitcherPopup />} trigger="click" placement={popoverPlacement} overlayClassName="account-switcher-popover" >
        <div className="left-panel-collapse-account" >
           <div className="account-switcher-btn">
                <span className="panel-header-span">
                {current_account?.account_image ? (
                  <img src={`${DOMAIN_NAME}${current_account?.account_image}`} alt="" height={25} className="account-switcher-account-img" />
                ) : (
                  <MyIcon type={"user"} />
                )}
                {TRUNCATE_STRING(current_account?.name, 17)}
              </span>
              <img src={ICONS.arrow_up_down} style={{ height: "14px", transition: "transform 0.3s ease",}} />
            </div>
        </div>
      </Popover>
    </div>
  );
};

export default AccountSwitcher;

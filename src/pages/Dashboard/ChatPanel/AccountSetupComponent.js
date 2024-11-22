import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import MyIcon from "../../../components/Icon/MyIcon";
import "./styles/AccountSetupComponent.css";
import "./styles/DashboardChatPanel.css";
import {
  API_FETCH_TOKEN,
  API_GENERATE_AUTH_URL,
  API_SELECT_ACCOUNT,
} from "../../../apis/FacebookInsightsApis";
import { useDispatch, useSelector } from "react-redux";
import { setFacebookState, setRerenderDashboard } from "../../../redux/AuthToken/Action";
import { FRONTEND_DOMAIN_NAME } from "../../../utils/GlobalSettings";

const AccountSetupComponent = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account, facebook_state,rerender_dashboard } = useSelector(
    (state) => state.authToken
  );
  const [CodeExtracted, setCodeExtracted] = useState(false);
  const [AccountList, setAccountList] = useState(null);
  const dispatch = useDispatch();
  const connectFbHandler = async () => {
    const response = await API_GENERATE_AUTH_URL(token, setShowSpinner);
    if (response) {
      dispatch(setFacebookState(response?.state));
      window.location.href = response?.authorization_url;
    }
  };
  useEffect(() => {
    const fetchToken = async () => {
      const urlObj = new URL(window.location.href);
      const code = urlObj.searchParams.get("code");

      if (code && !CodeExtracted) {
        const decodedRedirectResponse = decodeURIComponent(
          window.location.href
        );
        const response = await API_FETCH_TOKEN(
          token,
          decodedRedirectResponse,
          facebook_state,
          setShowSpinner
        );
        setAccountList(response?.account_list);
        setCodeExtracted(true);
      }
      else{
        setAccountList(null)
      }
    };

    fetchToken();
  }, [token, facebook_state]);
  const handleAccountClick = async (id) => {
    const response = await API_SELECT_ACCOUNT(token, id, setShowSpinner);
    if(response)
    {
        dispatch(setRerenderDashboard(!rerender_dashboard))
    }
    console.log(id);
  };
  return (
    <Row className="account-setup-component-main">
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        style={{ display: "flex", width: "100%" }}
      >
        <span className="robot-icon-wrapper">
          <MyIcon type={"robot"} className={"response-icon"} size="md" />
        </span>
        <div className="account-setup-component-content">
          {AccountList ? (
            <>
              <p className="account-setup-component-title"><MyIcon type={'account_setup'} size="md"/> Select Account</p>
              <div className="account-list-wrapper">
                {AccountList?.map((item) => (
                  <div
                    onClick={() => handleAccountClick(item?.id)}
                    className="account-setup-component-account-list-name"
                  >
                    {item?.name}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="account-setup-component-title"><MyIcon type={'account_setup'} size="md"/> Account Setup</p>
              <div className="account-setup-component-description">
                <p>Let's get your account setup by integrating your accounts</p>
                <div className="account-setup-component-account">
                  <span className="account-setup-component-account-name">
                    <MyIcon
                      className="account-setup-component-account-icon"
                      type={"facebook"}
                      size="md"
                    />
                    Facebook Ad Account
                  </span>
                  <button
                    className="account-setup-component-connect-button"
                    onClick={connectFbHandler}
                  >
                    Connect Facebook
                  </button>
                </div>
                <p className="account-setup-component-help">
                  If you have any questions or need help please just type a
                  question below thanks!
                </p>
              </div>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default AccountSetupComponent;

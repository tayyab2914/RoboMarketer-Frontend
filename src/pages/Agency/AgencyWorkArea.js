import { Col, Row, Button, DatePicker, Popover, Space } from "antd";
import React, { useEffect, useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import "./styles/AgencyWorkArea.css";
import SubAccountCard from "./SubAccountCard";
import { useSelector } from "react-redux";
import NewSubAccountModal from "./NewSubAccountModal";
import useWindowWidth from "../../hooks/useWindowWidth";
import { API_AGENCY_GET_INSIGHTS, API_GET_ACCOUNTS } from "../../apis/AgencyApis";
import { rangePresets } from "../../utils/Methods";
import moment from "moment";

const { RangePicker } = DatePicker;

const AgencyWorkArea = () => {
  const { token,rerender_dashboard } = useSelector((state) => state.authToken);
  const windowWidth = useWindowWidth();
  const [accounts, setAccounts] = useState([]);
  const [Metrics, setMetrics] = useState([]);
  const [AccountsAvailable, setAccountsAvailable] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  
  // ✅ State for Date Range Picker
  const [dateRange, setDateRange] = useState([
    moment().startOf("day"), 
    moment().endOf("day")
  ]);
  const [CurrentMetricRangeName, setCurrentMetricRangeName] = useState("Today");
  
  // ✅ State for Popover visibility
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const fetchAccounts = async () => {
    try {
      const response = await API_GET_ACCOUNTS(token);
      setAccounts(response?.accounts || []);
      setAccountsAvailable(response?.accounts_available || 0);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  // ✅ Handle Date Selection and Update Button Text
  const handleCustomRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates); 
      setCurrentMetricRangeName(`From ${dates[0].format("MM/DD/YY")} to ${dates[1].format("MM/DD/YY")}`);
      setIsPopoverVisible(false); // ✅ Close popover after selection
    }
  };

  // ✅ Get Insights using `dateRange`
  useEffect(() => {
    if (!dateRange || dateRange.length < 2) return;

    const getInsights = async () => {
      try {
        const startDate = dateRange[0].format("MM/DD/YY");
        const endDate = dateRange[1].format("MM/DD/YY");

        console.log("Fetching insights for dateRange:", startDate, "-", endDate);
        const response = await API_AGENCY_GET_INSIGHTS(token, startDate, endDate);
        setMetrics(response || []);
        console.log(response)
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    getInsights();
  }, [dateRange,rerender_dashboard]); // ✅ Runs whenever `dateRange` changes

  return (
    <div>
      <Row>
        <Col xs={24}>
          <div style={{ height: windowWidth < 1200 ? "40.8px" : "0px" }}></div>
          <Row className="awa-heading-main-sub-accounts">
            <Col xs={24} md={12}>
              <span className="awa-heading">
                <MyIcon type={"sub_accounts"} /> Sub-Accounts 
                {/* ✅ Popover with RangePicker */}
                <Popover
                  content={
                    <Space direction="vertical" size={12} style={{padding:"10px"}}><RangePicker 
                      onChange={handleCustomRangeChange} 
                      presets={rangePresets} 
                      format="MM/DD/YY"
                    /></Space>
                  }
                  trigger="click"
                  open={isPopoverVisible}
                  onOpenChange={setIsPopoverVisible}
                >
                  <button 
                  className="awa-heading-btn-white"
                  >
                    <MyIcon type={'calendar'}/>{CurrentMetricRangeName}<MyIcon type={"arrow_down"} style={{height:"5px"}}/>
                  </button>
                </Popover>
              </span>
            </Col>

            <Col xs={24} md={12} style={{ textAlign: "end" }}>
              <span className="awa-heading-btns-wrapper">
                <button className="awa-heading-btns" onClick={() => setModalVisible(true)}>  
                  + Create New 
                </button>
              </span>
            </Col>
          </Row>
        </Col>

        <Col xs={24} className="awa-sub-accounts-main">
          <Row gutter={[25, 25]}>
            {accounts
              ?.filter((account) => !account.is_current_account && account?.name?.toLowerCase())
              .map((account, index) => (
                <Col xs={24} key={index}>
                  <SubAccountCard
                    subAccountID={account.id}
                    companyLogo={account.logo}
                    companyName={account.name}
                    email={account.email}
                    phone={account.phone_no}
                    fetchAccounts={fetchAccounts}
                    Metrics={Metrics}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      <NewSubAccountModal 
        isVisible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        fetchAccounts={fetchAccounts} 
      />
    </div>
  );
};

export default AgencyWorkArea;
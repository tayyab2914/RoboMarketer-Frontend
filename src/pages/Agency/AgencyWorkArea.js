import { Col, Row, Modal, Button, DatePicker, Collapse, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import MyIcon from '../../components/Icon/MyIcon';
import './styles/AgencyWorkArea.css';
import SubAccountCard from './SubAccountCard';
import { useSelector } from 'react-redux';
import NewSubAccountModal from './NewSubAccountModal';
import useWindowWidth from '../../hooks/useWindowWidth';
import { API_AGENCY_GET_INSIGHTS, API_GET_ACCOUNTS } from '../../apis/AgencyApis';
import { rangePresets } from '../../utils/Methods';
import { DownOutlined } from "@ant-design/icons";
import moment from "moment";
const { Panel } = Collapse;
const { RangePicker } = DatePicker; 


const AgencyWorkArea = () => {
  const { token, current_account } = useSelector((state) => state.authToken);
    const [collapseKey, setCollapseKey] = useState("0");
  const [accounts, setAccounts] = useState([])
        const [Metrics, setMetrics] = useState([]);
  const [AccountsAvailable, setAccountsAvailable] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); 
  const [CurrentMetricRangeName, setCurrentMetricRangeName] = useState('Today');
  const [dateRange, setDateRange] = useState([moment().startOf("day"), moment().endOf("day")]);
  const windowWidth=useWindowWidth()
  const [StartingDate, setStartingDate] = useState(moment().format("MM/DD/YY"));
  const [EndingDate, setEndingDate] = useState(moment().format("MM/DD/YY"));
  const [RerenderWorkarea, setRerenderWorkarea] = useState(false);
  const fetchAccounts = async () => {
    const response = await API_GET_ACCOUNTS(token);
    setAccounts(response?.accounts);
    setAccountsAvailable(response?.accounts_available);
  };

  useEffect(() => {
    fetchAccounts();
  }, [token]);


  const handleCustomRangeChange = (dates) => {
    if (dates) {
      const startDate = dates[0].format('MM/DD/YY');
      const endDate = dates[1].format('MM/DD/YY');  
      setStartingDate(startDate)
      setEndingDate(endDate)
      setCurrentMetricRangeName(`From ${startDate} to ${endDate}`);
      setCollapseKey(null);
      setDateRange(dates); 
    }
  };

  const getInsights = async () => {
    const response = await API_AGENCY_GET_INSIGHTS(token, StartingDate, EndingDate);

    setMetrics(response);
    // ure Metrics is set first
};

  useEffect(()=>{
    getInsights()

  },[StartingDate,EndingDate])
  return (
    <>
        <Row>
            <Col xs={24}>
                <div style={{height:windowWidth<1200 ? "40.8px":'0px'}}></div>
                <Row className="awa-heading-main">
                <Col xs={24} md={12}> <span className="awa-heading"> 
                    <MyIcon type={"sub_accounts"} /> Sub-Accounts 
                    {/* <Collapse style={{marginLeft:"10px"}} className="awa-heading-collapse" expandIconPosition={"end"} activeKey={collapseKey} onChange={(key) => setCollapseKey(key)} expandIcon={({ isActive }) => ( <DownOutlined style={{ transition: "transform 0.3s ease", transform: isActive ? "rotate(-180deg)" : "rotate(0deg)", }} /> )} >
                        <Panel header={ <span className="panel-header-span"> <MyIcon type={"calendar"} /> {CurrentMetricRangeName} </span> } key="1" >
                            <Space direction="vertical" size={12} style={{ marginTop: "10px" }}>
                                </Space>
                        </Panel>
                    </Collapse> */}
                    <RangePicker  onChange={handleCustomRangeChange}  presets={rangePresets} />
                            
                </span> 
                </Col>
                
                <Col xs={24} md={12} style={{textAlign:"end"}}>
                    <span className='awa-heading-btns-wrapper'>
                        {/* <span className="awa-heading-btns-count"> <span className='text' >Sub-Accounts Available</span> <span className="awa-heading-btn-count">{AccountsAvailable}</span> </span> */}
                        <button className="awa-heading-btns" onClick={()=>setModalVisible(true)}>  + Create New </button>
                    </span>
                </Col>
                
                </Row>
            </Col>

            <Col xs={24} className="awa-sub-accounts-main">

                <Row gutter={[25, 25]} >
                {accounts?.filter( (account) => !account.is_current_account && account?.name?.toLowerCase() ).map((account, index) => (
                    <Col xs={24}  key={index}>
                    <SubAccountCard subAccountID={account.id} companyLogo={account.logo} companyName={account.name} email={account.email} phone={account.phone_no} fetchAccounts={fetchAccounts} Metrics={Metrics}/> 
                    </Col>
                ))}
                </Row>
            </Col>

        </Row>
        <NewSubAccountModal isVisible={modalVisible} onClose={()=>setModalVisible(false)} fetchAccounts={fetchAccounts}/>
    </>
  );
};

export default AgencyWorkArea;

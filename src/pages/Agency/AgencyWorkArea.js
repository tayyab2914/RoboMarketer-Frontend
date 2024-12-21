import { Col, Row, Modal, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import MyIcon from '../../components/Icon/MyIcon';
import './styles/AgencyWorkArea.css';
import SubAccountCard from './SubAccountCard';
import { useSelector } from 'react-redux';
import { API_GET_ACCOUNTS } from '../../apis/AuthApis';
import NewSubAccountModal from './NewSubAccountModal';
import useWindowWidth from '../../hooks/useWindowWidth';



const AgencyWorkArea = () => {
  const { token, current_account } = useSelector((state) => state.authToken);
  const [accounts, setAccounts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 
  const windowWidth=useWindowWidth()

  const fetchAccounts = async () => {
    const response = await API_GET_ACCOUNTS(token);
    setAccounts(response);
    console.log(response);
  };

  useEffect(() => {
    fetchAccounts();
  }, [token]);

  return (
    <>
        <Row>
            <Col xs={24}>
                <div style={{height:windowWidth<1200 ? "40.8px":'0px'}}></div>
                <Row className="awa-heading-main">
                <Col xs={24} md={5}> <span className="awa-heading"> <MyIcon type={"sub_accounts"} /> Sub-Accounts </span> </Col>
                <Col xs={24} md={18} style={{textAlign:"end"}}>
                    <span>
                        <button className="awa-heading-btns"> Sub-Accounts Available <span className="awa-heading-btn-count">100</span> </button>
                        <button className="awa-heading-btns" onClick={()=>setModalVisible(true)}> <MyIcon type={'plus_black'} /> Create New </button>
                    </span>
                </Col>
                
                </Row>
            </Col>

            <Col xs={24} className="awa-sub-accounts-main">

                <Row gutter={[25, 25]} >
                {accounts?.filter( (account) => !account.is_current_account && account?.name?.toLowerCase() ).map((account, index) => (
                    <Col xs={24} sm={12} md={8} xl={6} key={index}>
                    <SubAccountCard subAccountID={account.id} companyLogo={account.account_image} companyName={account.name} email={account.email} phone={account.phone} /> 
                    </Col>
                ))}
                </Row>
            </Col>

        </Row>
        <NewSubAccountModal isVisible={modalVisible} onClose={()=>setModalVisible(false)} />
    </>
  );
};

export default AgencyWorkArea;

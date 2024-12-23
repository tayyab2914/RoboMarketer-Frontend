import React, { useState } from "react";
import { EyeOutlined, DeleteOutlined, EditOutlined, MessageOutlined } from "@ant-design/icons"; // Import icons from Ant Design
import { IMAGES } from "../../data/ImageData";
import MyIcon from "../../components/Icon/MyIcon";
import './styles/SubAccountCard.css'
import { Popconfirm } from "antd";
import { DOMAIN_NAME } from "../../utils/GlobalSettings";
import NewSubAccountModal from "./NewSubAccountModal";
import { API_DELETE_ACCOUNT, API_SEND_INVITE_EMAIL } from "../../apis/AgencyApis";
import { useDispatch, useSelector } from "react-redux";
import { TRUNCATE_STRING } from "../../utils/Methods";
import { setAuthToken, setRerenderDashboard } from "../../redux/AuthToken/Action";
import { useNavigate } from "react-router-dom";
import { API_SWITCH_ACCOUNT } from "../../apis/AuthApis";
// Function definitions for each action

const SubAccountCard = ({ companyLogo,subAccountID, companyName, email, phone,fetchAccounts }) => {
    const [ShowEditModal, setShowEditModal] = useState(false);
    const { token,rerender_dashboard } = useSelector((state) => state.authToken);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleView = async() => {
              const response = await API_SWITCH_ACCOUNT(token, subAccountID, null);
                 dispatch(setAuthToken(response));
                dispatch(setRerenderDashboard(!rerender_dashboard));
               navigate('/')
        
      };
      
      const handleDelete = async() => {
            await API_DELETE_ACCOUNT(token,subAccountID,null)
            fetchAccounts()
      };
      
      const handleEdit = () => {
        setShowEditModal(true)
      };
      
      const handleMessage = async() => {
        await API_SEND_INVITE_EMAIL(token,subAccountID,null)
      };
      
  return (
   <>
    <div className="sub-account-card">
      <div className="sac-company-info">
        <img src={companyLogo ? `${DOMAIN_NAME}/media/${companyLogo}`:IMAGES.user} alt="Company Logo" height={24} className="sac-company-logo" />
        
      </div>

      <div className="sac-contact-info">
            <div className="sac-company-name">{TRUNCATE_STRING(companyName,25)}</div>
            <div className="sac-email"><MyIcon type={'sa_message'}/>{TRUNCATE_STRING(email,17)}</div>
            <div className="sac-phone"><MyIcon type={'sa_phone'}/>{phone}</div>
      </div>    

      <div className="sac-icons">
        <span onClick={handleView}> <MyIcon type={'sa_eye'} /> </span>

        <Popconfirm title="Are you sure you want to delete this account?" onConfirm={handleDelete} okText="Yes" cancelText="No" >
        <span > <MyIcon type={'sa_delete'} /> </span>
        </Popconfirm>
        
        <span onClick={handleEdit}> <MyIcon type={'sa_edit'} /> </span>
        <span onClick={handleMessage}> <MyIcon type={'sa_message'} /> </span>
      </div>
    </div>
    <NewSubAccountModal  isVisible={ShowEditModal}  onClose={() => setShowEditModal(false)}  defaultValues={{ companyName: companyName, email: email, phone: phone,logo:companyLogo,id:subAccountID}} editMode={true}  fetchAccounts={fetchAccounts}/>
        </>
  );
};

export default SubAccountCard;

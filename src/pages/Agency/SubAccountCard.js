import React, { useState } from "react";
import { EyeOutlined, DeleteOutlined, EditOutlined, MessageOutlined } from "@ant-design/icons"; // Import icons from Ant Design
import { IMAGES } from "../../data/ImageData";
import MyIcon from "../../components/Icon/MyIcon";
import './styles/SubAccountCard.css'
import { Popconfirm } from "antd";
import { DOMAIN_NAME } from "../../utils/GlobalSettings";
import NewSubAccountModal from "./NewSubAccountModal";
// Function definitions for each action

const SubAccountCard = ({ companyLogo,subAccountID, companyName, email, phone }) => {
    const [ShowEditModal, setShowEditModal] = useState(false);
    const handleView = () => {
        console.log("View clicked",subAccountID);
      };
      
      const handleDelete = () => {
        console.log("Delete clicked",subAccountID);
      };
      
      const handleEdit = () => {
        console.log("Edit clicked",subAccountID);
        setShowEditModal(true)
      };
      
      const handleMessage = () => {
        console.log("Message clicked",subAccountID);
      };
      
  return (
   <>
    <div className="sub-account-card">
      <div className="sac-company-info">
        <img src={companyLogo ? `${DOMAIN_NAME}${companyLogo}`:IMAGES.user} alt="Company Logo" height={24} className="company-logo" />
        
      </div>

      <div className="sac-contact-info">
            <div className="sac-company-name">{companyName}</div>
            <div className="sac-email"><MyIcon type={'sa_message'}/>{email}</div>
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
    <NewSubAccountModal 
  isVisible={ShowEditModal} 
  onClose={() => setShowEditModal(false)} 
  defaultValues={{ companyName: companyName, email: "MUHAMANBUTT", phone: "7723" }} 
/>
        </>
  );
};

export default SubAccountCard;

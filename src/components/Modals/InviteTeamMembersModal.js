import React, { useEffect, useState } from "react";
import { Modal, Input, Button,  Upload, Form, Row, Col, Popconfirm, Tag,  } from "antd";
import MyIcon from "../Icon/MyIcon";
import "./styles/ModalStyles.css";
import './styles/ChatgptModal.css'
import { API_KEY_RULES_REQUIRED, EMAIL_RULES_REQUIRED } from "../../utils/Rules";
import './styles/InviteMembersModal.css'
import { ICONS } from "../../data/IconData";
import { API_DELETE_INVITED_USER, API_GET_INVITE_EMAILS, API_SEND_CLIENT_INVITE } from "../../apis/InviteApis";
import { useSelector } from "react-redux";
const InviteTeamMembersModal = ({ isVisible, onClose }) => {
    const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [InvitedMembers, setInvitedMembers] = useState([]);
  const [Email, setEmail] = useState('');
  const dummyData = [
    { id: 1, name: "John Doe", email: "johndoe@example.com", image: "https://via.placeholder.com/150", },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", image: "https://via.placeholder.com/150", },
    {id: 3,name: "Alice Johnson",email: "alicejohnson@example.com",image: "https://via.placeholder.com/150", },
    {id: 4,name: "Bob Brown",email: "bobbrown@example.com",image: "https://via.placeholder.com/150", },
    {id: 5,name: "Charlie Davis",email: "charliedavis@example.com",image: "https://via.placeholder.com/150", },
    {id: 6,name: "Emma Wilson",email: "emmawilson@example.com",image: "https://via.placeholder.com/150", },
    { id: 7, name: "Liam Martinez", email: "liammartinez@example.com", image: "https://via.placeholder.com/150", },
    { id: 8, name: "Sophia Anderson", email: "sophiaanderson@example.com", image: "https://via.placeholder.com/150", },
    { id: 9, name: "Oliver Thomas", email: "oliverthomas@example.com", image: "https://via.placeholder.com/150", },
    { id: 10, name: "Mia White", email: "miawhite@example.com", image: "https://via.placeholder.com/150", },
  ];
  
  const fetchInvitedMembers = async()=>{
    const response = await API_GET_INVITE_EMAILS(token)
    console.log(response?.invited_emails)
    setInvitedMembers(response?.invited_emails)
  }
  useEffect(()=>{
    fetchInvitedMembers()
  },[])
  
  const handleSubmit = async() => {
    await API_SEND_CLIENT_INVITE(token,Email)
    fetchInvitedMembers()
  };
  
  const handleDelete = async(id)=>{
    await API_DELETE_INVITED_USER(token,id)
    fetchInvitedMembers()
  }
  return (
    <div className="invite-members-modal">
      <Modal className="" title={false} centered visible={isVisible} onCancel={onClose} closable={false} footer={null} >
      <div className="custom-modal-header" style={{ display: "flex" }}>
          <span className="product-modal-header" style={{ width: "100%" }}>
            <span> <MyIcon type="invite_members" style={{ marginRight: "5px" }} size="md" /> Invite Team Members</span> 
          </span>
            <span> <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" /> </span>
        </div>
        <div style={{padding:"15px 15px 0px 15px"}}>
          <Form>
            <Row gutter={[10]}>
                <Col xs={18}>
                    <Form.Item name="email" rules={EMAIL_RULES_REQUIRED} style={{ marginBottom: 0 }} >
                    <Input className="invite-members-email-input" placeholder="Type Email Address.." value={Email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>
                </Col>
                <Col xs={6} >
                    <button className="invite-members-submit-btn" onClick={handleSubmit}>Invite</button>
                </Col>
            </Row>
          </Form>
        </div>
        <div>
        <div className="invited-members-list">
        {InvitedMembers.map((item) => (
            <div key={item.id} className="invited-member-row">
            <span className="invited-member-row-inner">
                {/* <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: "50%" }} /> */}
                
                <img src={ICONS.user} alt={item.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <span >
                    <div style={{ marginLeft: 10 }} className="invited-member-name">DUMMY NAME</div>
                    <div style={{ marginLeft: 10 }} className="invited-member-email">{item.email}</div>
                </span>
            </span>
            <span>
                {item?.is_joined ? <Tag color="green">Joined</Tag> :<Tag color="red">Pending</Tag>}
                <Popconfirm title="Are you sure you want to remove this request?" onConfirm={()=>handleDelete(item?.id)} okText="Yes" cancelText="No" >
                    <img src={ICONS.delete_btn_outlined} alt="" height={40} className="invited-member-icon" />
                </Popconfirm>
            </span>
            
            
            </div>
        ))}
        </div>

        </div>
      </Modal>
    </div>
  );
};

export default InviteTeamMembersModal;
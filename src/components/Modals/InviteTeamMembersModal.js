import React, { useEffect, useState } from "react";
import { Modal, Input, Form, Row, Col, Popconfirm, Tag, Spin } from "antd";
import MyIcon from "../Icon/MyIcon";
import "./styles/ModalStyles.css";
import "./styles/ChatgptModal.css";
import { EMAIL_RULES_REQUIRED } from "../../utils/Rules";
import "./styles/InviteMembersModal.css";
import { ICONS } from "../../data/IconData";
import { API_DELETE_INVITED_USER, API_GET_INVITE_EMAILS, API_SEND_CLIENT_INVITE } from "../../apis/InviteApis";
import { useSelector } from "react-redux";

const InviteTeamMembersModal = ({ isVisible, onClose }) => {
  const { token } = useSelector((state) => state.authToken);
  const [form] = Form.useForm(); 
  const [showSpinner, setShowSpinner] = useState(false);
  const [InvitedMembers, setInvitedMembers] = useState([]);
  const [Email, setEmail] = useState("");

  
  const fetchInvitedMembers = async () => {
    const response = await API_GET_INVITE_EMAILS(token);
    setInvitedMembers(response?.invited_emails || []);
  };

  useEffect(() => {
    fetchInvitedMembers();
  }, []);

  
  const handleSubmit = async () => {
    try {
      setShowSpinner(true);
      await form.validateFields(); 
      await API_SEND_CLIENT_INVITE(token, Email); 
      form.resetFields();
      setEmail("");
      fetchInvitedMembers(); 
    } catch (error) {
      console.error("Error inviting member:", error);
    } finally {
      setShowSpinner(false);
    }
  };


  const handleDelete = async (id) => {
    await API_DELETE_INVITED_USER(token, id);
    fetchInvitedMembers();
  };

  return (
    <div className="invite-members-modal">
      <Modal title={false} centered visible={isVisible} onCancel={onClose} closable={false} footer={null}>
        <div className="custom-modal-header" style={{ display: "flex" }}>
          <span className="product-modal-header" style={{ width: "100%" }}>
            <span>
              <MyIcon type="invite_members" style={{ marginRight: "5px" }} size="md" /> Invite Team Members
            </span>
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>
        <div style={{ padding: "15px 15px 0px 15px" }}>
          <Form form={form}>
            <Row gutter={[10]}>
                <Col xs={18}>
                    <Form.Item name="email" rules={EMAIL_RULES_REQUIRED} style={{ marginBottom: 0 }} >
                    <Input className="invite-members-email-input" placeholder="Type Email Address.." value={Email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Item>
                </Col>
                <Col xs={6} >
                    <button className="invite-members-submit-btn" onClick={handleSubmit} disabled={showSpinner}>
                      {showSpinner ? <Spin size="small"/> : "Invite"}
                    </button>
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
                
                <img src={ICONS.invited_member} alt={item.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                <span >
                    <div style={{ marginLeft: 10 }} className="invited-member-name">{item.email}</div>
                    {/* <div style={{ marginLeft: 10 }} className="invited-member-email">{item.email}</div> */}
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

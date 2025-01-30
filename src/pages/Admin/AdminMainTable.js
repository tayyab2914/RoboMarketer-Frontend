import React, { useState, useEffect } from "react";
import { Table, Pagination, Modal, Input, Button, Form, Popconfirm, Switch } from "antd";
import './styles/AdminMainTable.css';
import MyIcon from "../../components/Icon/MyIcon";
import moment from "moment"; // Import moment.js for date formatting
import { ACCOUNT_RULES_REQUIRED, EMAIL_RULES_REQUIRED, NAME_RULES_REQUIRED, PHONE_NUMBER_RULES_REQUIRED } from "../../utils/Rules";
import { API_UPDATE_ACCESS } from "../../apis/AuthApis";
import { useSelector } from "react-redux";

const AdminMainTable = ({ UsersList, onSaveUserData,onDeleteUserData }) => {
    
  const {
    isLoggedIn,
    token,
    rerender_dashboard,
    rerender_chat_panel,
    current_account,
  } = useSelector((state) => state.authToken);
    const formattedData = UsersList.map((user, index) => ({
        key: user.id || index + 1,
        first_name: user.first_name || 'N/A', 
        email: user.email,
        phone: user.phone_number || 'N/A', 
        lastLogin: user.last_login ? moment(user.last_login).format('DD/MM/YY hh:mm A') : 'N/A', 
        accounts: user.total_accounts || 0,
        actions: (
            <>
                <MyIcon  type="edit_btn"  size="xl"  style={{ cursor: 'pointer' }}  onClick={() => handleEditClick(user)}  />
                <Popconfirm title="Are you sure you want to delete this user?" onConfirm={() => onDeleteUserData(user.id)} okText="Yes" cancelText="No" >
                    <MyIcon  type="delete_btn"  size="xl"  style={{ cursor: 'pointer', marginLeft: 10 }}  />
                </Popconfirm>
                <Switch style={{ marginLeft: 10 }} defaultChecked={false} onChange={(checked) => handleUpgradeAccessClick(user.id,checked)}/>
            </>
        ),
    }));

    const columns = [
        { title: 'NAME', dataIndex: 'first_name', key: 'name', width: '10%' },
        { title: 'EMAIL', dataIndex: 'email', key: 'email', width: '20%' },
        { title: 'PHONE', dataIndex: 'phone', key: 'phone', width: '17.5%' },
        { title: 'LAST LOGIN', dataIndex: 'lastLogin', key: 'lastLogin', width: '22.5%' },
        { title: 'ROBOMARKETER ACCOUNTS', dataIndex: 'accounts', key: 'accounts', width: '10%' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions', width: '15%' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm(); // Create form instance

    const handleUpgradeAccessClick = async(id,checked)=>{
        await API_UPDATE_ACCESS(token,id,checked)
    } 

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                first_name: selectedUser.first_name,
                email: selectedUser.email,
                phone_number: selectedUser.phone_number,
                total_accounts: selectedUser.total_accounts,
            });
        }
    }, [selectedUser, form]); // Update form values when selectedUser changes

    const handleSave = (values) => {
        onSaveUserData({ ...selectedUser, ...values });
        setIsModalVisible(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedData = formattedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div className="admin-table">
            <div className="table-header">
               
            </div>

            <div className="table-wrapper">
                <Table columns={columns} dataSource={paginatedData} pagination={false} rowKey="key" />
            </div>

            <div className="admin-table-pagination">
            <span> Showing {Math.min((currentPage - 1) * pageSize + 1, formattedData.length)} to {Math.min(currentPage * pageSize, formattedData.length)} of {formattedData.length} results</span>
            
                <Pagination current={currentPage} pageSize={pageSize} total={formattedData.length} onChange={handlePageChange} showSizeChanger={false} />
            </div>

            <Modal
        className=""
        title={false}
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        closable={false}
        footer={null}
      >
        <div className="custom-modal-header">
          <span className="modal-header">
            <MyIcon type="account" style={{ marginRight: "5px" }} size="md" /> 
            Account (Client) Settings
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={() => setIsModalVisible(false)} size="lg" className="close-icon" />
          </span>
        </div>
        <div className="modal-content">
                <Form form={form} layout="vertical" onFinish={handleSave} className="admin-main-table-form" >
                    <Form.Item label="First Name" name="first_name" rules={NAME_RULES_REQUIRED} className="admin-main-table-edit-input-field" required={false}>
                        <Input   prefix={<MyIcon type={'signin_user'}/>}/>
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={EMAIL_RULES_REQUIRED} className="admin-main-table-edit-input-field" required={false}>
                        <Input   prefix={<MyIcon type={'signin_email'}/>}/>
                    </Form.Item>
                    <Form.Item label="Number of Accounts" name="total_accounts" rules={ACCOUNT_RULES_REQUIRED} className="admin-main-table-edit-input-field" required={false}>
                        <Input type="number"  prefix={<MyIcon type={'users'}/>}/>
                    </Form.Item>
                    <Form.Item label="Phone Number" name="phone_number" rules={PHONE_NUMBER_RULES_REQUIRED} className="admin-main-table-edit-input-field" required={false}>
                        <Input   prefix={<MyIcon type={'signin_password'}/>}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="admin-main-table-edit-submit-btn"> Save Changes </Button>
                </Form></div>
            </Modal>
        </div>
    );
};

export default AdminMainTable;

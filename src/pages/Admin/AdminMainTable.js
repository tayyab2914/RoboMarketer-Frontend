import React, { useState, useEffect } from "react";
import { Table, Pagination, Modal, Input, Button, Form, Popconfirm } from "antd";
import './styles/AdminMainTable.css';
import MyIcon from "../../components/Icon/MyIcon";
import moment from "moment"; // Import moment.js for date formatting

const AdminMainTable = ({ UsersList, onSaveUserData,onDeleteUserData }) => {
    const formattedData = UsersList.map((user, index) => ({
        key: user.id || index + 1,
        first_name: user.first_name || 'N/A', 
        email: user.email,
        phone: user.phone_number || 'N/A', 
        lastLogin: user.last_login ? moment(user.last_login).format('DD/MM/YYYY hh:mm A') : 'N/A', 
        accounts: user.total_accounts || 0,
        actions: (
            <>
                <MyIcon  type="edit_btn"  size="xl"  style={{ cursor: 'pointer' }}  onClick={() => handleEditClick(user)}  />
                <Popconfirm title="Are you sure you want to delete this user?" onConfirm={() => onDeleteUserData(user.id)} okText="Yes" cancelText="No" >
                    <MyIcon  type="delete_btn"  size="xl"  style={{ cursor: 'pointer', marginLeft: 10 }}  />
                </Popconfirm>
            </>
        ),
    }));

    const columns = [
        { title: 'NAME', dataIndex: 'first_name', key: 'name', width: '15%' },
        { title: 'EMAIL', dataIndex: 'email', key: 'email', width: '25%' },
        { title: 'PHONE', dataIndex: 'phone', key: 'phone', width: '17.5%' },
        { title: 'LAST LOGIN', dataIndex: 'lastLogin', key: 'lastLogin', width: '17.5%' },
        { title: 'ROBOMARKETER ACCOUNTS', dataIndex: 'accounts', key: 'accounts', width: '10%' },
        { title: 'ACTIONS', dataIndex: 'actions', key: 'actions', width: '15%' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm(); // Create form instance

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
                title="Edit User"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form} // Use form instance
                    layout="vertical"
                    onFinish={handleSave}
                    className="admin-main-table-form"
                >
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: 'Please enter the first name' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter the email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit"> Save Changes </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminMainTable;

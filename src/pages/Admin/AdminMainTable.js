import React, { useState } from "react";
import { Table, Pagination } from "antd";
import './styles/AdminMainTable.css';
import MyIcon from "../../components/Icon/MyIcon";

const AdminMainTable = () => {
  const data = Array.from({ length: 200 }, (_, index) => ({
    key: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+123456789${index}`,
    lastLogin: '2024-11-15 10:30 AM',
    accounts: 2,
    actions: (
      <>
        <MyIcon type={'edit_btn'} size="xl" style={{ cursor: 'pointer' }} />
        <MyIcon type={'delete_btn'} size="xl" style={{ cursor: 'pointer', marginLeft: 10 }} />
      </>
    ),
  }));

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'PHONE',
      dataIndex: 'phone',
      key: 'phone',
      width: '15%',
    },
    {
      title: 'LAST LOGIN',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      width: '20%',
    },
    {
      title: 'ROBOMARKETER ACCOUNTS',
      dataIndex: 'accounts',
      key: 'accounts',
      width: '20%',
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      width: '15%',
      render: (text) => <span>{text}</span>,
    },
  ].filter(Boolean);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="admin-table">
      <div className="table-header">
        {/* Showing results info */}
      </div>

      {/* Responsive Table Wrapper */}
      <div className="table-wrapper">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          rowKey="key"
        />
      </div>

      <div className="admin-table-pagination">
        <span> Showing {Math.min((currentPage - 1) * pageSize + 1, data.length)} to {Math.min(currentPage * pageSize, data.length)} of {data.length} results</span>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AdminMainTable;

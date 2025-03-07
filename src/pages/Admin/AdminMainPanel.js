import { Col, Row, Input, Drawer, Spin } from "antd";
import React, { useEffect, useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import { SearchOutlined } from "@ant-design/icons";
import "./styles/AdminMainPanel.css";
import AdminMainTable from "./AdminMainTable";
import useWindowWidth from "../../hooks/useWindowWidth";
import AdminLeftPanel from "./AdminLeftPanel";
import CreateSignUpLinkBtn from "./CreateSignUpLinkBtn";
import { API_DELETE_USER, API_GET_USERS_LIST, API_UPDATE_USER } from "../../apis/AuthApis";
import { useSelector } from "react-redux";

const AdminMainPanel = () => {
  const { token } = useSelector((state) => state.authToken);
  const windowWidth = useWindowWidth();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [filteredUsersList, setFilteredUsersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const getUsersList = async () => {
    const response = await API_GET_USERS_LIST(token,setShowSpinner);
    setUsersList(response);
    console.log(response)
    setFilteredUsersList(response);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = usersList.filter((user) => (user.first_name || "").toLowerCase().includes(query.toLowerCase()) || (user.email || "").toLowerCase().includes(query.toLowerCase()) || (user.phone_number || "").includes(query) );
      setFilteredUsersList(filteredData);
    } else {
      setFilteredUsersList(usersList);
    }
  };
  const handleSaveUserData = async (updatedUser) => {
    await API_UPDATE_USER(token,updatedUser.id, updatedUser, setShowSpinner);
    getUsersList()
};
  const handleDeleteUser = async (userId) => {
    await API_DELETE_USER(token,userId,  setShowSpinner);
    getUsersList()
};
  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div>
      {showSpinner && <Spin fullscreen />}
      <Row className="admin-main-panel-header">
        <Col xs={6}>
          <p className="admin-main-panel-header-text">
            <MyIcon type={"users_two"} size="md" /> Users
          </p>
        </Col>
        <Col xs={18} className="admin-main-panel-search">
          {windowWidth >= 992 && (
            <div className="header-data">
              <Input placeholder="Search" className="admin-main-panel-search-bar" prefix={<SearchOutlined style={{ marginRight: "5px" }} />} size="large" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
              {/* <CreateSignUpLinkBtn /> */}
            </div>
          )}
          {windowWidth < 1200 && (
            <span className="admin-main-panel-hamburger" onClick={showDrawer}>
              <MyIcon type={"hamburger"} size="lg" />
            </span>
          )}
        </Col>
        {windowWidth < 992 && (
          <Col xs={24} className="admin-main-panel-search-under-lg">
            <div className="header-data">
              <Input placeholder="Search" className="admin-main-panel-search-bar" prefix={<SearchOutlined style={{ marginRight: "10px" }} />} size="large" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
              {/* <CreateSignUpLinkBtn /> */}
            </div>
          </Col>
        )}
      </Row>

      <Row>
        <Col xs={24} className="admin-main-panel-table">
          {filteredUsersList?.length > 0 && (
            <AdminMainTable UsersList={filteredUsersList} onSaveUserData={handleSaveUserData} onDeleteUserData={handleDeleteUser}/>
          )}
        </Col>
      </Row>

      <Drawer headerStyle={{ display: "none" }} placement="left" onClose={closeDrawer} visible={isDrawerVisible} width={300} bodyStyle={{ padding: 0 }} >
        <AdminLeftPanel />
      </Drawer>
    </div>
  );
};

export default AdminMainPanel;

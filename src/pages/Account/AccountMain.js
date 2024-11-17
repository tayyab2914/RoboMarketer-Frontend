import React, { useEffect, useState } from "react";
import "./styles/Account.css";
import Signin from "./Signin";
import Signup from "./Signup";
import { Col, message, notification, Row } from "antd";
import { useSelector,useDispatch} from 'react-redux';
import { useNavigate,useLocation, useParams } from "react-router";

const Account = () => {
  const [currentMode, setCurrentMode] = useState("signup");
  const { token, isLoggedIn,isAdmin } = useSelector((state) => state.authToken);
//   const { token, isLoggedIn } = useSelector((state) => state.authToken);
const {link_token}=useParams()

  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if(!link_token) setCurrentMode("signin")
    else if(isAdmin) navigate('/admin')
  });
  
  const toggleCurrentMode = (mode) => {
    setCurrentMode(mode);
  };

  return (
    <div className="generic-container">
      {/* <NavbarMain /> */}
      <Row gutter={24} align="middle" justify="center">
        <Col className="gutter-row account-main-row" span={24}>
          {currentMode === "signin" && ( <Signin toggleCurrentMode={toggleCurrentMode} /> )}
          {currentMode === "signup" && ( <Signup toggleCurrentMode={toggleCurrentMode} /> )}
        </Col>
      </Row>
      {/* <Footer/> */}
    </div>
  );
};

export default Account;

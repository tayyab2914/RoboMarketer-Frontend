import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import { API_DOES_LINK_EXIST, API_SEND_VERIFICATION_EMAIL, API_SIGN_UP } from "../../apis/AuthApis";
import SignUpForm from "./SignUpForm";
import AuthenticateVerification from "./AuthenticateVerification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router";
import { setLoggedIn } from "../../redux/AuthToken/Action";

const SignUp = ({ toggleCurrentMode }) => {

  const { link_token } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [ShowSignUpComponent, setShowSignUpComponent] = useState(false);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const { token, isLoggedIn } = useSelector((state) => state.authToken);


  const checkIfLinkExists = async()=>{
    console.log(link_token)
    const response = await API_DOES_LINK_EXIST(link_token,setShowSpinner)
    setShowSignUpComponent(response?.message == "Link exists" ? true:false)
}
  useEffect(()=>{
    checkIfLinkExists()
  },[])

  const handleSignUp = async (email, password, name,phoneNumber) => {
    setEmail(email);
    setPassword(password);
    setName(name);
    setPhoneNumber(phoneNumber)
    const response = await API_SIGN_UP( Email, Password, Name,PhoneNumber, link_token, dispatch, setShowSpinner);
    if (response) {
      const searchParams = new URLSearchParams(location.search);
      const next = searchParams.get("next");
      if (next) {
        navigate(next);
      } else {
        navigate("/dashboard");
      }
    }
  };



  const handleSignInToggle = () => {
    toggleCurrentMode("signin");
  };

  return (
    <div>
      {ShowSpinner && <Spin fullscreen />}
      <Row gutter={24} justify={'center'} className="account-main-row">
        <Col xs={24} md={12} className="form-container" data-aos="fade-right">
            {ShowSignUpComponent && <SignUpForm handleSignUp={handleSignUp} handleSignInToggle={handleSignInToggle} />}

        </Col>
        
      </Row>
    </div>
  );
};

export default SignUp;


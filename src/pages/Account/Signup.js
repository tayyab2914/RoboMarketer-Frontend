import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import { API_DOES_LINK_EXIST, API_SEND_VERIFICATION_EMAIL, API_SIGN_UP } from "../../apis/AuthApis";
import SignUpForm from "./SignUpForm";
import AuthenticateVerification from "./AuthenticateVerification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router";
import { setCurrentAccount, setLoggedIn } from "../../redux/AuthToken/Action";

const SignUp = ({ toggleCurrentMode }) => {

  const { link_token } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [ShowSignUpComponent, setShowSignUpComponent] = useState(false);
  const [ShowSpinner, setShowSpinner] = useState(false);

  const queryString = location.search.slice(1); // Removes the '?' at the start
  console.log(queryString);
  

  const checkIfLinkExists = async () => {
    try {
      console.log(link_token);
      const response = await API_DOES_LINK_EXIST(link_token, setShowSpinner);
      console.log("response", response);
      setShowSignUpComponent(response?.message === "Link exists");
      if (response?.message !== "Link exists") {
        navigate("/notfound");
      }
    } catch (error) {
      console.error("Error validating link:", error);
      navigate("/notfound");
    }
  };
  

useEffect(() => {
    // if (link_token) {
    //   checkIfLinkExists();
    // } 
    setShowSignUpComponent(true);
  }, [link_token]);
  

  const handleSignUp = async (email, password, name,phoneNumber) => {
    const response = await API_SIGN_UP( email, password, name,phoneNumber, link_token, dispatch, queryString,setShowSpinner);
    console.log(response)
        dispatch(setCurrentAccount({is_main_user:response?.is_main_user}))
    if (response) {
      const searchParams = new URLSearchParams(location.search);
      const next = searchParams.get("next");
      if (next) {
        navigate(next);
      } else {
        navigate("/agency");
      }
    }
  };



  const handleSignInToggle = () => {
    navigate("/account");
  };

  return (
    <div>
      {ShowSpinner && <Spin fullscreen />}
      <Row justify={'center'} className="account-main-row">
        <Col xs={24} md={12} className="form-container" data-aos="fade-right">
            {ShowSignUpComponent && <SignUpForm handleSignUp={handleSignUp} handleSignInToggle={handleSignInToggle} />}

        </Col>
        
      </Row>
    </div>
  );
};

export default SignUp;


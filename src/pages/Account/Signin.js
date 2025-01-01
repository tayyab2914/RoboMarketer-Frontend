// Signin Component
import React, { useState } from "react";
import { Row, Col } from "antd";
import SigninForm from "./SigninForm";
import ForgotPassword from "./ForgotPassword";
import { API_SIGN_IN } from "../../apis/AuthApis";
import { useDispatch } from 'react-redux';
import { useNavigate,useLocation } from "react-router";
import { setCurrentAccount } from "../../redux/AuthToken/Action";
// import { IMAGES } from "../../data/ImageData";

const Signin = ({ toggleCurrentMode }) => {
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ShowForgotPassword, setShowForgotPaassword] = useState(false);
    const [ShowSpinner, setShowSpinner] = useState(false);

  
  const handleSignIn = async (email, password) => {
    const response = await API_SIGN_IN(email, password,dispatch,navigate,setShowSpinner);
    console.log(response)
    dispatch(setCurrentAccount({is_main_user:response?.is_main_user}))
    if(response){
        console.log(response?.agency)
        if(response.admin)
        {
            navigate('/admin')
        }
        else  if(response?.agency)
        {
            console.log("NAVIGATING TO AGENCY")
            navigate('/agency')

        }
        else
        {
            const searchParams = new URLSearchParams(location.search);
            const next = searchParams.get('next'); 
            if (next)
            {
                navigate(next)
            }
                else {
                navigate('/');
            }
        }
    }
  };

  return (
    <div data-aos="fade-up">
      <Row gutter={24} justify={"center"} align={"center"} className="account-main-row">
        <Col xs={24} lg={12} className="form-container" data-aos="fade-right">
          {/* {!ShowForgotPassword ? ( */}
            <SigninForm
              handleSignIn={handleSignIn}
            //   handleForgotPassword={() => setShowForgotPassword("true")}
              handleSignUpToggle={() => toggleCurrentMode("signup")}
            />
          {/* ) : (
            <ForgotPassword setShowForgotPassword={setShowForgotPassword}/>
          )} */}
        </Col>
      </Row>
    </div>
  );
};

export default Signin;

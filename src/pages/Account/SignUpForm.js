import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined,UserOutlined,PhoneOutlined } from '@ant-design/icons';
import { EMAIL_RULES_REQUIRED, NAME_RULES_REQUIRED, PASSWORD_RULES_REQUIRED, VALIDATE_CONFIRM_PASSWORD } from "../../utils/Rules";

import './styles/signin.css'
import GoogleLoginBtn from "./GoogleLoginBtn";
import MyButton from "../../components/Button/Button";
import { IMAGES } from "../../data/ImageData";
import { PHONE_NUMBER_RULES_REQUIRED } from "../../utils/Rules";
import MyIcon from "../../components/Icon/MyIcon";
const SignUpForm = ({ handleSignUp, handleSignInToggle }) => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
      const values = await form.validateFields();
      const { email, password,name,phoneNumber } = values;
      handleSignUp(email, password,name,phoneNumber); 
  };

  return (
    <Form form={form} name="signupForm" className="signin-form" layout="vertical" >
      <img src={IMAGES.logo} alt="" className="account-logo"/>

      <Form.Item hasFeedback label="Full Name" name="name" rules={NAME_RULES_REQUIRED} className="signin-form-item" required={false}>
        <Input placeholder="Enter your name" className="signin-input-field"  prefix={<MyIcon type={'signin_user'}/>}/>
      </Form.Item>

      <Form.Item hasFeedback label="Email Address" name="email" rules={EMAIL_RULES_REQUIRED} className="signin-form-item" required={false}>
        <Input placeholder="Enter your email" className="signin-input-field"  prefix={<MyIcon type={'signin_email'}/>} />
      </Form.Item>

      <Form.Item hasFeedback label="Phone Number" name="phoneNumber" rules={PHONE_NUMBER_RULES_REQUIRED} className="signin-form-item" required={false}>
        <Input placeholder="Enter your phone number" className="signin-input-field"  prefix={<MyIcon type={'signin_phone'}/>} />
      </Form.Item>
      <Form.Item hasFeedback label="Password" name="password" rules={PASSWORD_RULES_REQUIRED} className="signin-form-item" required={false}>
        <Input.Password placeholder="Enter your password" className="signin-input-field" prefix={<MyIcon type={'signin_password'}/>}/>
      </Form.Item>
    
      <Form.Item> 
      <MyButton variant="filled" text={'Sign Up'} onClick={onSubmit} w="100%" h="50px" m="0px" className={'signin-submit-btn'}/>
      </Form.Item>

      <Divider>or</Divider>
      <div className="google-btn"><GoogleLoginBtn/></div>

      <p className="toggle-bar">
        <span className="dont-have-account">Already have an account?</span>
        <span className="signup-toggle" onClick={handleSignInToggle}> Sign in</span>
      </p>
    </Form>
  );
};

export default SignUpForm;

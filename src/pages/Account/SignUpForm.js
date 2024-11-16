import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined,UserOutlined,PhoneOutlined } from '@ant-design/icons';
import { EMAIL_RULES_REQUIRED, NAME_RULES_REQUIRED, PASSWORD_RULES_REQUIRED, VALIDATE_CONFIRM_PASSWORD } from "../../utils/Rules";

import './styles/signin.css'
import GoogleLoginBtn from "./GoogleLoginBtn";
import MyButton from "../../components/Button/Button";
import { IMAGES } from "../../data/ImageData";
import { PHONE_NUMBER_RULES_REQUIRED } from "../../utils/Rules";
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

      <Form.Item hasFeedback label="Full Name" name="name" rules={NAME_RULES_REQUIRED} className="form-item">
        <Input placeholder="Enter your name" className="input-field" prefix={<UserOutlined />} />
      </Form.Item>

      <Form.Item hasFeedback label="Email Address" name="email" rules={EMAIL_RULES_REQUIRED} className="form-item">
        <Input placeholder="Enter your email" className="input-field" prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item hasFeedback label="Phone Number" name="phoneNumber" rules={PHONE_NUMBER_RULES_REQUIRED} className="form-item">
        <Input placeholder="Enter your phone number" className="input-field" prefix={<PhoneOutlined />} />
      </Form.Item>
      <Form.Item hasFeedback label="Password" name="password" rules={PASSWORD_RULES_REQUIRED} className="form-item">
        <Input.Password placeholder="Enter your password" className="input-field" prefix={<LockOutlined />} />
      </Form.Item>
    
      <Form.Item> 
      <MyButton variant="filled" text={'SIGN UP'} onClick={onSubmit} w="100%" h="40px" m="0px"/>
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

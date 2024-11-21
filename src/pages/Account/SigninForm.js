// SignInForm Component
import React from "react";
import { Form, Input, Button, Divider } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { EMAIL_RULES_REQUIRED, PASSWORD_RULES_REQUIRED } from "../../utils/Rules";
import './styles/signin.css'
import GoogleLoginBtn from "./GoogleLoginBtn";
import MyButton from "../../components/Button/Button";
import { IMAGES } from "../../data/ImageData";
import MyIcon from "../../components/Icon/MyIcon";

const SigninForm = ({ handleSignIn, handleForgotPassword, handleSignUpToggle }) => {
  const [form] = Form.useForm();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      handleSignIn(values.email, values.password);
    } catch (errorInfo) {
      console.error('Failed to sign in:', errorInfo);
    }
  };

  return (
    <Form form={form} name="signinForm" className="signin-form" layout="vertical" >
    <img src={IMAGES.logo} alt="" className="account-logo"/>


      <Form.Item hasFeedback label="Email Address" name="email" rules={EMAIL_RULES_REQUIRED} className="signin-form-item" required={false}>
        <Input placeholder="Enter your email" className="signin-input-field" prefix={<MyIcon type={'signin_email'}/>} />
      </Form.Item>

      <Form.Item hasFeedback label="Password" name="password" rules={PASSWORD_RULES_REQUIRED} className="signin-form-item " required={false}> 
        <Input.Password placeholder="Enter your password" className="signin-input-field "  prefix={<MyIcon type={'signin_password'}/>}  />
      </Form.Item>


      <Form.Item className="password-helper">
        <Button type="link" className="forgot-password-btn" 
        // onClick={handleForgotPassword} 
        >
          Forgot Password?
        </Button>
      </Form.Item>
      <Form.Item>
        
      <MyButton variant="filled" text={'Login'}  onClick={onSubmit} w="100%" h="50px" m="0px" className={'signin-submit-btn'}/>
      </Form.Item>

      {/* <Divider>or</Divider>
      <div className="google-btn"><GoogleLoginBtn/></div>
      
      <p className="toggle-bar">
        <span className="dont-have-account">Don't have an account?</span>
        <span className="signup-toggle" onClick={handleSignUpToggle}> Sign up</span>
      </p> */}
    </Form>
  );
};

export default SigninForm;

// ForgotPassword Component
import React from "react";
import { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { EMAIL_RULES_REQUIRED } from "../../utils/Rules";
import { API_SEND_VERIFICATION_EMAIL, API_SET_NEW_PASSWORD } from "../../apis/AuthApis";
import AuthenticateVerification from "./AuthenticateVerification";
import GetNewPassword from "./GetNewPassword";
import MyButton from "../../components/Button/Button";

const ForgotPassword = ({setShowForgotPassword}) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [CurrentState, setCurrentState] = useState("email-input");
  const [codeToken, setCodeToken] = useState("");
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [NewPassword, setNewPassword] = useState();

  const onSubmitEmail = async () => {
      const values = await form.validateFields();
      setEmail(values.email);
      const response = await API_SEND_VERIFICATION_EMAIL( values.email, true, setShowSpinner );
      setCodeToken(response);
      setCurrentState(response?'verification-code':'email-input');
    
  };

  const handleVerification = async (code) => {
    setVerificationCode(code);
    setCurrentState("new-password");
  };
  const onNewPasswordSubmit = async (newPassword) => {
    setNewPassword(newPassword);
    console.log('newPassword',newPassword)
    await API_SET_NEW_PASSWORD( email, newPassword, verificationCode, codeToken, setShowSpinner,setShowForgotPassword );
    
  };
  return <>
  {ShowSpinner && <Spin fullscreen/>}
  {
    CurrentState == 'email-input' && <Form form={form} name="forgotPasswordForm" className="signin-form" layout="vertical" >
      <h2 className="form-title">Reset your password</h2>

      <Form.Item hasFeedback label="Email" name="email" rules={EMAIL_RULES_REQUIRED} className="form-item">
        <Input placeholder="Enter your email" className="input-field" prefix={<MailOutlined />} />
      </Form.Item>

      <Form.Item>
      <MyButton variant="filled" text={'Send Code'}  onClick={onSubmitEmail} w="100%" h="40px" m="0px"/>
        
      </Form.Item>
    </Form>
}
  {CurrentState == 'verification-code' && 
    <AuthenticateVerification handleVerification={handleVerification} />}
  {CurrentState == 'new-password' &&
    <GetNewPassword onNewPasswordSubmit={onNewPasswordSubmit}/>
  }
</>;
};

export default ForgotPassword;

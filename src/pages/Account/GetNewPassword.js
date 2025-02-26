// GetNewPassword Component
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col } from "antd";
import { LockOutlined } from '@ant-design/icons';
import './styles/Account.css';
import {  PASSWORD_RULES_REQUIRED, VALIDATE_CONFIRM_PASSWORD } from "../../utils/Rules";
import { API_SET_NEW_PASSWORD } from '../../apis/AuthApis';
import { useNavigate } from 'react-router-dom';

const GetNewPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [VerificationCode, setVerificationCode] = useState();
  const [newPassword, setNewPassword] = useState('');

  const onSubmitNewPassword = async () => {
    try {
        const values = await form.validateFields();
      await API_SET_NEW_PASSWORD(values.password,VerificationCode,navigate);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  useEffect(()=>{
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if(code)
    {
        setVerificationCode(code)
    }

  },[])

  return (
    <div>
      <Row gutter={24} justify={"center"} align={"center"} className="account-main-row" style={{height:"100vh",margin:"0px"}}>
        <Col xs={24} lg={12} className="form-container" data-aos="fade-right">
    <Form form={form} name="newPasswordForm" layout="vertical" autoComplete="off" className="signin-form">
      <h2 className="form-title">Set a New Password</h2>

      <Form.Item hasFeedback label="Password" name="password" rules={PASSWORD_RULES_REQUIRED} className="form-item">
        <Input.Password placeholder="Enter your password" className="input-field" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item label="Confirm Password" name="confirmPassword" dependencies={['password']} hasFeedback rules={VALIDATE_CONFIRM_PASSWORD} className="form-item">
        <Input.Password placeholder="Confirm your password" className="input-field" prefix={<LockOutlined />} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="button" onClick={onSubmitNewPassword} className="submit-btn">
          Change Password
        </Button>
      </Form.Item>
    </Form>
        </Col>
      </Row>
    </div>
  );
};

export default GetNewPassword;

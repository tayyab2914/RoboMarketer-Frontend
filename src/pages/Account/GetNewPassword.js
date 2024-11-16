// GetNewPassword Component
import React, { useState } from 'react';
import { Form, Input, Button } from "antd";
import { LockOutlined } from '@ant-design/icons';
import './styles/Account.css';
import {  PASSWORD_RULES_REQUIRED, VALIDATE_CONFIRM_PASSWORD } from "../../utils/Rules";

const GetNewPassword = ({ onNewPasswordSubmit }) => {
  const [form] = Form.useForm();
  const [newPassword, setNewPassword] = useState('');

  const onSubmitNewPassword = async () => {
    try {
        const values = await form.validateFields();
      onNewPasswordSubmit(values.password);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
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
  );
};

export default GetNewPassword;

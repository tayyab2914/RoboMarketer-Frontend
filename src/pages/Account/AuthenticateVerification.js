import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import './styles/Account.css'
import MyButton from "../../components/Button/Button";

const AuthenticateVerification = ({ handleVerification }) => {
  const [code, setCode] = useState('');

  const onSubmit = () => {
    handleVerification(code); // Pass the code back to the parent
  };

  return (
    <Form name="verificationForm" layout="vertical" autoComplete="off" className="signin-form" >
      <h2 className="form-title">Enter Verification Code</h2>

      <Form.Item hasFeedback label="Verification Code" className="form-item">
        <Input
          placeholder="Enter the code sent to your email"
          value={code}
          className="input-field"
          onChange={(e) => setCode(e.target.value)} // Update the code state
        />
      </Form.Item>

      <Form.Item>
      <MyButton variant="filled" text={'Send Code'}  onClick={onSubmit} w="100%" h="40px" m="0px"/>
        
      </Form.Item>
    </Form>
  );
};

export default AuthenticateVerification;

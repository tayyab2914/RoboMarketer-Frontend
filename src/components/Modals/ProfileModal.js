import React, { useState } from "react";
import { Modal, Input, Button, Form, message } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";

const EMAIL_RULES_REQUIRED = [
  { required: true, message: "Please input your email!" },
  { type: "email", message: "The input is not a valid E-mail!" },
];
const PASSWORD_RULES_REQUIRED = [
  { required: true, message: "Please input your password!" },
  { min: 8, message: "Password must be at least 8 characters long!" },
];

const ProfileModal = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form] = Form.useForm(); // Get form instance

  // Function to update email
  const handleEmailUpdate = () => {
    form
      .validateFields(["email"]) // Validate email field
      .then((values) => {
        // Perform the email update logic here (e.g., API call)
        console.log(`Email updated: ${values.email}`);
        message.success("Email updated successfully!");
      })
      .catch((errorInfo) => {
        console.log("Email validation failed:", errorInfo);
      });
  };

  // Function to update password
  const handlePasswordUpdate = () => {
    form
      .validateFields(["password"]) // Validate password field
      .then((values) => {
        // Perform the password update logic here (e.g., API call)
        console.log(`Password updated: ${values.password}`);
        message.success("Password updated successfully!");
      })
      .catch((errorInfo) => {
        console.log("Password validation failed:", errorInfo);
      });
  };

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <Modal
      title={
        <span className="modal-header">
          <MyIcon type={"profile"} style={{ marginRight: "5px" }} /> Profile (User)
        </span>
      }
      visible={isVisible}
      centered
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" className="modal-content">
        {/* Email Input with Validation */}
        <Form.Item label="Email" name="email" rules={EMAIL_RULES_REQUIRED}>
          <div className="input-group">
            <span className="input-group-input">
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
            <span className="input-group-btn">
              <Button
                type="primary"
                className="input-btn"
                onClick={handleEmailUpdate} // Handle email update
              >
                Update
              </Button>
            </span>
          </div>
        </Form.Item>

        {/* Password Input with Validation */}
        <Form.Item label="Password" name="password" rules={PASSWORD_RULES_REQUIRED}>
          <div className="input-group">
            <span className="input-group-input">
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <span className="input-group-btn">
              <Button
                type="primary"
                className="input-btn"
                onClick={handlePasswordUpdate} // Handle password update
              >
                Update
              </Button>
            </span>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileModal;

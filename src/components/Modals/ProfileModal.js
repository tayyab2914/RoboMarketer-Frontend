import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message, Spin } from "antd";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import {
  API_GET_USER_ATTRIBUTES,
  API_UPDATE_PROFILE,
} from "../../apis/AuthApis";
import { useSelector } from "react-redux";
import {
  EMAIL_RULES_REQUIRED,
  PASSWORD_RULES_REQUIRED,
} from "../../utils/Rules";

const ProfileModal = ({ isVisible, onClose }) => {
  const { isLoggedIn, token } = useSelector((state) => state.authToken);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form] = Form.useForm();

  const handleEmailUpdate = async () => {
    try {
      const values = await form.validateFields(["email"]);
      const email = values.email;

      await API_UPDATE_PROFILE(token, email, null, setShowSpinner);
      message.success("Email updated successfully!");
      onClose();
    } catch (errorInfo) {
      console.log("Email validation failed:", errorInfo);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const values = await form.validateFields(["password"]);
      const password = values.password;

      await API_UPDATE_PROFILE(token, null, password, setShowSpinner);
      message.success("Password updated successfully!");
      onClose();
    } catch (errorInfo) {
      console.log("Password validation failed:", errorInfo);
    }
  };

  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  const getUserEmail = async () => {
    const response = await API_GET_USER_ATTRIBUTES(token, setShowSpinner);
    setEmail(response.email);
  };

  useEffect(() => {
    getUserEmail();
  }, []);
  return (
    <>
      <Modal
        title={ false }
        centered
        visible={isVisible}
        onCancel={onClose}
        closable={false}
        footer={null}
      >
                    <div className="custom-modal-header">
    <span className="modal-header"> <MyIcon type="profile" style={{ marginRight: "5px" }} size="md"/> Profile
    (User) </span>
    <span ><MyIcon type={'close_icon'} onClick={onClose} size="lg" className="close-icon"/></span>
    </div>
            
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="modal-content"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={EMAIL_RULES_REQUIRED}
            required={false}
            className="form-item"
          >
            <div className="input-group">
              <span className="input-group-input">
                {" "}
                <Input
                  placeholder="Email"
                  className="inline-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={false}
                />{" "}
              </span>
              <span className="input-group-btn">
                {" "}
                <Button
                  type="primary"
                  className="inline-input-btn"
                  onClick={handleEmailUpdate}a
                >
                  {" "}
                  Update{" "}
                </Button>{" "}
              </span>
            </div>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={PASSWORD_RULES_REQUIRED}
            required={false}
            className="form-item"
            style={{margin:"20px 0px"}}
          >
            <div className="input-group">
              <span className="input-group-input">
                {" "}
                <Input.Password
                  className="inline-input"
                  placeholder="Password"
                  value={password}
                  height={60}
                  onChange={(e) => setPassword(e.target.value)}
                />{" "}
              </span>
              <span className="input-group-btn">
                {" "}
                <Button
                  type="primary"
                  className="inline-input-btn"
                  onClick={handlePasswordUpdate}
                >
                  {" "}
                  Update{" "}
                </Button>
              </span>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProfileModal;

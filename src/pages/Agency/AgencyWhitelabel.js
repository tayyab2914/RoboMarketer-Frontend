import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message, Spin, Row, Col } from "antd";
import "../../components/Modals/styles/ModalStyles.css";
import MyIcon from "../../components/Icon/MyIcon";
import {
  API_GET_USER_ATTRIBUTES,
  API_UPDATE_PROFILE,
} from "../../apis/AuthApis";
import { useSelector } from "react-redux";
import {
  EMAIL_RULES_REQUIRED,
  PASSWORD_RULES_REQUIRED,
} from "../../utils/Rules";
import useWindowWidth from "../../hooks/useWindowWidth";

const AgencyWhitelabel = ({ isVisible, onClose }) => {
    const windowWidth = useWindowWidth()
  const { isLoggedIn, token } = useSelector((state) => state.authToken);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [email, setEmail] = useState("");


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
 <>
        <Row>
            <Col xs={24}>
                <div style={{height:windowWidth<1200 ? "40.8px":'0px'}}></div>
                <Row className="awa-heading-main">
                <Col xs={24} md={5}> <span className="awa-heading"> <MyIcon type={"profile"} /> Whitelabel Domain </span> </Col>
                <Col xs={24} md={18} style={{textAlign:"end"}}>
                    <span>
                        {/* <button className="awa-heading-btns"> Profile <span className="awa-heading-btn-count">{}</span> </button> */}
                        {/* <button className="awa-heading-btns" onClick={()=>setModalVisible(true)}> <MyIcon type={'plus_black'} /> Create New </button> */}
                    </span>
                </Col>
                
                </Row>
            </Col>

            <Col xs={24} sm={12} xl={9} className="">

            <Form form={form} onFinish={onFinish} layout="vertical" className="modal-content" >
          <Form.Item label="Email" name="email" rules={EMAIL_RULES_REQUIRED} required={false} className="form-item" >
            <div className="input-group">
              <span className="input-group-input">
                <Input placeholder="Email" className="inline-input-agency" value={email} onChange={(e) => setEmail(e.target.value)} required={false} />
              </span>
              <span className="input-group-btn">
                <Button type="primary" className="inline-input-agency-btn" onClick={handleEmailUpdate}a >
                 Update </Button>
              </span>
            </div>
          </Form.Item>

        </Form>
            </Col>

        </Row>
    </>
            
       
    </>
  );
};

export default AgencyWhitelabel;

import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message, Spin, Row, Col } from "antd";
import "../../components/Modals/styles/ModalStyles.css";
import MyIcon from "../../components/Icon/MyIcon";
import { API_GET_WHITELABEL_DOMAIN, API_UPDATE_WHITELABEL_DOMAIN } from "../../apis/AgencyApis";
import { useSelector } from "react-redux";
import {
  WHITELABEL_DOMAIN_RULES_REQUIRED,
} from "../../utils/Rules";
import useWindowWidth from "../../hooks/useWindowWidth";

const AgencyWhitelabel = ({ isVisible, onClose }) => {
    const windowWidth = useWindowWidth()
  const { isLoggedIn, token } = useSelector((state) => state.authToken);
  const [ShowSpinner, setShowSpinner] = useState(false);
  const [whitelabel_domain, setWhitelabelDomain] = useState("");


  const [form] = Form.useForm();

  const handleWhitelabelDomainUpdate = async () => {
    try {
      const values = await form.validateFields(["whitelabel_domain"]);
      const whitelabel_domain = values.whitelabel_domain;

      const response = await API_UPDATE_WHITELABEL_DOMAIN(token, whitelabel_domain, setShowSpinner);
    } catch (errorInfo) {
        console.log("Whitelabel domain validation failed or API error occurred:", errorInfo);
    }
  };



  const onFinish = (values) => {
    console.log("Form submitted:", values);
  };

  const getUserEmail = async () => {
    const response = await API_GET_WHITELABEL_DOMAIN(token, setShowSpinner);
    setWhitelabelDomain(response.whitelabel_domain);
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
          <Form.Item label="Whitelabel Domain" name="whitelabel_domain" rules={WHITELABEL_DOMAIN_RULES_REQUIRED} required={false} className="form-item" >
            <div className="input-group">
              <span className="input-group-input">
                <Input placeholder="app.yourdomain.com" className="inline-input-agency" value={whitelabel_domain} onChange={(e) => setWhitelabelDomain(e.target.value)} required={false} />
              </span>
              <span className="input-group-btn">
                <Button type="primary" className="inline-input-agency-btn" onClick={handleWhitelabelDomainUpdate}a >
                 Add domain </Button>
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

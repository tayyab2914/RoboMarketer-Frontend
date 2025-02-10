import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message, Row, Col } from "antd";
import "../../components/Modals/styles/ModalStyles.css";
import MyIcon from "../../components/Icon/MyIcon";
import { API_GET_WHITELABEL_DOMAIN, API_UPDATE_WHITELABEL_DOMAIN, API_TEST_RECORDS } from "../../apis/AgencyApis";
import { useSelector } from "react-redux";
import { WHITELABEL_DOMAIN_RULES_REQUIRED } from "../../utils/Rules";
import useWindowWidth from "../../hooks/useWindowWidth";
import "./styles/AgencyWhitelabel.css";
import { Copy, PlaySquare, X } from "lucide-react";

const AgencyWhitelabel = ({ isVisible, onClose }) => {
  const windowWidth = useWindowWidth();
  const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [whitelabelDomain, setWhitelabelDomain] = useState("");
  const [form] = Form.useForm();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleWhitelabelDomainUpdate = async () => {
    try {
      const values = await form.validateFields(["whitelabel_domain"]);
      const whitelabel_domain = values.whitelabel_domain;

      const response = await API_UPDATE_WHITELABEL_DOMAIN(token, whitelabel_domain, setShowSpinner);
      setIsPopupVisible(true);
    } catch (errorInfo) {
      console.log("Whitelabel domain validation failed or API error occurred:", errorInfo);
    }
  };

  const handleTestRecords = async () => {
    try {
      const response = await API_TEST_RECORDS(token, whitelabelDomain);
      if (response.success) {
        message.success("Records verified successfully!");
      }
    } catch (error) {
      console.error("Test records error:", error);
    }
  };

  const getWhitelabelDomain = async () => {
    const response = await API_GET_WHITELABEL_DOMAIN(token, setShowSpinner);
    setWhitelabelDomain(response.whitelabel_domain);
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success("Copied!");
      })
      .catch(() => {
        message.error("Failed to copy text.");
      });
  };

  useEffect(() => {
    getWhitelabelDomain();
  }, []);

  const handleAddConfiguration = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <Row>
        <Col xs={24}>
          <Row className="awa-heading-main">
            <Col xs={24} md={5}>
              <span className="awa-heading">
                <MyIcon type={"whitelabel"} /> Whitelabel Domain
              </span>
            </Col>
      
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={12} xl={9}>
          <Form form={form} layout="vertical" className="modal-content">
            <Form.Item
              label="Whitelabel Domain"
              name="whitelabel_domain"
              rules={WHITELABEL_DOMAIN_RULES_REQUIRED}
              className="form-item"
            >
              <div className="input-group">
                <span className="input-group-input">
                  <Input
                    placeholder="app.yourdomain.com"
                    className="inline-input-agency"
                    value={whitelabelDomain}
                    onChange={(e) => setWhitelabelDomain(e.target.value)}
                  />
                </span>
                <span className="input-group-btn">
                  <Button
                    type="primary"
                    className="inline-input-agency-btn"
                    onClick={handleWhitelabelDomainUpdate}
                  >
                    Add domain
                  </Button>
                </span>
              </div>
            </Form.Item>
          </Form>

        </Col>
        
       
      </Row>
      
      <Button
        type="primary"
        style={{
          padding: "10px 16px", // Adjust padding to match the input field
          height: "auto", // Ensure the height adjusts dynamically
          lineHeight: "normal", // Reset line height for proper text alignment
          marginLeft: "25px", 
        }}
        onClick={handleAddConfiguration}
      >
        Show Records
      </Button>
      

      {isPopupVisible && (
        <div className="overlay">
          <div className="dialog">
            <div className="header">
              <h2 className="title">Set up your domain manually by adding the following records</h2>
              <button className="close-button" onClick={handleClosePopup}>
                <X size={20} />
              </button>
            </div>
            <div className="content">
              <div className="table-header">
                <div>Record</div>
                <div>Host</div>
                <div>Required value</div>
              </div>
              <div className="table-row">
                <div className="record">CNAME</div>
                <div className="copy-wrapper">
                  <span>{whitelabelDomain.split(".")[0]}</span>
                  <button
                    className="copy-button"
                    onClick={() => handleCopy(whitelabelDomain.split(".")[0])}
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div className="copy-wrapper">
                  <span>cname.vercel-dns.com</span>
                  <button className="copy-button" onClick={() => handleCopy("cname.vercel-dns.com")}>
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="footer">
              <button className="help-button">
                <PlaySquare size={20} />
                Watch the help video
              </button>
              <div className="action-buttons">
                <button className="back-button" onClick={handleClosePopup}>
                  Back
                </button>
                <button className="verify-button" onClick={handleTestRecords}>
                  Verify records
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgencyWhitelabel;

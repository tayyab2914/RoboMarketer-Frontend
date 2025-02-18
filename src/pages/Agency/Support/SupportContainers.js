import { Col, Row } from "antd";
import React from "react";
import MyIcon from "../../../components/Icon/MyIcon";

const SupportContainers = ({ title, icon, description }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:info@robomarketer.bot?subject=${encodeURIComponent(title)}`;
  };

  return (
    <Row>
      <Col id="support-container" xs={24}>
        <p className="title">
          <MyIcon type={icon} />
          {title}
        </p>
        <div className="inner-container">
          <p className="description">{description}</p>
          <button className="email-btn" onClick={handleEmailClick}>
            <MyIcon type={"support_email"} />
            Email Us Now
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default SupportContainers;

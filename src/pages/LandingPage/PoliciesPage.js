import React, { useEffect } from "react";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "antd";
import InfoContainer from "../Agency/Support/InfoContainer";
import './LandingPageStyles.css'
const PoliciesPage = ({ CurrentMode }) => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);
  return (
    <div>
      <header class="header_main">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="header">
                <div class="logo">
                  <a href="/">
                    <img src={logo} alt="" />
                  </a>
                  <div id="nav-icon4" class="menu_icon">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div class="menu">
                  <ul>
                    <li>
                      <a href="#">Features</a>
                    </li>
                    <li>
                      <a href="#">Reviews</a>
                    </li>
                    <li>
                      <a href="#">Pricing</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                  </ul>
                  <div class="header_btns header_btns_menu">
                    <p class="btn_style">Login</p>
                    <p
                      class="btn_style btn_style2"
                      onClick={() => navigate("/account")}
                    >
                      Get Started
                    </p>
                  </div>
                </div>
                <div class="header_btns">
                  <p class="btn_style" onClick={() => navigate("/account")}>
                    Login
                  </p>
                  <p
                    class="btn_style btn_style2"
                    onClick={() => navigate("/account")}
                  >
                    Get Started
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Row>
        <Col xs={24}>
          <InfoContainer CurrentMode={CurrentMode} />
        </Col>
      </Row>
    </div>
  );
};

export default PoliciesPage;

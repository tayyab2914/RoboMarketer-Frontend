import { Col, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyIcon from "../../../components/Icon/MyIcon";
import "./styles/Banners.css";
import {
  setFacebookState,
  setisIntegrationsModalClosedByUser,
} from "../../../redux/AuthToken/Action";
import { API_GENERATE_AUTH_URL } from "../../../apis/FacebookInsightsApis";
import AIModelAPIModal from "../../../components/Modals/AIModelAPIModal";

const Banners = () => {
  const dispatch = useDispatch();
  const { token, current_account } = useSelector((state) => state.authToken);
  const [isIntegrateModalVisible, setisIntegrateModalVisible] = useState(false);
  const connectFbHandler = async () => {
    dispatch(setisIntegrationsModalClosedByUser(false));

    const response = await API_GENERATE_AUTH_URL(token);
    if (response) {
      dispatch(setFacebookState(response?.state));
      window.location.href = response?.authorization_url;
    }
  };
  const integrateAPIhandler = async () => {
    setisIntegrateModalVisible(false);
    setisIntegrateModalVisible(true);
  };

  return (
    <div id="banners">
      {!current_account?.is_facebook_connected && <Row>
        <Col xs={24} className="banner-inner">
          <p className="text"> <MyIcon type={"facebook"} size="md" /> Connect Your Facebook Ad Account With One Click </p>
          <button className="facebook_btn" onClick={connectFbHandler}> Connect Facebook </button>
        </Col>
      </Row>}
      {!current_account?.is_openapi_setup && <Row>
        <Col xs={24} className="banner-inner">
          <p className="text"> <MyIcon type={"banner_ai_model"} size="sm" /> Input Any AI Model API To Get Started With RoboMarketer </p>
          <button className="integrate_btn" onClick={integrateAPIhandler}> Integrate API </button>
        </Col>
      </Row>}
      <AIModelAPIModal
        isVisible={isIntegrateModalVisible}
        onClose={() => setisIntegrateModalVisible(false)}
      />
    </div>
  );
};

export default Banners;

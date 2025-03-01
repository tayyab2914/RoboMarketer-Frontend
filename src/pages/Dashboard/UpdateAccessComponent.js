import React from "react";
import "./styles/UpdateAccessComponent.css";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd"; // Import Modal component from Ant Design
import MyIcon from "../../components/Icon/MyIcon";

const UpdateAccessComponent = ({ modal = false, visible, onClose , chatCount }) => {
  return (
    <div>
      {modal ? (
        <Modal
          className=""
          title={false}
          centered
          visible={visible}
          onCancel={onClose}
          closable={false}
          width={600}
          footer={null}
        >
            
        <div className="uac-container-modal">
            <p className="uac-title-modal">
                <span></span>
              <span><ClockCircleOutlined style={{ marginRight: "5px" }} />
              Limited Time Launch Special</span>
            <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
        
            </p>
            <div style={{ padding: "10px 50px" }}>
              <p className="uac-subtitle">
                Upgrade To Lifetime Unlimited Access RoboMarketer Account
              </p>
              <iframe 
                style={{ width: "100%", height: "280px", borderRadius: "12px" }} 
                src="https://www.youtube.com/embed/gMhKb3Qcl6c?si=9oRWvTbsDn_Fdr0A" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen
              ></iframe>

              <p className="uac-trial-message">
                Your Free Trial Has Ended Upgrade To Lifetime Access RoboMarketer For A Limited Time
              </p></div>
              <div style={{ padding: "0px 10px" }}>
              <button className="uac-upgrade-btn" onClick={() => window.open("https://robomarketer.io/lifetime", "_blank")}>

                <p className="uac-upgrade-text">Upgrade Now</p>
                <p className="uac-lifetime-text">
                  Limited Lifetime Accounts Available
                </p>
              </button>
              </div>
              
            <div style={{ padding: "0px 30px" }}>
              <p className="uac-contact-info">
                Questions? Contact Us At info@RoboMarketer.bot
              </p>
            </div></div>
        </Modal>
      ) : (
        <div className="uac-container" >
          <p className="uac-title">
            <ClockCircleOutlined style={{ marginRight: "5px" }} />
            Limited Time Launch Special
          </p>
          <div style={{ padding: "10px" }}>
            <p className="uac-subtitle">
              Upgrade To Lifetime Unlimited Access RoboMarketer Account
            </p>
            <p className="uac-trial-message">
              {Math.max(25 - chatCount, 0)} Free Messages Left Before
              <br />
              Free Trial Ends
            </p>
            {/* <button className="uac-upgrade-btn" > */}
            <button className="uac-upgrade-btn" onClick={() => window.open("https://robomarketer.io/lifetime", "_blank")}>

              <p className="uac-upgrade-text">Upgrade Now</p>
              <p className="uac-lifetime-text">
                Limited Lifetime Accounts Available
              </p>
            </button>
            <p className="uac-contact-info">
              Questions? Contact Us At info@RoboMarketer.bot
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAccessComponent;

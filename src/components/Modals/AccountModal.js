import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message, Upload, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IMAGES } from "../../data/ImageData";
import MyIcon from "../Icon/MyIcon";
import { useSelector } from "react-redux";
import { API_UPDATE_ACCOUNT } from "../../apis/AuthApis";
import MyButton from "../Button/Button";
import { DOMAIN_NAME } from "../../utils/GlobalSettings";

const { Dragger } = Upload;

const AccountModal = ({ isVisible, onClose }) => {
  const { isLoggedIn, token, current_account } = useSelector((state) => state.authToken);
  const [name, setName] = useState(current_account?.name);
  const [profilePic, setProfilePic] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  console.log(current_account)
  const props = {
    name: 'file',
    multiple: false,
    beforeUpload(file) {
      if (profilePic) {
        message.error("You can only upload one image.");
        return false;
      }
      setProfilePic(file);
      return false; // Prevent automatic upload
    },
  };

  const handleUploadClick = async () => {
    if (!profilePic || isUploading) return;

    setShowSpinner(true);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("profile_pic", profilePic);
      const response = await API_UPDATE_ACCOUNT(token, current_account?.id, null, profilePic, setShowSpinner);

    } catch (error) {
      message.error("Failed to upload profile picture.");
    } finally {
      setShowSpinner(false);
      setIsUploading(false);
      setProfilePic(null); 
      onClose();
    }
  };

  const handleNameUpdate = async () => {
    if (!name) {
      message.error("Please enter a name.");
      return;
    }
    await API_UPDATE_ACCOUNT(token, current_account?.id, name, null, setShowSpinner);

    onClose();
  };

  useEffect(() => {
    if (!isVisible) {
      setProfilePic(null);
      setName("");
    }
  }, [isVisible]);

  return (
    <>
      {showSpinner && <Spin fullscreen/>}
      <Modal title={ <span className="modal-header"> <MyIcon type={"account"} style={{ marginRight: "5px" }} /> Account (Client) </span> } centered visible={isVisible} onCancel={onClose} footer={null} >
        <div className="modal-content">
          <div className="upload-group" style={{ marginTop: "20px", textAlign: "center" }}>
          {current_account?.account_image && <img src={`${DOMAIN_NAME}${current_account?.account_image}`} alt="" className="account-modal-img"/>}
            <Dragger {...props} itemRender={() => <></>} disabled={profilePic} accept=".png, .jpg, .svg">
              <div className="ant-upload-text">
                {profilePic ? ( <p style={{ color: "#00c514", marginTop: "20px" }}> Profile Picture Selected: {profilePic.name} </p>
                ) : (
                  <> 
                  <div> <img src={IMAGES.user} alt="" /> </div> {current_account?.account_image ?"Change":"Upload"} Profile Photo </>
                )}
              </div>
            </Dragger>
            {profilePic && ( <MyButton text={'Upload Photo'} variant="filled" onClick={handleUploadClick}/> )}
          </div>

          <p className="input-group-label">Account Name</p>
          <div className="input-group">
            <span className="input-group-input">
              <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </span>
            <span className="input-group-btn">
              <Button type="primary" className="input-btn" onClick={handleNameUpdate} >  Update </Button>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountModal;

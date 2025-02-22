import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message, Upload, Spin, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IMAGES } from "../../data/ImageData";
import MyIcon from "../Icon/MyIcon";
import { useDispatch, useSelector } from "react-redux";
import { API_UPDATE_ACCOUNT } from "../../apis/AuthApis";
import MyButton from "../Button/Button";
import { DOMAIN_NAME } from "../../utils/GlobalSettings";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

// Import your validation rules
export const NAME_RULES_REQUIRED = [
  { required: true, message: "Please input your name!" },
];

const { Dragger } = Upload;

const AccountModal = ({ isVisible, onClose }) => {
  const [showSpinner, setShowSpinner] = useState(false);
  const { isLoggedIn, token, current_account,rerender_dashboard } = useSelector(
    (state) => state.authToken
  );
  const dispatch = useDispatch()
  const [profilePic, setProfilePic] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [name, setName] = useState(current_account?.name);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false); // Track if the user is editing the photo

  const props = {
    name: "file",
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
useEffect(()=>{
    handleUploadClick()
},[profilePic])
  const handleUploadClick = async () => {
    if (!profilePic || isUploading) return;

    setShowSpinner(true);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("profile_pic", profilePic);
      const response = await API_UPDATE_ACCOUNT(
        token,
        current_account?.id,
        null,
        profilePic,
        setShowSpinner
      );
      dispatch(setRerenderDashboard(!rerender_dashboard))
      console.log(profilePic);
    } catch (error) {
      message.error("Failed to upload profile picture.");
    } finally {
      setShowSpinner(false);
      setIsUploading(false);
      setProfilePic(null);
      setIsEditingPhoto(false); // Reset editing state after upload
      onClose();
    }
  };

  const handleNameUpdate = async () => {
    if (!name) {
      message.error("Please enter a name.");
      return;
    }
    await API_UPDATE_ACCOUNT(
      token,
      current_account?.id,
      name,
      null,
      setShowSpinner
    );
    dispatch(setRerenderDashboard(!rerender_dashboard))

    onClose();
  };

  useEffect(() => {
    if (!isVisible) {
      setProfilePic(null);
      setIsEditingPhoto(false); // Reset editing state when modal is closed
    }
  }, [isVisible]);

  return (
    <>
      <Modal
        className=""
        title={false}
        centereda
        visible={isVisible}
        onCancel={onClose}
        closable={false}
        footer={null}
      >
        <div className="custom-modal-header">
          <span className="modal-header">
            <MyIcon type="account" style={{ marginRight: "5px" }} size="md" /> 
            Account Settings
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" />
          </span>
        </div>

        <div className="modal-content">
          <div style={{ marginTop: "20px", textAlign: "center" }} >
            {isEditingPhoto || !current_account?.account_image ? (
              <Dragger {...props} itemRender={() => <></>} disabled={profilePic} accept=".png, .jpg, .svg" className="account-modal-dragger" >
                <div className="ant-upload-text">
                  {profilePic ? (
                    <p style={{ color: "#00c514", marginTop: "20px" }}> Profile Picture Selected: {profilePic.name} </p>
                  ) : (
                    <> <div> <img src={IMAGES.user} alt="" /> </div>
                      {current_account?.account_image ? "Change" : "Upload"} Photo </>
                  )}
                </div>
              </Dragger>
            ) : (
                <>
                <div style={{textAlign:"center"}}> 
                    <img src={`${DOMAIN_NAME}${current_account?.account_image}`} alt="" style={{height:"auto",maxWidth:"300px",maxHeight:"200px"}}/>
                </div>
              <MyButton text={"Edit Profile Photo"} variant="filled" onClick={() => setIsEditingPhoto(true)} className={"form-item"} />
              </>
            )}
          </div>
          <p className="input-group-label">Account Name</p>
          <div className="input-group form-item">
            <span className="input-group-input">
              <Form initialValues={{ account_name: current_account?.name }}>
                <Form.Item name="account_name" rules={NAME_RULES_REQUIRED} style={{ marginBottom: 0 }} >
                  <Input placeholder="Type account name" value={current_account?.name} onChange={(e) => setName(e.target.value)} className="inline-input" />
                </Form.Item>
              </Form>
            </span>
            <span className="input-group-btn">
              <Button type="primary" className="inline-input-btn" onClick={handleNameUpdate} > Update </Button>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountModal;

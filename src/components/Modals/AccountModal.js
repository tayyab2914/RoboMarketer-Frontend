import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IMAGES } from "../../data/ImageData";
import MyIcon from "../Icon/MyIcon";

const { Dragger } = Upload;

const AccountModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState(""); // State for name
  const [profilePic, setProfilePic] = useState(null); // State for profile picture

  const props = {
    name: 'file',
    multiple: false, // Only allow one file to be uploaded
    onChange(info) {
      const { status, file } = info;
      if (status !== 'uploading') {
        console.log("File:", file, "File List:", info.fileList);
        setProfilePic(file);
      }
      if (status === 'done') {
        message.success(`${file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${file.name} file upload failed.`);
      }
    },
    beforeUpload(file) {
      // Ensure that only one file is uploaded
      if (profilePic) {
        message.error("You can only upload one image.");
        return false; // Reject file upload if profile picture is already set
      }
      return true;
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleNameUpdate = () => {
    if (!name) {
      message.error("Please enter a name.");
      return;
    }
    // Perform update logic (e.g., API call) for the name here
    message.success("Name updated successfully!");
  };

  useEffect(() => {
    if (!isVisible) {
      // Reset profilePic when the modal is closed
      setProfilePic(null);
      setName("");
    }
  }, [isVisible]); // When modal visibility changes, reset the state

  const uploadButton = (
    <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
  );

  return (
    <Modal
      title={
        <span className="modal-header">
          <MyIcon type={"account"} style={{ marginRight: "5px" }} />
          Account (Client)
        </span>
      }
      centered
      visible={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <div className="modal-content">
        <div className="upload-group" style={{ marginTop: "20px", textAlign: "center" }}>
          <Dragger {...props} itemRender={() => <></>}>
            
              <div className="ant-upload-text">
                
                {profilePic ? <p style={{color:"rgb(119, 255, 0)",marginTop:"20px"}}>Profile Picture Uploaded Successfully!!</p>:<><div><img src={IMAGES.user} alt="" /></div>Upload Photo</>}
              </div>
          </Dragger>
        </div>

        <p className="input-group-label">Account Name</p>
        <div className="input-group">
          <span className="input-group-input">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <span className="input-group-btn">
            <Button
              type="primary"
              className="input-btn"
              onClick={handleNameUpdate} // Handle name update
            >
              Update
            </Button>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;

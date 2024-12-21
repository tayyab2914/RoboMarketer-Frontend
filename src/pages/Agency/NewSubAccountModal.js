import { Modal, Form, Input, Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import MyIcon from "../../components/Icon/MyIcon";
import { UploadOutlined } from "@ant-design/icons";
import { COMPANY_NAME_RULES_REQUIRED, EMAIL_RULES_REQUIRED, PHONE_NUMBER_RULES_REQUIRED } from "../../utils/Rules";
import './styles/NewSubAccountModal.css'

const NewSubAccountModal = ({ isVisible, onClose, defaultValues }) => {
    const [CompanyName, setCompanyName] = useState(defaultValues?.companyName || "");
    const [Email, setEmail] = useState(defaultValues?.email || "");
    const [Phone, setPhone] = useState(defaultValues?.phone || "");
    const [Logo, setLogo] = useState(null);
    const [LogoPreview, setLogoPreview] = useState(null);
  
    useEffect(() => {
      if (defaultValues) {
        console.log("HELLO")
        setCompanyName(defaultValues.companyName || "");
        setEmail(defaultValues.email || "");
        setPhone(defaultValues.phone || "");
      }
    }, [defaultValues]); 

  const handleLogoChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setLogo(file); 
      const reader = new FileReader();
      reader.onloadend = () => {setLogoPreview(reader.result); };
      if (file) {reader.readAsDataURL(file);}
    } else {
      setLogo(null); 
      setLogoPreview(null);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("companyName", CompanyName);
    formData.append("email", Email);
    formData.append("phone", Phone);
    if (Logo) {
      formData.append("companyLogo", Logo); 
    }

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    onClose(); 
  };

  return (
    <Modal title={false} centered visible={isVisible} onCancel={onClose} closable={false} footer={null} width={600}>
      <div className="custom-modal-header">
        <span className="modal-header"> <MyIcon type="sub_accounts" style={{ marginRight: "5px" }} size="md" /> Create Sub-Account </span>
        <span> <MyIcon type={"close_icon"} onClick={onClose} size="lg" className="close-icon" /> </span>
      </div>

      <div style={{padding:"15px 15px 0px 15px"}}>
        <Form onFinish={handleSubmit} layout="vertical" className="sub-account-form" initialValues={{companyName:CompanyName,email:Email,phone:Phone}}>
          <Form.Item label="Company Name" name="companyName" rules={COMPANY_NAME_RULES_REQUIRED}>
            <Input placeholder="Company name here.." value={CompanyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Company Logo" name="companyLogo">
          <div style={{ display:"flex",flexDirection:"column-reverse" }}>
            <Upload name="logo" listType="picture" maxCount={1} beforeUpload={() => false} onChange={handleLogoChange}  showUploadList={false}  >
                <Button icon={<MyIcon type={'sa_upload'}/>}>Upload Logo</Button>
            </Upload>
            {LogoPreview && ( <img src={LogoPreview} alt="Logo Preview" style={{ maxWidth: "80px", maxHeight: "80px",marginBottom:"10px" }} />)}
          </div>
          </Form.Item>
          <Form.Item label="Email" name="email" rules={EMAIL_RULES_REQUIRED}>
            <Input placeholder="Email here.." value={Email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={PHONE_NUMBER_RULES_REQUIRED}>
            <Input placeholder="Phone number here.." value={Phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
        </Form>
      </div>

      <div className="modal-actions">
        <span className="btn-2" onClick={handleSubmit}> <Button type="primary" htmlType="submit" className="create-btn"> <MyIcon type={"sa_create"} /> Create </Button> </span>
        <span className="btn-1"> <Button onClick={onClose} className="cancel-btn"> <MyIcon type={"cross_red"} /> Cancel </Button>  </span>
      </div>
    </Modal>
  );
};

export default NewSubAccountModal;

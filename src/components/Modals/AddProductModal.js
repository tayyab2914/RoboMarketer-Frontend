import React, { useState } from "react";
import { Modal, Button, message, Form, Spin } from "antd";
import ProductForm from "../ProductForm/ProductForm";
import { API_CREATE_PRODUCT } from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";
import MyIcon from "../Icon/MyIcon";

const AddProductModal = ({
  isVisible,
  onClose,
  onAddProduct,
  ListProducts,
}) => {
  const { token, current_account } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [form] = Form.useForm();
  
  const handleAdd = async (values) => {
    const result = await API_CREATE_PRODUCT(token, values, setShowSpinner);
    if (result) {
      onAddProduct(values);
      ListProducts();
      onClose();
    } else {
      message.error("Failed to create the product. Please try again.");
    }
  };

  return (
    <Modal
    
      title={<span className="product-modal-header">
        <span>
          <MyIcon type="products" style={{ marginRight: "5px" }} />
          Add Product / Service
        </span>
      </span>}
      visible={isVisible}
      onCancel={onClose}
      centered
      footer={null}
    >
      {showSpinner && <Spin fullscreen />}
      <ProductForm form={form} onFinish={handleAdd} />
    </Modal>
  );
};

export default AddProductModal;

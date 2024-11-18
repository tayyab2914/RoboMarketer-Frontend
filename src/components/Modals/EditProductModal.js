import React, { useEffect, useState } from "react";
import { Modal, Spin, message, Form } from "antd";
import { useSelector } from "react-redux";
import EditProductForm from "../ProductForm/EditProductForm";
import { API_GET_PRODUCT, API_UPDATE_PRODUCT } from "../../apis/MarketingToolsApis";

const EditProductModal = ({ isVisible, onClose, productId,ListProducts }) => {

    const { token } = useSelector((state) => state.authToken);
    const [showSpinner, setShowSpinner] = useState(false);
    const [productData, setProductData] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [form] = Form.useForm();


    const ListProduct = async () => {
        setShowSpinner(true);
        form.resetFields(); // Reset the form before API call
        try {
          const response = await API_GET_PRODUCT(token, productId, setShowSpinner);
          setProductData(response); // Set fetched funnel data
          setShowSpinner(false); // Hide the spinner after data is fetched
        } catch (error) {
          setShowSpinner(false);
          message.error("Failed to load producy data.");
        }
      };

        // Fetch funnel data on modal visibility or funnelId change
  useEffect(() => {
    if (isVisible && productId) {
        ListProduct();
    }
  }, [isVisible, productId]);







  useEffect(() => {
    if (productData && Object.keys(productData).length > 0) {
      form.setFieldsValue(productData);
      setShowForm(true); // Show the form after setting values
    }
  }, [productData, form]);


  const handleUpdate = async (values) => {
      await API_UPDATE_PRODUCT(token, values,productId,setShowSpinner);
      ListProducts()
      onClose(); 
  };

  return (
    <Modal
    title="Edit Funnel / Website"
    visible={isVisible}
    onCancel={onClose}
    centered
    footer={null}
  >
    {showSpinner && <Spin fullscreen />}
    {showForm && (
      <EditProductForm
        form={form}
        onClose={onClose}
        onFinish={handleUpdate}
        initialValues={productData}
      />
    )}
  </Modal>
  )
}

export default EditProductModal

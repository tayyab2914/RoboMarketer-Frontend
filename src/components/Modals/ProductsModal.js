import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AddProductModal from "./AddProductModal";

const ProductsModal = ({ isVisible, onClose }) => {
    const [products, setProducts] = useState([
        { name: "Product 1", description: "Description for product 1", coreBenefits: "Benefit 1", features: "Feature 1", useCase: "Use case 1", uniqueSellingPoint: "USP 1", customerTestimonials: "Testimonial 1", pricing: "Price 1", targetAudienceDescription: "Audience 1", primaryInterests: "Interest 1", secondaryInterests: "Secondary Interest 1", paidPoints: "Paid Point 1", goals: "Goal 1", desiredBenefits: "Benefit 1", emotionalDrivers: "Driver 1", uniqueNeeds: "Need 1" },
        { name: "Product 2", description: "Description for product 2", coreBenefits: "Benefit 2", features: "Feature 2", useCase: "Use case 2", uniqueSellingPoint: "USP 2", customerTestimonials: "Testimonial 2", pricing: "Price 2", targetAudienceDescription: "Audience 2", primaryInterests: "Interest 2", secondaryInterests: "Secondary Interest 2", paidPoints: "Paid Point 2", goals: "Goal 2", desiredBenefits: "Benefit 2", emotionalDrivers: "Driver 2", uniqueNeeds: "Need 2" },
      ]);
  const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);

  const handleAddNewProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    console.log(newProduct)
  };

  const openAddProductModal = () => {
    setIsAddProductModalVisible(true);
  };

  useEffect(() => {
    if (!isVisible) {
      setIsAddProductModalVisible(false);
    }
  }, [isVisible]);


  return (
    <>
      <Modal
        title={
          <span className="product-modal-header">
            <span>
              <MyIcon type="products" style={{ marginRight: "5px" }} />
              Products / Services
            </span>
            <Button
              icon={<PlusOutlined />}
              className="add-product-btn"
              onClick={openAddProductModal}
            >
              Add New
            </Button>
          </span>
        }
        centered
        visible={isVisible}
        onCancel={onClose}
        footer={null}
      >
        <div className="product-list">
          {products.map((product) => (
            <div key={product.name} className="product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-actions">
                <MyIcon type="edit_btn" size="lg" style={{ marginRight: "5px" }} />
                <MyIcon type="delete_btn" size="lg" />
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* AddProductModal for adding new products */}
      <AddProductModal
        isVisible={isAddProductModalVisible}
        onClose={() => setIsAddProductModalVisible(false)}  // Close AddProductModal
        onAddProduct={handleAddNewProduct}
      />
    </>
  );
};

export default ProductsModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Popconfirm, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./styles/ModalStyles.css";
import MyIcon from "../Icon/MyIcon";
import AddProductModal from "./AddProductModal";
import {
  API_DELETE_FUNNEL,
  API_DELETE_PRODUCT,
  API_LIST_PRODUCTS,
} from "../../apis/MarketingToolsApis";
import { useSelector } from "react-redux";
import EditProductModal from "./EditProductModal";
// import EditProductModal from "./EditProductModal";

const ProductsModal = ({ isVisible, onClose }) => {
  const { token } = useSelector((state) => state.authToken);
  const [showSpinner, setShowSpinner] = useState(false);
  const [products, setProducts] = useState([]);
  const [isAddProductModalVisible, setIsAddProductModalVisible] =useState(false);
  const [isEditProductModalVisible, setIsEditProductModalVisible] =useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleAddNewProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    console.log(newProduct);
  };

  const openAddProductModal = () => {
    setIsAddProductModalVisible(true);
  };

  const openEditProductModal = (productId) => {
    setSelectedProductId(productId); // Set product ID for editing
    setIsEditProductModalVisible(true);
  };

  useEffect(() => {
    if (!isVisible) {
      setIsAddProductModalVisible(false);
      setIsEditProductModalVisible(false);
    }
  }, [isVisible]);

  const ListProducts = async () => {
    const response = await API_LIST_PRODUCTS(token, setShowSpinner);
    setProducts(response);
  };

  const onDeleteProduct = async (id) => {
    const response = await API_DELETE_PRODUCT(token, id, setShowSpinner);
    ListProducts();
  };

  const handleEditNewProduct = () => {
    ListProducts(); // Fetch the updated funnel list after editing
    setIsEditProductModalVisible(false); // Close the edit modal
    setSelectedProductId(null); // Reset the selected funnel ID
  };

  useEffect(() => {}, [selectedProductId]);

  useEffect(() => {
    ListProducts(); // Fetch the funnels when the component loads
  }, []);

  return (
    <>
    {showSpinner && <Spin fullscreen/>}
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
            <div key={product.id} className="product-item">
              <span className="product-name">{product.product_name}</span>
              <span className="product-actions">
                <MyIcon
                  type="edit_btn"
                  size="lg"
                  style={{ marginRight: "5px" }}
                  onClick={() => openEditProductModal(product.id)}
                />
                <Popconfirm
                  title="Are you sure you want to delete this product?"
                  onConfirm={() => onDeleteProduct(product.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <MyIcon type="delete_btn" size="lg" />
                </Popconfirm>
              </span>
            </div>
          ))}
        </div>
      </Modal>

      {/* Modals for adding and editing products */}
      <AddProductModal
        isVisible={isAddProductModalVisible}
        onClose={() => setIsAddProductModalVisible(false)}
        onAddProduct={handleAddNewProduct}
        ListProducts={ListProducts}
      />
      <EditProductModal
        isVisible={isEditProductModalVisible}
        onClose={() => setIsEditProductModalVisible(false)}
        productId={selectedProductId}
        ListProducts={ListProducts}
        onEditProduct={handleEditNewProduct}
      />
    </>
  );
};

export default ProductsModal;

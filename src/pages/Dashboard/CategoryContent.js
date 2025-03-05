import React, { useEffect, useState } from "react";
import { Modal, Input, message, Popconfirm } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import { API_CREATE_CATEGORY, API_DELETE_CATEGORY, API_GET_CATEGORY_ORDERING, API_UPDATE_CATEGORY, API_UPDATE_CATEGORY_ORDERING } from "../../apis/ChatApis";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../../components/Button/Button";
import ScrollableCategories from "./ScrollableCategories";
import { setRerenderDashboard } from "../../redux/AuthToken/Action";

const CategoryContent = ({  setCategory,onClose}) => {
    const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null); 
  const { token,rerender_dashboard } = useSelector((state) => state.authToken);
    const [fetchedCategories, setFetchedCategories] = useState([]);

  const fetchCategoryOrdering = async () => {
    const response = await API_GET_CATEGORY_ORDERING(token, null);
    setFetchedCategories(response?.category_order);
  };

  useEffect(() => {
    fetchCategoryOrdering();
  }, []);
  // Open Add Category Modal
  const handleAddCategoryClick = () => {
    setModalVisible(true);
    setCategoryName("");
  };

  // Open Edit Category Modal
  const handleEditCategoryClick = (category) => {
    setEditingCategory(category);
    setCategoryName(category.category_name);
    setEditModalVisible(true);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Delete Category
  const handleDelete = async (category_id) => {
    await API_DELETE_CATEGORY(token, category_id);
    fetchCategoryOrdering(); 
    dispatch(setRerenderDashboard(!rerender_dashboard))
  };

  // Add New Category
  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      message.error("Category name cannot be empty");
      return;
    }
    await API_CREATE_CATEGORY(token, categoryName);
    setModalVisible(false);
    setCategoryName(""); 
    fetchCategoryOrdering(); 
    dispatch(setRerenderDashboard(!rerender_dashboard))
  };

  // Update Category Name
  const handleUpdateCategory = async () => {
    if (!categoryName.trim()) {
      message.error("Category name cannot be empty");
      return;
    }
    await API_UPDATE_CATEGORY(token, categoryName,editingCategory.category_id);
    setEditModalVisible(false);
    setEditingCategory(null);
    fetchCategoryOrdering();
    dispatch(setRerenderDashboard(!rerender_dashboard))
  };

  const updateCategoryOrdering = async(categoryNames)=>{
    await API_UPDATE_CATEGORY_ORDERING(token,categoryNames)
    fetchCategoryOrdering()
    dispatch(setRerenderDashboard(!rerender_dashboard))
  }
  const onDragEnd = (result) => {
    const { destination, source } = result;
  
    if (!destination) return;
  
    const reorderedMetrics = Array.from(fetchedCategories);
    
    // Remove the dragged item and add it at the destination
    const [removed] = reorderedMetrics.splice(source.index, 1);
    reorderedMetrics.splice(destination.index, 0, removed);
  
    // Map to just category names for the update
    const categoryNames = reorderedMetrics.map(category => category.category_name);
    setFetchedCategories(reorderedMetrics)

    updateCategoryOrdering(categoryNames);
  };
  
  
  
  return (
    <div className="select-category-popup">
      <button className="select-category-popup-btn" onClick={handleAddCategoryClick}>
        + Add New Category
      </button>
<div style={{maxHeight:"300px",overflowY:'auto',scrollbarWidth:'none'}}>
    
<ScrollableCategories onDragEnd={onDragEnd} localSelectedMetrics={fetchedCategories} handleDelete={handleDelete} onClose={onClose} handleEditCategoryClick={handleEditCategoryClick} setCategory={setCategory}/>
      {/* {fetchedCategories?.category_order?.map((item, index ) => (
        <div key={index}>
          <button className="category-btn" onClick={()=>{setCategory(item);onClose()}}>
            <span>{item?.category_name}</span>
            <span className="category-btn-icons">
              <MyIcon type={"arrow_up_down"} style={{ height: "20px" }} />
              <MyIcon type={"sa_edit"} style={{ height: "25px" }} onClick={() => {handleEditCategoryClick(item)}} />
              <Popconfirm title="Are you sure you want to delete this category?" onConfirm={() => handleDelete(item?.category_id)} okText="Yes" cancelText="No">
                <MyIcon type={"sa_delete"} style={{ height: "25px" }} />
              </Popconfirm>
            </span>
          </button>
        </div>
      ))} */}

      {/* Add Category Modal */}
      <Modal
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        closable={false}
        footer={null}
      >
        <div className="custom-modal-header">
          <span className="modal-header">
            <MyIcon type="account" style={{ marginRight: "5px" }} size="md" /> 
            Add New Category
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={() => setModalVisible(false)} size="lg" className="close-icon" />
          </span>
        </div>

        <div className="modal-content">
          <Input
            placeholder="Enter category name"
            className="category-name-input"
            value={categoryName}
            onChange={handleInputChange}
          />
          <MyButton variant="filled" text={'Add Category'} onClick={handleAddCategory} />
        </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        centered
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        closable={false}
        footer={null}
      >
        <div className="custom-modal-header">
          <span className="modal-header">
            <MyIcon type="edit" style={{ marginRight: "5px" }} size="md" /> 
            Edit Category
          </span>
          <span>
            <MyIcon type={"close_icon"} onClick={() => setEditModalVisible(false)} size="lg" className="close-icon" />
          </span>
        </div>

        <div className="modal-content">
          <Input
            placeholder="Enter new category name"
            className="category-name-input"
            value={categoryName}
            onChange={handleInputChange}
          />
          <MyButton variant="filled" text={'Update Category'} onClick={handleUpdateCategory} />
        </div>
      </Modal>
      </div>
    </div>
  );
};

export default CategoryContent;

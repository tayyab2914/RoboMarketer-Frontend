import React, { useState } from "react";
import { Modal } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import CategoryContent from "./CategoryContent";

const SelectCategoryPopup = ({ setCategory, category }) => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <span id="SelectCategoryModal">
      <button className="add-prompt-category-select-btn" onClick={handleOpen}>
        <span>{category?.category_name || "Select Category"}</span>
        <span>
          <MyIcon type={"arrow_down"} size="xs" />
        </span>
      </button>

      <Modal
        className=""
        title={false}
        centered
        visible={visible}
        onCancel={handleClose}
        closable={false}
        footer={null}
        width={500}
      >
        <div className="custom-modal-header">
          <span className="modal-header">Select Category</span>
        </div>
        <div className="modal-content">
        <CategoryContent
          setCategory={setCategory}
          onClose={handleClose} // Ensure this is passed correctly to close the modal
        /></div>
      </Modal>
    </span>
  );
};

export default SelectCategoryPopup;

import React, { useState } from "react";
import { Modal, Popover } from "antd";
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
     <Popover
      content={
        <CategoryContent 
          setCategory={setCategory} 
          onClose={() => setVisible(false)} 
        />
      }
      overlayStyle={{ width: "400px" }}
      trigger="click"
      open={visible}
      onOpenChange={setVisible} // ✅ Properly handles open/close state
      placement="bottomRight"
    >
      <button className="add-prompt-category-select-btn">
        <span>{category?.category_name || "Select Category"}</span>
        <span>
          <MyIcon type={"arrow_down"} size="xs" />
        </span>
      </button>
    </Popover>
    </span>
  );
};

export default SelectCategoryPopup;

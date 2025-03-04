import React, { useState } from "react";
import { Modal, Popover } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import CategoryContent from "./CategoryContent";

const SelectCategoryPopup = ({ setCategory, category, category_name }) => {
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
            setCategory={(metric) => {
              setCategory(metric);
              console.log(metric);
            }}
            onClose={() => setVisible(false)}
          />
        }
        arrow={false}
        overlayStyle={{ width: "460px" }}
        trigger="click"
        open={visible}
        onOpenChange={setVisible} // ✅ Properly handles open/close state
        placement="bottomRight"
      >
        <button className="add-prompt-category-select-btn">
          <span>{category_name || "Select Category"}</span>
          <span>
            <MyIcon type={"arrow_down"} size="xs" />
          </span>
        </button>
      </Popover>
    </span>
  );
};

export default SelectCategoryPopup;

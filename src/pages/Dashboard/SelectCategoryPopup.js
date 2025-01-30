import React, { useEffect, useState } from "react";
import { Popover } from "antd";
import MyIcon from "../../components/Icon/MyIcon";
import { API_GET_CATEGORY_ORDERING } from "../../apis/ChatApis";
import { useSelector } from "react-redux";
import CategoryContent from "./CategoryContent";

const SelectCategoryPopup = ({setCategory,category}) => {
  const [visible, setVisible] = useState(false);
  const { token } = useSelector((state) => state.authToken);

  console.log('CATEGORY NAME ',category)
  const handleVisibleChange = (newVisible) => {
    console.log(newVisible)
    setVisible(newVisible);
  };


  return (
    <span id="SelectCategoryPopover">
   <Popover
  content={
    <CategoryContent 
      setCategory={setCategory}
      onClose={() => {console.log('onclose clicked'); setVisible(false)}}  // Ensure this is passed correctly
    />
  }
  trigger="click"
  open={visible}  // Change from "visible" to "open"
  onOpenChange={handleVisibleChange}  // Change from "onVisibleChange" to "onOpenChange"
  placement="bottomRight"
>

        <button className="add-prompt-category-select-btn">
          <span>{category?.category_name ||"Select Category"}</span>
          <span>
            <MyIcon type={"arrow_down"} size="xs" />
          </span>
        </button>
      </Popover>
    </span>
  );
};

export default SelectCategoryPopup;

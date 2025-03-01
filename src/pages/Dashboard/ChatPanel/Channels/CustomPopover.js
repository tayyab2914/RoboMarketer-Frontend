import React from "react";
import "./styles/CustomPopover.css";

const CustomPopover = ({ visible, onClose, content }) => {
  if (!visible) return null;

  return (
      <div className="custom-popover-inner">
        <div className="custom-popover-content">
          {content}
        </div>
        <div className="custom-popover-overlay" onClick={onClose}></div>
      </div>
  );
};

export default CustomPopover;

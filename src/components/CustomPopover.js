import React from 'react'

const CustomPopover = (visible,onCancel) => {
  return (
    <Popover
  content={
    <div style={{ padding: "8px" }}>
      <p style={{marginBottom:"0px"}}>Are you sure you want to logout?</p>
      <div style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}>
        <Button type="primary" onClick={logoutUser} style={{marginRight:"5px",padding:"0px 10px"}}>Yes</Button>
        <Button onClick={() => console.log("Cancelled")} style={{padding:"0px 10px"}}>No</Button>
      </div>
    </div>
  }
  trigger="click"
  placement="topLeft"
>
  <button type="text" className="modal-option-btn" style={{ width: "100%" }}>
    <MyIcon type="logout" /> <span>Logout</span>
  </button>
</Popover>
  )
}

export default CustomPopover

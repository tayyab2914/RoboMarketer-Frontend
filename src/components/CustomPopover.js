import { Button, Popover } from 'antd'
import React from 'react'

const CustomPopover = ({visible,onCancel,title,onConfirm,button}) => {
  return (
    <Popover
    open={visible} trigger="click" placement="topLeft" onOpenChange={onCancel}
  content={
    <div style={{ padding: "8px" }}>
      <p style={{marginBottom:"0px"}}>{title}</p>
      <div style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}>
        <Button type="primary" onClick={onConfirm} style={{marginRight:"5px",padding:"0px 10px"}}>Yes</Button>
        <Button onClick={onCancel} style={{padding:"0px 10px"}}>No</Button>
      </div>
    </div>
  }
>
  {button}
</Popover>
  )
}

export default CustomPopover

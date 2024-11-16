import React from "react";
import "./styles/Button.css";
import { DEFAULT_BUTTON_HEIGHT } from "../../utils/GlobalSettings";

const MyButton = ({ variant = "filled", text, onClick, w='100%', h = DEFAULT_BUTTON_HEIGHT ,fs = '16px', m='10px 0px 0px 0px',style,className}) => {
  return (
    <>
      {variant == "filled" && (
        <button className={`btn-filled ${className}`} style={{ height: h, width: w , fontSize:fs, margin:m,...style}} onClick={onClick}>
          {text}
        </button>
      )}
      {variant == "outlined" && (
        <button className={`btn-outlined ${className}`} style={{ height: h, width: w , fontSize:fs, margin:m,...style}} onClick={onClick} >
          {text}
        </button>
      )}
      
      {variant == "outlined-dark" && (
        <button className={`btn-outlined-dark ${className}`} style={{ height: h, width: w , fontSize:fs, margin:m,...style}} onClick={onClick} >
          {text}
        </button>
      )}
      {variant == "outlined-filled" && (
        <button className={`btn-outlined-filled ${className}`} style={{ height: h, width: w, fontSize:fs, margin:m ,...style}} onClick={onClick} >
          {text}
        </button>
      )}
    </>
  );
};

export default MyButton;

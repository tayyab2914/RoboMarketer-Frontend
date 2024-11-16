import React from 'react';
import { IMAGES } from '../../data/ImageData';
const MyImage = ({ type,  w = '100%', h= 'auto',onClick,className  }) => {
  return (
    <div>
      {IMAGES[type] ? (
        <img  src={IMAGES[type]}   style={{ width: w, height: h }}  onClick={onClick} className={className}/>
      ) : (
        <p>Image not found</p>
      )}
    </div>
  );
};

export default MyImage;

import React from "react";
import ReactDom from 'react-dom';

function PhotoPicker({ photoPickerChange }) {
  const component = (
    <input type="file" hidden id="photo-picker" onChange={photoPickerChange} />
  );
  return ReactDom.createPortal(
    component,
    document.getElementById("photo-picker-element")
  );
}

export default PhotoPicker;

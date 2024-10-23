import React from 'react';
import './Controlbtn.scss';
const ControlBtn = ({ text, color = 0, handleClick }) => {
  return (
    <div className="control_btn_container" style={{ '--hue': color }}>
      <div className="control_btn__outline">
        <button className="control_btn" onClick={handleClick}>
          <span className="control_btn__front">{text}</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBtn;

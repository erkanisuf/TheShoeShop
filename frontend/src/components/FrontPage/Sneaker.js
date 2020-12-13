import React from "react";
import mainLogo from "./3191.jpg";
import "./sneaker.css";

const Sneaker = () => {
  return (
    <div className="showBG">
      <button style={{ position: "absolute", left: 0 }}>
        Explore The Shoes
      </button>
      <img src={mainLogo} alt="logo" className="imageLogo" />
    </div>
  );
};

export default Sneaker;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const params = useLocation();
  console.log(params.state.detail, "formSUCC PAGE");
  // const clearCart = () => {
  //   dispatch({ type: REMOVE_ALL_CART });
  // };
  return (
    <div>
      <h1>SUCESS PAID</h1>
    </div>
  );
};

export default Success;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const params = useLocation();
  console.log(params.state.detail, "formSUCC PAGE");
  const info = params.state.detail;

  // const clearCart = () => {
  //   dispatch({ type: REMOVE_ALL_CART });
  // };
  return (
    <div>
      <h1>SUCESS PAID</h1>
      <h1>Tracking ID: {info.tracking_number}</h1>
      <div>
        <h1>Shipping Adress</h1>
        <p>City:{info.address.city}</p>
        <p>Adress:{info.address.line1}</p>
        <p>PostCode:{info.address.postal_code}</p>
      </div>
      <div>
        <h1>Contact</h1>
        <p>Name:{info.name}</p>
        <p>phone:{info.phone}</p>
        <p>Email:{info.receipt_email}</p>
        <p>
          User:{info.typeUser.name === null ? "GuesT User" : info.typeUser.name}
        </p>
      </div>
    </div>
  );
};

export default Success;

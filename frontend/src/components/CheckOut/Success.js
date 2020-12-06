import { useElements } from "@stripe/react-stripe-js";
import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../../Context/Context";
import { REMOVE_ALL_CART } from "../../Context/reducers";

const Success = () => {
  const { state, dispatch, putence } = useContext(MyContext);
  const params = useLocation();
  // console.log(params.state.detail, "formSUCC PAGE");
  // const info = params.state.detail ? params.state.detail : "";

  // const clearCart = () => {
  //   dispatch({ type: REMOVE_ALL_CART });
  // };
  useEffect(() => {
    dispatch({ type: REMOVE_ALL_CART });
  }, []);
  if (!params.state) {
    return <p>No purchases!</p>;
  }
  return (
    <div>
      <h1>SUCESS PAID</h1>
      <h1>Tracking ID: {params.state.detail.tracking_number}</h1>
      <div>
        <h1>Shipping Adress</h1>
        <p>City:{params.state.detail.address.city}</p>
        <p>Adress:{params.state.detail.address.line1}</p>
        <p>PostCode:{params.state.detail.address.postal_code}</p>
      </div>
      <div>
        <h1>Contact</h1>
        <p>Name:{params.state.detail.name}</p>
        <p>phone:{params.state.detail.phone}</p>
        <p>Email:{params.state.detail.receipt_email}</p>
        <p>
          User:
          {params.state.detail.typeUser.name === null
            ? "GuesT User"
            : params.state.detail.typeUser.name}
        </p>
      </div>
    </div>
  );
};

export default Success;

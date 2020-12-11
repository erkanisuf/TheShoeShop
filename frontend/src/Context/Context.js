import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

import { shopReducer } from "./reducers";

import { FETCH_PRODUCT, REFRESH_CART, FETCH_ADRESS } from "./reducers";
export const MyContext = createContext();

export const Context = (props) => {
  console.log(window.location, "LOC");
  const [state, dispatch] = useReducer(shopReducer, {
    cart: [],
    token: localStorage.getItem("UserToken"),
    user: {
      name: localStorage.getItem("User"),
      id: localStorage.getItem("UserID"),
      adress: null,
    },
    products: [],
  });

  useEffect(() => {
    dispatch({
      type: REFRESH_CART,
      cart: JSON.parse(localStorage.getItem("cart")),
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/products/productuser`).then((res) => {
      dispatch({ type: FETCH_PRODUCT, product: res.data });
    });
  }, []);

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: `${localStorage.getItem("UserToken")}`,
    };
    axios
      .get(`http://localhost:4000/api/user/useradress`, { headers: headers })
      .then((res) => {
        if (res.status === 400) {
          console.log("err");
        } else {
          dispatch({ type: FETCH_ADRESS, adress: res.data[0].adress });
          console.log(res);
        }
      })
      .catch((error) => {
        // console.log(error.response.request.response);
        // setError(error.response.request.response);
      });
  }, []);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;

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
    products: [
      // {
      //   id: 32333,
      //   name: "Nike Slim Shirt",
      //   category: "Shirts",
      //   image: [p1, p2, p40],
      //   price: 120,
      //   countInStock: 10,
      //   brand: "Nike",
      //   rating: 4.5,
      //   sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
      //   numReviews: 10,
      //   description: "high quality product",
      //   selectedSize: "",
      // },
      // {
      //   id: 55555,
      //   name: "Adidas Fit Shirt",
      //   category: "Shirts",
      //   image: [p1, p2],
      //   price: 111.5,
      //   countInStock: 20,
      //   brand: "Adidas",
      //   rating: 4.0,
      //   sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
      //   numReviews: 10,
      //   description: "high quality product",
      //   selectedSize: "",
      // },
      // {
      //   id: 55551115,
      //   name: "abnannaS",
      //   category: "Shirts",
      //   image: [p1, p2],
      //   price: 125,
      //   countInStock: 20,
      //   brand: "Adidasz",
      //   rating: 4.0,
      //   sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
      //   numReviews: 10,
      //   description: "high quality product",
      //   selectedSize: "",
      // },
      // {
      //   id: 55551115323,
      //   name: "Same Name",
      //   category: "Shirts",
      //   image: [p1, p2],
      //   price: 125,
      //   countInStock: 20,
      //   brand: "Adidasz",
      //   rating: 4.0,
      //   sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
      //   numReviews: 10,
      //   description: "high quality product",
      //   selectedSize: "",
      // },
      // {
      //   id: 55551115323111,
      //   name: "Same Name",
      //   category: "Shirts",
      //   image: [red, red2],
      //   price: 699,
      //   countInStock: 20,
      //   brand: "Adidasz",
      //   rating: 4.0,
      //   sizes: [44.5, 45, 45.5, 47],
      //   numReviews: 10,
      //   description: "high quality product",
      //   selectedSize: "",
      // },
    ],
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

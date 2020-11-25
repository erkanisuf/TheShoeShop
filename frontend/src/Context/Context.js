import React, { createContext, useReducer } from "react";

import { shopReducer } from "./reducers";
import p1 from "../components/Products/images/p1.jpg";
import p2 from "../components/Products/images/p2.jpg";
export const MyContext = createContext();

export const Context = (props) => {
  const [state, dispatch] = useReducer(shopReducer, {
    cart: [],
    token: localStorage.getItem("UserToken"),
    user: {
      name: localStorage.getItem("User"),
      id: localStorage.getItem("UserID"),
    },
    products: [
      {
        id: 32333,
        name: "Nike Slim Shirt",
        category: "Shirts",
        image: p1,
        price: 120,
        countInStock: 10,
        brand: "Nike",
        rating: 4.5,
        numReviews: 10,
        description: "high quality product",
      },
      {
        id: 55555,
        name: "Adidas Fit Shirt",
        category: "Shirts",
        image: p2,
        price: 111,
        countInStock: 20,
        brand: "Adidas",
        rating: 4.0,
        numReviews: 10,
        description: "high quality product",
      },
      {
        id: 55551115,
        name: "abnannaS",
        category: "Shirts",
        image: p2,
        price: 125,
        countInStock: 20,
        brand: "Adidasz",
        rating: 4.0,
        numReviews: 10,
        description: "high quality product",
      },
    ],
  });

  // useEffect(() => {
  //   // axios
  //   //   .get(`https://customerrest.herokuapp.com/api/trainings`)
  //   //   .then((res) => {
  //   //     dispatch({ type: FETCH_PRODUCT, product: res.data.content });
  //   //   });
  //   dispatch({ type: FETCH_PRODUCT });
  // }, []);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;

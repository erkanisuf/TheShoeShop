import React, { createContext, useReducer } from "react";

import { shopReducer } from "./reducers";
import p1 from "../components/Products/images/p1.jpg";
import p2 from "../components/Products/images/p2.jpg";
import p40 from "../components/Products/images/40.jpg";
import red from "../components/Products/images/red.jpg";
import red2 from "../components/Products/images/red2.jpg";
export const MyContext = createContext();

export const Context = (props) => {
  const [state, dispatch] = useReducer(shopReducer, {
    cart: [],
    token: localStorage.getItem("UserToken"),
    user: {
      name: localStorage.getItem("User"),
      id: localStorage.getItem("UserID"),
      adress: null,
    },
    products: [
      {
        id: 32333,
        name: "Nike Slim Shirt",
        category: "Shirts",
        image: [p1, p2, p40],
        price: 120,
        countInStock: 10,
        brand: "Nike",
        rating: 4.5,
        sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
        numReviews: 10,
        description: "high quality product",
        selectedSize: "",
      },
      {
        id: 55555,
        name: "Adidas Fit Shirt",
        category: "Shirts",
        image: [p1, p2],
        price: 111.5,
        countInStock: 20,
        brand: "Adidas",
        rating: 4.0,
        sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
        numReviews: 10,
        description: "high quality product",
        selectedSize: "",
      },
      {
        id: 55551115,
        name: "abnannaS",
        category: "Shirts",
        image: [p1, p2],
        price: 125,
        countInStock: 20,
        brand: "Adidasz",
        rating: 4.0,
        sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
        numReviews: 10,
        description: "high quality product",
        selectedSize: "",
      },
      {
        id: 55551115323,
        name: "Same Name",
        category: "Shirts",
        image: [p1, p2],
        price: 125,
        countInStock: 20,
        brand: "Adidasz",
        rating: 4.0,
        sizes: [39.5, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 45.5, 47],
        numReviews: 10,
        description: "high quality product",
        selectedSize: "",
      },
      {
        id: 55551115323111,
        name: "Same Name",
        category: "Shirts",
        image: [red, red2],
        price: 699,
        countInStock: 20,
        brand: "Adidasz",
        rating: 4.0,
        sizes: [44.5, 45, 45.5, 47],
        numReviews: 10,
        description: "high quality product",
        selectedSize: "",
      },
    ],
  });

  const putence = "PTUENCEEEEEEEEEEEEEEEEEEEEE";
  // useEffect(() => {
  //   // axios
  //   //   .get(`https://customerrest.herokuapp.com/api/trainings`)
  //   //   .then((res) => {
  //   //     dispatch({ type: FETCH_PRODUCT, product: res.data.content });
  //   //   });
  //   dispatch({ type: FETCH_PRODUCT });
  // }, []);
  return (
    <MyContext.Provider value={{ state, dispatch, putence }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;

import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { shopReducer, FETCH_PRODUCT } from "./reducers";
export const MyContext = createContext();

export const Context = (props) => {
  const [state, dispatch] = useReducer(shopReducer, {
    cart: [],
    token: localStorage.getItem("UserToken"),
    user: {
      name: localStorage.getItem("User"),
      id: localStorage.getItem("UserID"),
    },
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

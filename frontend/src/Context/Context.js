import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { shopReducer, FETCH_PRODUCT } from "./reducers";
export const MyContext = createContext();

export const Context = (props) => {
  const [state, dispatch] = useReducer(shopReducer, {
    cart: ["banna"],
    token: localStorage.getItem("UserToken"),
  });

  useEffect(() => {
    axios
      .get(`https://customerrest.herokuapp.com/api/trainings`)
      .then((res) => {
        dispatch({ type: FETCH_PRODUCT, product: res.data.content });
      });
  }, []);
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;

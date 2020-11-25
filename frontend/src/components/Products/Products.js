import React, { useContext } from "react";
import { MyContext } from "../../Context/Context";

import {
  REMOVE_PRODUCT,
  INCREMENT_QUANT,
  DECREMENT_QUANT,
} from "../../Context/reducers";
import Product from "./Product";
export const Products = () => {
  const { state, dispatch } = useContext(MyContext);
  const products = state.products;
  return (
    <div>
      <h1>CART</h1>
      {state.cart.map((item, index) => {
        return (
          <div key={index}>
            {item.name}
            <p>QUantitiy: {item.quantity}</p>
            <button
              onClick={() => dispatch({ type: INCREMENT_QUANT, product: item })}
            >
              +
            </button>
            <button
              onClick={() => dispatch({ type: DECREMENT_QUANT, product: item })}
            >
              -
            </button>
            <button
              onClick={() => dispatch({ type: REMOVE_PRODUCT, product: item })}
            >
              Remove item
            </button>
          </div>
        );
      })}
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {products.map((item, index) => {
          return <Product product={item} key={index} />;
        })}
      </div>
    </div>
  );
};
export default Products;

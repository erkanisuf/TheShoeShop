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
      <h1>Products</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",

          flex: "1 1 0",
          justifyContent: "flex-start",
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

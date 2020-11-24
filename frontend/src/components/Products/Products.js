import React, { useContext } from "react";
import { MyContext } from "../../Context/Context";
import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREMENT_QUANT,
  DECREMENT_QUANT,
} from "../../Context/reducers";
import p1 from "./images/p1.jpg";
import p2 from "./images/p2.jpg";
import Product from "./Product";
export const Products = () => {
  const products = [
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
  ];

  const { state, dispatch } = useContext(MyContext);
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

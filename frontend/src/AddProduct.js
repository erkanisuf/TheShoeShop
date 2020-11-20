import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App({ user }) {
  const [product, setProduct] = useState({ name: "", price: "" });

  const [token, setToken] = useState(null);
  console.log(token);
  useEffect(() => {
    const getitemfromLocalStorage = localStorage.getItem("UserToken");
    if (getitemfromLocalStorage) {
      console.log("Product  token");
      setToken(getitemfromLocalStorage);
    } else {
      console.log("Product No token");
      setToken(null);
    }
  }, [user]);

  const handleOnChange = (e) => {
    if (e.target.type === "number") {
      setProduct({ ...product, [e.target.name]: parseInt(e.target.value) });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (token === null) {
      return alert("Please Login in first!");
    }
    axios
      .post(`http://localhost:4000/api/products/addproduct`, product, {
        headers: {
          auth_token: token,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="App">
      <h1>Add Product</h1>

      <form>
        <label>Name</label>
        <input type="text" name="name" onChange={handleOnChange} />
        <label>Price</label>
        <input type="number" name="price" onChange={handleOnChange} />
        <button onClick={addProduct}>Submit</button>
      </form>
    </div>
  );
}

export default App;

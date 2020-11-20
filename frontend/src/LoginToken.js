import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import AddProduct from "./AddProduct";
function App() {
  const [user, setUser] = useState({ name: "", password: "" });
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getitemfromLocalStorage = localStorage.getItem("UserToken");
    if (getitemfromLocalStorage) {
      console.log("u got token");
    } else {
      console.log("No token");
    }
  }, [token]);

  const handleOnChange = (e) => {
    console.log({ ...user, [e.target.name]: e.target.value });
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const logIn = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:4000/api/user/login`, user).then((res) => {
      console.log(res);
      window.localStorage.setItem("UserToken", res.data);
      setToken(true);
    });
  };

  const singOut = () => {
    window.localStorage.removeItem("UserToken");
    setToken(false);
  };
  return (
    <div className="App">
      <h1>Login</h1>
      {localStorage.getItem("UserToken") ? (
        <button onClick={singOut}>sign OUt</button>
      ) : (
        <form>
          <label>Name</label>
          <input type="text" name="name" onChange={handleOnChange} />
          <label>Password</label>
          <input type="text" name="password" onChange={handleOnChange} />
          <button onClick={logIn}>Submit</button>
        </form>
      )}
      <AddProduct user={token} />
    </div>
  );
}

export default App;

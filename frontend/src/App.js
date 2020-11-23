import React, { useContext } from "react";
import { MyContext } from "./Context/Context";
import { ADD_PRODUCT, REMOVE_PRODUCT } from "./Context/reducers";
import "./App.css";
import UserLogin from "./components/User/UserLogin";
import Products from "./components/Products/Products";
import Layout from "./Layout/Layout";
function App() {
  const { state, dispatch } = useContext(MyContext);

  const kur = "apple";

  return (
    <Layout>
      <div className="App">
        <h1>Dispatch</h1>
        <button
          onClick={() => dispatch({ type: REMOVE_PRODUCT, product: kur })}
        >
          GGGG
        </button>
        <button onClick={() => console.log(state)}>c</button>
        <button
          onClick={() => dispatch({ type: REMOVE_PRODUCT, product: "amcik" })}
        >
          removeee
        </button>
        <UserLogin />
        <Products />
      </div>
    </Layout>
  );
}

export default App;

import React, { useContext } from "react";
import { MyContext } from "./Context/Context";
import { ADD_PRODUCT, REMOVE_PRODUCT } from "./Context/reducers";
import "./App.css";
import UserLogin from "./components/User/UserLogin";
import Products from "./components/Products/Products";
import Layout from "./Layout/Layout";
import Profile from "./components/User/Profile";
import { Switch, Route } from "react-router-dom";
import ProductID from "./components/Products/ProductID";

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

        <Switch>
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/product/:id">
            <ProductID />
          </Route>
          <Route path="/userprofile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default App;

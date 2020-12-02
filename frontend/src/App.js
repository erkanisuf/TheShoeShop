import React, { useContext, useState } from "react";
import { MyContext } from "./Context/Context";
import { ADD_PRODUCT, REMOVE_PRODUCT } from "./Context/reducers";
import "./App.css";
import UserLogin from "./components/User/UserLogin";
import Products from "./components/Products/Products";
import Layout from "./Layout/Layout";
import Profile from "./components/User/Profile";
import { Switch, Route } from "react-router-dom";
import ProductID from "./components/Products/ProductID/ProductID";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import Login from "./components/User/Login";
import PrivateRoute from "./PrivateRoute";
import AdminPanel from "./components/User/AdminPanel";

function App() {
  const { state, dispatch } = useContext(MyContext);

  const kur = "apple";
  const [openLogin, setopenLogin] = useState(true);
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
        <Breadcrumbs />
        <UserLogin />

        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/products/:id">
            <ProductID />
          </Route>

          <PrivateRoute exact path="/userprofile" component={Profile} />

          {/* <Route path="/userprofile">
           <Profile />
          
          </Route> */}
          <Route path="/login">
            <h1> Please log in to use this section.</h1>
            <Login
              openLogin={openLogin}
              handleClose={() => setopenLogin(false)}
            />
          </Route>
          <Route path="/adminpanel">
            <AdminPanel />
          </Route>
        </Switch>
      </div>
    </Layout>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/core/Home";
import Navbar from "./components/core/Navbar";
import PrivateRoute from "./actions/auth/PrivateRoute";
import AdminRoute from "./actions/auth/AdminRoute";
import UserDashBoard from "./components/user/UserDashboard";
import AdminDashboard from "./components/user/AdminDashboard";
import Category from "./components/admin/Category";
import Product from "./components/admin/Product";
import Shop from "./components/core/Shop";
import ProductDetail from "./components/core/Product";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/dashboard/product" exact component={Product} />
        <AdminRoute
          path="/admin/dashboard/category"
          exact
          component={Category}
        />
        <Route path="/product/:productId" exact component={ProductDetail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

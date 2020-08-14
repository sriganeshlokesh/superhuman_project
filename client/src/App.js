import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/core/Home";
import Navbar from "./components/core/Navbar";
import PrivateRoute from "./actions/auth/PrivateRoute";
import AdminRoute from "./actions/auth/AdminRoute";
import UserDashBoard from "./components/user/UserDashboard";
import EditProfile from "./components/user/EditProfile";
import AdminDashboard from "./components/user/AdminDashboard";
import Category from "./components/admin/Category";
import Product from "./components/admin/Product";
import UpdateProduct from "./components/admin/UpdateProduct";
import AddInfo from "./components/admin/AddInfo";
import EditInfo from "./components/admin/EditInfo";
import Orders from "./components/admin/Orders";
import Shop from "./components/core/Shop";
import ProductDetail from "./components/core/Product";
import ShoppingCart from "./components/core/ShoppingCart";
import CheckoutPage from "./components/core/CheckoutPage";
import Footer from "./components/core/Footer";
import "./App.css";
import Purchase from "./components/core/Purchase";
import OrderPage from "./components/core/OrderPage";

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
        <PrivateRoute path="/success/order" exact component={Purchase} />
        <PrivateRoute
          path="/order/:transactionId"
          exact
          component={OrderPage}
        />
        <PrivateRoute
          path="/user/dashboard/profile/:id"
          exact
          component={EditProfile}
        />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/admin/dashboard/product" exact component={Product} />
        <AdminRoute
          path="/admin/dashboard/info/:productId"
          exact
          component={AddInfo}
        />
        <AdminRoute
          path="/admin/dashboard/edit/info/:productId"
          exact
          component={EditInfo}
        />
        <AdminRoute
          path="/admin/dashboard/edit/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute path="/admin/dashboard/order" exact component={Orders} />
        <AdminRoute
          path="/admin/dashboard/category"
          exact
          component={Category}
        />
        <Route path="/product/:productId" exact component={ProductDetail} />
        <Route path="/cart" exact component={ShoppingCart} />
        <Route path="/checkout" exact component={CheckoutPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";
import {
  getOrders,
  getProducts,
  getAllUsers,
} from "../../actions/admin/adminApi";
import AdminNavbar from "./AdminNavbar";
import "../../App.css";

const AdminDashboard = (props) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const loadUsers = () => {
    getAllUsers(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
    loadUsers();
  }, []);

  const adminLayout = () => (
    <div class="container-fluid mt-0">
      <div class="row">
        <AdminNavbar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
          <div class="card-list">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                <div class="card blue">
                  <div class="title">Orders</div>
                  <i class="zmdi zmdi-upload"></i>
                  <div class="value">{orders.length}</div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                <div class="card green">
                  <div class="title">Customers</div>
                  <i class="zmdi zmdi-upload"></i>
                  <div class="value">{users.length}</div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                <div class="card orange">
                  <div class="title">Products</div>
                  <i class="zmdi zmdi-download"></i>
                  <div class="value">{products.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="projects mb-4">
            <div class="projects-inner">
              <header class="projects-header">
                <div class="title">Order History</div>
                <div class="count">| {orders.length} Orders</div>
                <i class="zmdi zmdi-download"></i>
              </header>
              <table class="projects-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Price</th>
                    <th>Shipping</th>
                  </tr>
                </thead>

                {orders.slice(0, 5).map((order, index) => (
                  <tr>
                    <td>
                      <p>{order._id}</p>
                    </td>
                    <td>
                      <p>{order.transaction_id}</p>
                    </td>
                    <td class="member">
                      <div class="member-info">
                        <p>{order.user.name}</p>
                        <p></p>
                      </div>
                    </td>
                    <td>
                      <p>${order.amount}</p>
                      <p>{order.status}</p>
                    </td>
                    <td class="status">
                      <span class="status-text status-orange">True</span>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  return <div>{adminLayout()}</div>;
};

export default withRouter(AdminDashboard);

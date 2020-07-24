import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";
import { getOrders } from "../../actions/admin/adminApi";
import AdminNavbar from "./AdminNavbar";
import "../../adminDashboard.css";

const AdminDashboard = (props) => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();
  console.log(token);

  const loadOrders = () => {
    getOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
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
                  <div class="value">5,990</div>
                </div>
              </div>
              <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                <div class="card orange">
                  <div class="title">Products</div>
                  <i class="zmdi zmdi-download"></i>
                  <div class="value">80,990</div>
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
                      <figure>
                        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" />
                      </figure>
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
          <div class="chart-data">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="chart radar-chart dark">
                  <div class="actions">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="zmdi zmdi-more-vert"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button class="dropdown-item" type="button">
                        Action
                      </button>
                      <button class="dropdown-item" type="button">
                        Another action
                      </button>
                      <button class="dropdown-item" type="button">
                        Something else here
                      </button>
                    </div>
                  </div>
                  <h3 class="title">Household Expenditure</h3>
                  <p class="tagline">Yearly</p>
                  <canvas height="400" id="radarChartDark"></canvas>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="chart bar-chart light">
                  <div class="actions">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="zmdi zmdi-more-vert"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button class="dropdown-item" type="button">
                        Action
                      </button>
                      <button class="dropdown-item" type="button">
                        Another action
                      </button>
                      <button class="dropdown-item" type="button">
                        Something else here
                      </button>
                    </div>
                  </div>
                  <h3 class="title">Monthly revenue</h3>
                  <p class="tagline">2015 (in thousands US$)</p>
                  <canvas height="400" id="barChartHDark"></canvas>
                </div>
              </div>
              <div class="col-12 col-md-4">
                <div class="chart doughnut-chart dark">
                  <div class="actions">
                    <button
                      type="button"
                      class="btn btn-link"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="zmdi zmdi-more-vert"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button class="dropdown-item" type="button">
                        Action
                      </button>
                      <button class="dropdown-item" type="button">
                        Another action
                      </button>
                      <button class="dropdown-item" type="button">
                        Something else here
                      </button>
                    </div>
                  </div>
                  <h3 class="title">Exports of Goods</h3>
                  <p class="tagline">2015 (in billion US$)</p>
                  <canvas height="400" id="doughnutChartDark"></canvas>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  return <div>{adminLayout()}</div>;
};

export default withRouter(AdminDashboard);

import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";
import AdminNavbar from "./AdminNavbar";
import "../../adminDashboard.css";
import Layout from "../core/Layout";

const AdminDashboard = (props) => {
  const adminLayout = () => (
    <div class="container-fluid">
      <div class="row">
        <AdminNavbar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
          <div class="card-list">
            <div class="row">
              <div class="col-12 col-md-6 col-lg-4 col-xl-4 mb-4">
                <div class="card blue">
                  <div class="title">Orders</div>
                  <i class="zmdi zmdi-upload"></i>
                  <div class="value">89</div>
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
                <div class="count">| 32 Orders</div>
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
                    <th class="text-right">Actions</th>
                  </tr>
                </thead>

                <tr>
                  <td>
                    <p>Order ID</p>
                  </td>
                  <td>
                    <p>ON Serious Mass</p>
                  </td>
                  <td class="member">
                    <figure>
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/584938/people_8.png" />
                    </figure>
                    <div class="member-info">
                      <p>Test 1</p>
                      <p></p>
                    </div>
                  </td>
                  <td>
                    <p>$4,670</p>
                    <p>Paid</p>
                  </td>
                  <td class="status">
                    <span class="status-text status-orange">True</span>
                  </td>
                  <td>
                    <form class="form" action="#" method="POST">
                      <select class="action-box">
                        <option>Actions</option>
                        <option>Update Order</option>
                        <option>Delete Order</option>
                      </select>
                    </form>
                  </td>
                </tr>
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

import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../actions/auth";
import {
  getOrders,
  getStatusValues,
  updateOrderStatus,
} from "../../actions/admin/adminApi";
import AdminNavbar from "../user/AdminNavbar";
import moment from "moment";
import "../../App.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([]);

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

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatus(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status</option>
        {status.map((data, index) => (
          <option key={index} value={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );

  const showProduct = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  );

  const OrdersCard = () => (
    <React.Fragment>
      <section class="wrapper">
        <div class="container-fostrap">
          <div class="content">
            <div class="container-fluid mt-0">
              <div class="row">
                <AdminNavbar />
                <div class="col">
                  {orders.map((order, index) => (
                    <div class="card" key={index}>
                      <div class="card-content">
                        <h4 class="card-title">Order #ID {order._id}</h4>
                        <ul className="list-group mb-2">
                          <li className="list-group-item">
                            {showStatus(order)}
                          </li>
                          <li className="list-group-item">
                            Transaction ID: {order.transaction_id}
                          </li>
                          <li className="list-group-item">
                            Order Amount: ${order.amount}
                          </li>
                          <li className="list-group-item">
                            Ordered By: {order.user.name}
                          </li>
                          <li className="list-group-item">
                            Ordered On: {moment(order.createdAt).fromNow()}
                          </li>
                          <li className="list-group-item">
                            Delivery Address: {order.address}
                          </li>
                        </ul>
                        <h3>
                          Total Products in Order: {order.products.length}
                        </h3>

                        {order.products.map((product, index) => (
                          <div
                            className="mb-4"
                            key={index}
                            style={{
                              padding: "20px",
                              border: "1px solid indigo",
                            }}
                          >
                            {showProduct("name", product.name)}
                            {showProduct("price", product.price)}
                            {showProduct("count", product.count)}
                            {showProduct("id", product._id)}
                          </div>
                        ))}
                      </div>
                      <div class="card-read-more">
                        <a
                          href="http://www.fostrap.com/2016/03/5-button-hover-animation-effects-css3.html"
                          class="btn btn-link btn-block"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );

  return <React.Fragment>{OrdersCard()}</React.Fragment>;
};

export default Orders;

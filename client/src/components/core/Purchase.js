import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";
import { getOrder } from "./apiCore";
import moment from "moment";
import CartCard from "./CartCard";
import "../../App.css";

const Purchase = (props) => {
  const { user, token } = isAuthenticated();
  const [run, setRun] = useState(false);

  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);

  const loadOrder = (transactionId, userId, token) => {
    getOrder(transactionId, userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrder(data.data);
        setProducts(data.data.products);
      }
    });
  };

  useEffect(() => {
    loadOrder(props.location.state.id, user._id, token);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card text-center mt-4">
            <div className="card-body">
              <h2>Order Confirmation</h2>
              <p>{user.name}, Thank you for your Order!</p>
              <p>
                We've recieved your order and you can check your order status on
                your dashboard
              </p>
              <p>You can find your purchase information below</p>
            </div>
          </div>

          <div className="row text-center">
            <div className="col">
              <h3>Order Summary</h3>
              <p>{moment(order.createdAt).format("MMMM Do YYYY")}</p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-12">
              {products.map((product, index) => (
                <CartCard
                  key={index}
                  product={product}
                  setRun={setRun}
                  run={run}
                  showRemove={false}
                  showQuantity={false}
                />
              ))}
            </div>
          </div>

          <div className="row text-center">
            <div className="col-12">
              <h4>Order Total</h4>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <p>
                Subtotal Price:{" "}
                <p className="pull-right">${Math.round(order.amount - 5)}</p>
              </p>
              <p>
                Shipping: <p className="pull-right">$5</p>
              </p>
              <hr />
              <h4>
                Total Price: <p className="pull-right">${order.amount}</p>{" "}
              </h4>
            </div>
          </div>
          <div className="row text-center continue-shopping">
            <div className="col-12">
              <Link to="/" className="btn pull-center">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;

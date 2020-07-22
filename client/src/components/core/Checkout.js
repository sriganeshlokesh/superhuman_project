import React from "react";
import { isAuthenticated } from "../../actions/auth";
import { getBraintreeToken } from "./apiCore";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const total = Math.round((getTotal() + 5 + Number.EPSILON) * 100) / 100;

  const showCheckout = () => {
    return isAuthenticated() ? (
      <Link to="/checkout">
        <div className="row custom-checkout-comp">
          <button className="custom-checkout-button">
            CONTINUE TO CHECKOUT
          </button>
        </div>
      </Link>
    ) : (
      <div className="row custom-checkout-comp">
        <Link to="/login">
          <button className="custom-checkout-button">
            SIGN IN TO CHECKOUT
          </button>
        </Link>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">
          <p>SUBTOTAL:</p>
        </div>
        <div className="col-md-6">
          ${Math.round((getTotal() + Number.EPSILON) * 100) / 100}
        </div>
      </div>
      <hr />
      <div className="row mt-3 ml-3">
        <p>Shipping: </p>
      </div>
      <div className="row mt-3 ml-3">
        <h3>$5</h3>
      </div>
      <hr />
      <div className="row mt-3 ml-3">
        <p>Estimated Total</p>
      </div>
      <div className="row mt-3 ml-3">
        <h3>${total}</h3>
      </div>
      <hr />
      {showCheckout()}
    </React.Fragment>
  );
};

export default Checkout;

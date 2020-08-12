import React from "react";
import { isAuthenticated } from "../../actions/auth";
import { Link } from "react-router-dom";

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
        <button className="custom-checkout-button text-center">
          CONTINUE TO CHECKOUT
        </button>
      </Link>
    ) : (
      <Link to="/login">
        <button className="custom-checkout-button">SIGN IN TO CHECKOUT</button>
      </Link>
    );
  };

  return (
    <React.Fragment>
      <div className="row checkout-custom mt-5">
        <div className="col-md-4 ml-3">
          <p>SUBTOTAL:</p>
        </div>
        <div className="col-md-4">
          ${Math.round((getTotal() + Number.EPSILON) * 100) / 100}
        </div>
      </div>
      <hr />
      <div className="row mt-1 ml-3">
        <p>Shipping: </p>
      </div>
      <div className="row mt-1 ml-3">
        <h3>$5</h3>
      </div>
      <hr />
      <div className="row mt-1 ml-3">
        <p>Estimated Total</p>
      </div>
      <div className="row mt-1 ml-3">
        <h3>${total}</h3>
      </div>
      <hr />
      <div className="row text-center">
        <div className="col-12">{showCheckout()}</div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;

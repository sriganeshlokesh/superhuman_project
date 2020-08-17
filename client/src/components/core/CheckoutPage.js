import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getBraintreeToken, processPayment, createOrder } from "./apiCore";
import { getCart, emptyCart } from "./addToCartHelper";
import CartCard from "./CartCard";
import { isAuthenticated } from "../../actions/auth";
import DropIn from "braintree-web-drop-in-react";
import "../../App.css";

const CheckoutPage = (props) => {
  const [run, setRun] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const [shipping, setShipping] = useState({
    firstname: "",
    lastname: "",
    address1: "",
    unit: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const {
    firstname,
    lastname,
    address1,
    unit,
    city,
    state,
    postalCode,
  } = shipping;

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeToken(userId, token).then((braintreeToken) => {
      if (braintreeToken.error) {
        setData({ ...data, error: braintreeToken.error });
      } else {
        setData({ ...data, clientToken: braintreeToken.clientToken });
      }
    });
  };

  const getTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const redirectToHome = (success, transactionId) => {
    console.log(transactionId);
    if (success) {
      props.history.push({
        pathname: "/success/order",
        state: {
          id: transactionId,
        },
      });
      console.log(transactionId);
      return <Redirect to="/success/order" />;
    }
  };
  const subtotal = getTotal();
  const total = Math.round((getTotal() + 5 + Number.EPSILON) * 100) / 100;

  useEffect(() => {
    setItems(getCart());
    getToken(userId, token);
  }, []);

  // let address = data.address;
  let address =
    firstname +
    " " +
    lastname +
    "\n" +
    address1 +
    " " +
    unit +
    "\n" +
    city +
    " " +
    state +
    "-" +
    postalCode;

  const payProduct = () => {
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        // Once we have nonce (card type, card number) we send the nonce to backend as requestPaymentMethod
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total,
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            const orderData = {
              products: items,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: address,
            };
            createOrder(userId, token, orderData).then((data) => {
              emptyCart(() => {
                setRun(!run);
              });
              redirectToHome(response.success, response.transaction.id);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };

  const handleChange = (name) => (event) => {
    setShipping({ ...shipping, errors: false, [name]: event.target.value });
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? " " : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && items.length > 0 ? (
        <React.Fragment>
          <div class="container">
            <h4>Shipping Address</h4>
            <hr />
            <div className="row">
              <div className="col-12">
                <div className="card-body">
                  <form class="form-product">
                    <div className="row">
                      <div className="col-6">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={firstname}
                            className="form-control"
                            onChange={handleChange("firstname")}
                            required
                          />
                          <label for="firstname">First Name</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={lastname}
                            className="form-control"
                            onChange={handleChange("lastname")}
                            required
                          />
                          <label for="lastname">Last Name</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="address1"
                            name="address1"
                            value={address1}
                            className="form-control"
                            onChange={handleChange("address1")}
                            required
                          />
                          <label for="address1">Address 1</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="unit"
                            name="unit"
                            value={unit}
                            className="form-control"
                            onChange={handleChange("unit")}
                            required
                          />
                          <label for="unit">Unit #</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={city}
                            className="form-control"
                            onChange={handleChange("city")}
                            required
                          />
                          <label for="city">City</label>
                        </div>
                      </div>
                      <div className="col-4">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={state}
                            className="form-control"
                            onChange={handleChange("state")}
                            required
                          />
                          <label for="state">State</label>
                        </div>
                      </div>
                      <div className="col-4">
                        <div class="form-label-group">
                          <input
                            type="text"
                            id="postalcode"
                            name="postalcode"
                            value={postalCode}
                            className="form-control"
                            onChange={handleChange("postalCode")}
                            required
                          />
                          <label for="postalcode">Postal Code</label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,

              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button className="btn btn-success" onClick={payProduct}>
            Proceed with Payment
          </button>
        </React.Fragment>
      ) : null}
    </div>
  );

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <div class="order">
              <h2>Order Summary</h2>

              {items.map((product, i) => (
                <CartCard
                  key={i}
                  product={product}
                  cartUpdate={true}
                  setRun={setRun}
                  run={run}
                  showRemove={false}
                  showQuantity={false}
                />
              ))}
              <h5 className="ship">SubTotal: {subtotal}</h5>
              <h5 className="ship">Shipping: $5</h5>
              <hr />
              <h3 className="total">TOTAL: ${total}</h3>
            </div>
          </div>
          <div className="col-4">
            {redirectToHome(data.success)}
            {showError(data.error)}
            {showSuccess(data.success)}
            {showDropIn()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutPage;

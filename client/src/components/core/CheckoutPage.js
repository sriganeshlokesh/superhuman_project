import React, { useState, useEffect } from "react";
import "./checkoutPage.css";
import { Redirect } from "react-router-dom";
import { getBraintreeToken, processPayment, createOrder } from "./apiCore";
import { getCart, emptyCart } from "./addToCartHelper";
import CartCard from "./CartCard";
import { isAuthenticated } from "../../actions/auth";
import DropIn from "braintree-web-drop-in-react";
import { set } from "lodash";

const CheckoutPage = () => {
  const [run, setRun] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

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

  const refreshComponent = () => {
    window.location.reload(false);
  };

  const getTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const redirectToHome = (success) => {
    if (data.success) {
      return <Redirect to="/" />;
    }
  };

  const total = Math.round((getTotal() + 5 + Number.EPSILON) * 100) / 100;

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
    console.log(data.address);
  };

  useEffect(() => {
    setItems(getCart());
    getToken(userId, token);
  }, []);

  let address = data.address;

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
            console.log(address);
            createOrder(userId, token, orderData);

            setData({ ...data, success: response.success });
            emptyCart(() => {
              setRun(!run);
              redirectToHome();
              console.log("Payment Success and Empty Cart");
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
          <div className="gorm-group mb-3">
            <label className="text-muted">Shipping Address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Enter Shipping Address"
            />
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
      <div class="container1">
        <div class="order">
          <h2>Your order summary</h2>

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

          <h4 class="ship">Shipping: $5</h4>
          <hr />
          <h3 class="total">TOTAL: ${total}</h3>
        </div>
      </div>

      <div class="container2">
        {redirectToHome(data.success)}
        {showError(data.error)}
        {showSuccess(data.success)}
        {showDropIn()}
      </div>
    </React.Fragment>
  );
};

export default CheckoutPage;

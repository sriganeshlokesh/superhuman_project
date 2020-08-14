import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./addToCartHelper";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import cart_empty from "../../assets/img/cart_empty.png";
import "../../App.css";

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div className="text-center">
        <h2>Your Shopping Cart</h2>
        {items.length > 1 ? (
          <h6>You have {`${items.length}`} Products in your cart</h6>
        ) : (
          <h6>You have {`${items.length}`} Product in your cart</h6>
        )}
        <hr />
        {items.map((product, i) => (
          <CartCard
            key={i}
            product={product}
            cartUpdate={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItems = () => {
    return (
      <div class="container-fluid mt-100">
        <div class="row text-center">
          <div class="col-12 ">
            <div class="card">
              <div class="card-body cart">
                <div class="col-sm-12 empty-cart-cls text-center">
                  {" "}
                  <img
                    src={cart_empty}
                    width="130"
                    height="130"
                    class="img-fluid mb-4 mr-3"
                    alt="empty_cart"
                  />
                  <h1>
                    <strong>Your Shopping Cart</strong>
                  </h1>
                  <h3>Your Bag is Currently Empty</h3>{" "}
                  <Link to="/" className="btn m-3">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const showCheckout = () => {
    return (
      <React.Fragment>
        <div className="col-md-4 px-2 custom-checkout-comp">
          <Checkout products={items} />
        </div>
      </React.Fragment>
    );
  };

  const showShopping = () => (
    <div className="col-12 continue-shopping">
      <Link to="/shop" className="btn pull-right mr-5">
        Continue Shopping
      </Link>
    </div>
  );
  return (
    <div className="container ">
      <div className="row ">
        {items.length > 0 ? (
          <div className="col-8">{showItems(items)}</div>
        ) : (
          <div className="col-12">{noItems()}</div>
        )}

        {items.length > 0 && showCheckout()}
        {items.length > 0 && showShopping()}
      </div>
    </div>
  );
};

export default ShoppingCart;

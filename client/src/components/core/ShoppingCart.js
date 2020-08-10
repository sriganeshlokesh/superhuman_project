import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./addToCartHelper";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import "../../App.css";

const ShoppingCart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
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
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body cart">
                <div class="col-sm-12 empty-cart-cls text-center">
                  {" "}
                  <img
                    src={process.env.PUBLIC_URL + "/img/cart_empty.png"}
                    width="130"
                    height="130"
                    class="img-fluid mb-4 mr-3"
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
      <div className="col-md-4 px-3 custom-checkout-comp">
        <Checkout products={items} />
      </div>
    );
  };
  return (
    <div className="container-fluid my-0">
      <div className="row ">
        <div className="col-12">
          {items.length > 0 ? showItems(items) : noItems()}
        </div>
        {items.length > 0 && showCheckout()}
      </div>
    </div>
  );
};

export default ShoppingCart;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./addToCartHelper";
import CartCard from "./CartCard";
import Checkout from "./Checkout";
import "../../shoppingCart.css";

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
        <h6>You have {`${items.length}`} Products in your cart</h6>
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
    return <h2>Your Cart is Currently Empty</h2>;
  };
  const showCheckout = () => {
    return (
      <div className="col-md-4 px-3 custom-checkout-comp">
        <Checkout products={items} />
      </div>
    );
  };
  return (
    <div className="container">
      <div className="row ">
        <div className="col-8">
          {items.length > 0 ? showItems(items) : noItems()}
        </div>
        {showCheckout()}
      </div>
    </div>
  );
};

export default ShoppingCart;

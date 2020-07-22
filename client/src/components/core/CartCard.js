import React, { useState } from "react";
import ProductImage from "./ProductImage";
import { addItem, updateItem, removeItem } from "./addToCartHelper";
import "../../shoppingCart.css";

const CartCard = ({
  product,
  cartUpdate = false,
  setRun = (f) => f,
  run = undefined,
  showQuantity = true,
  showRemove = true,
}) => {
  const [count, setCount] = useState(product.count);

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const total = count * product.price;
  console.log(total);

  const refreshComponent = () => {
    window.location.reload(false);
  };

  const removeButton = () => (
    <div className="col-2">
      <button
        className="custom-button"
        onClick={() => {
          refreshComponent();
          removeItem(product._id);
          setRun(!run); // run useEffect in parent Cart
        }}
      >
        <i className="fa fa-times fa-2x"></i>
      </button>
    </div>
  );

  const quantityField = () => (
    <div className="col-2">
      <h6>Quantity</h6>
      <hr />
      <input
        type="number"
        className="form-control"
        onChange={handleChange(product._id)}
        value={count}
      />
    </div>
  );

  return (
    <div className="container">
      <div className="row ">
        <div className="col-2 ">
          <ProductImage item={product} url="product" />
        </div>
        <div className="col-9 custom-card mb-4">
          <div className="row">
            <div className="col-4">
              <h6>{product.name}</h6>
              <h6></h6>
            </div>
            <div className="col-2">
              <h6>Unit Price</h6>
              <hr />
              <h6>${product.price}</h6>
            </div>

            {showQuantity && quantityField()}
            <div className="col-2">
              <h6>Item Total</h6>
              <hr />
              <h6>${total}</h6>
            </div>
            {showRemove && removeButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

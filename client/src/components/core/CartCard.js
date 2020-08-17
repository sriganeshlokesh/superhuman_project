import React, { useState } from "react";
import ProductImage from "./ProductImage";
import { updateItem, removeItem } from "./addToCartHelper";

const CartCard = ({
  product,
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
    <div className="container ">
      <div className="row ">
        <div className="col-2 ">
          <ProductImage item={product._id} url="product" />
        </div>
        <div className="col-9 custom-card mb-4 text-center">
          <div className="row mt-4">
            <div className="col-4">
              <h6>{product.name}</h6>
              <p>{product.selectedFlavour}</p>
            </div>
            <div className="col-2">
              <h6>Unit Price</h6>
              <hr />
              <h6>${product.price}</h6>
            </div>

            {showQuantity ? (
              quantityField()
            ) : (
              <React.Fragment>
                <div className="col-2">
                  <h6>Quantity</h6>
                  <hr />
                  <h6>{count}</h6>
                </div>
              </React.Fragment>
            )}
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

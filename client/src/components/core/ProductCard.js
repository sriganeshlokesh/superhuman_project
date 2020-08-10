import React, { useState } from "react";
import ProductImage from "./ProductImage";
import { Link, Redirect } from "react-router-dom";
import { addItem } from "./addToCartHelper";
import classnames from "classnames";
import { getCategory } from "./apiCore";
import "../../App.css";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  const [redirect, setRedirect] = useState(false);
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [errors, setErrors] = useState("");
  const [category, setCategory] = useState("");

  const addToCart = () => {
    if (selectedFlavour.length > 0) {
      addItem(product, selectedFlavour, () => {
        setRedirect(true);
      });
    } else {
      setErrors("Select Flavour");
    }
  };

  const productCategory = () => {
    getCategory(product.category._id).then((data) => {
      if (data.error) {
        setErrors(data.error);
      } else {
        setCategory(data.data.name);
      }
    });
  };

  const redirectToCart = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const handleFlavour = () => (event) => {
    setSelectedFlavour(event.target.value);
  };

  useEffect(() => {
    productCategory();
  }, []);

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <Link to={`/product/${product._id}`}>
          <ProductImage item={product._id} url="product" />
        </Link>

        <div className="card-body">
          {redirectToCart(redirect)}
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
          <p className="card-text">{product.description}</p>
          <div className="options d-flex flex-fill">
            <div className="price ">
              <h5 className="mt-2">${product.price}</h5>
            </div>
            <select
              className=""
              value={selectedFlavour}
              onChange={handleFlavour()}
              className={classnames("custom-select ml-1", {
                "is-invalid": errors,
              })}
            >
              <option value="" disabled selected>
                Choose Flavour
              </option>
              {product.flavour &&
                product.flavour.map((item, index) => (
                  <option key={index} value={item} style={{ color: "#273142" }}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="row ">
            <div className="col text-center">
              <div className="buy justify-content-between align-items-center ">
                <button onClick={addToCart} className="btn mt-3">
                  <i className="fa fa-shopping-cart"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

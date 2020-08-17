import React, { useState } from "react";
import ProductImage from "./ProductImage";
import { Link, Redirect } from "react-router-dom";
import { addItem } from "./addToCartHelper";
import classnames from "classnames";
import { getCategory } from "./apiCore";
import "../../App.css";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [errors, setErrors] = useState("");
  const [category, setCategory] = useState("");

  const addToCart = () => {
    if (selectedFlavour.length > 0) {
      addItem(product, selectedFlavour, () => {
        refreshPage();
      });
    } else {
      setErrors("Select Flavour");
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }
  const productCategory = () => {
    getCategory(product.category._id).then((data) => {
      if (data.error) {
        setErrors(data.error);
      } else {
        setCategory(data.data.name);
      }
    });
  };

  const handleFlavour = () => (event) => {
    setSelectedFlavour(event.target.value);
  };

  useEffect(() => {
    productCategory();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="col-sm-6 col-md-4 col-lg-4 mb-3">
      <div className="card">
        <div onClick={refreshPage}>
          <Link to={`/product/${product._id}`}>
            <div className="mx-auto">
              <ProductImage item={product._id} url="product" />
            </div>
          </Link>
        </div>

        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
          <div className="options d-flex flex-fill">
            <div className="price ">
              <h5 className="mt-2">${product.price}</h5>
            </div>
            <select
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
          <div className="row text-center">
            <div className="col-sm-12 col-md-10 col-lg-12">
              <div className="buy">
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

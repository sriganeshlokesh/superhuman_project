import React from "react";
import ProductImage from "./ProductImage";
import { Link } from "react-router-dom";
import "../../card.css";

const ProductCard = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <ProductImage item={product} url="product" />
        <div className="card-body">
          <h4 className="card-title">{product.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            Product: {product._id}
          </h6>
          <p className="card-text">{product.description}</p>
          <div className="options d-flex flex-fill">
            <div className="price ">
              <h5 className="mt-2">${product.price}</h5>
            </div>
            <select className="custom-select ml-1">
              <option value="" disabled selected>
                Flavour
              </option>
              {product.flavour &&
                product.flavour.map((item, index) => (
                  <option key={index} value={item} style={{ color: "#273142" }}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="buy d-flex justify-content-between align-items-center">
            <Link
              to={`/product/${product._id}`}
              className="btn btn-danger mt-3"
            >
              <i className="fa fa-th"></i> View Product
            </Link>
            <Link href="#" className="btn btn-danger mt-3">
              <i className="fa fa-shopping-cart"></i> Add to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

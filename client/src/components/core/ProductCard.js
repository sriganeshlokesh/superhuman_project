import React from "react";
import ProductImage from "./ProductImage";

const ProductCard = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div class="card">
        <ProductImage item={product} url="product" />
        <div class="card-body">
          <h4 class="card-title">{product.name}</h4>
          <h6 class="card-subtitle mb-2 text-muted">Style: {product._id}</h6>
          <p class="card-text">{product.description}</p>
          <div class="options d-flex flex-fill">
            <div class="price text-success">
              <h5 class="mt-2">${product.price}</h5>
            </div>
            <select class="custom-select ml-1">
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
          <div class="buy d-flex justify-content-between align-items-center">
            <a href="#" class="btn btn-danger mt-3">
              <i class="fa fa-th"></i> View Product
            </a>
            <a href="#" class="btn btn-danger mt-3">
              <i class="fa fa-shopping-cart"></i> Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

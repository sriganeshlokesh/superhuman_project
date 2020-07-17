import React, { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { getInfo, relatedProducts } from "./apiCore";
import { addItem } from "./addToCartHelper";
import moment from "moment";
import "../../productPage.css";

const ProductPage = ({ product, id }) => {
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [related, setRelated] = useState([]);

  const addToCart = () => {
    addItem(product, () => {});
  };

  const productInfo = (productId) => {
    getInfo(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setInfo(data);
        relatedProducts(id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelated(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    productInfo(id);
  }, []);

  return (
    <React.Fragment>
      <div className="row mt-2">
        <Link to="/shop" className="custom-back">
          Back to Products
        </Link>
      </div>
      <div className="row">
        <div className="col mb-4">
          <ProductImage item={product} url="product" height="100" />
        </div>
        <div className="custom-card col-8 mb-5">
          <h2 className="product-header">{product.name}</h2>
          <h6 className="product-description">{product.description}</h6>

          <h6 className="product-price">${product.price}</h6>
          <div className="row ml-0 mr-0 custom-info">
            <div className="col-4">
              <h6 className="text-white custom-product-info">PROTEIN</h6>
              <p className="text-white custom-product-content">
                {info.protein}g
              </p>
            </div>
            <div className="col-4">
              <h6 className="text-white custom-product-info">FAT</h6>
              <p className="text-white custom-product-content ">{info.fat}g</p>
            </div>
            <div className="col-4">
              <h6 className="text-white custom-product-info">SUGARS</h6>
              <p className="text-white custom-product-content">{info.sugar}g</p>
            </div>
          </div>
          <select className="custom-select mt-2">
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
          <div className="row mt-3">
            <div className="col-6">
              {product.quantity > 0 ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            <div className="col-6 added-time">
              <span>Added {moment(product.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <Link
                to="/cart"
                onClick={addToCart}
                className="custom-addcart btn mt-3"
              >
                <i className="fa fa-shopping-cart"></i> Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-align-center">
        <div className="col-12">
          <h2 className="header">Product Info</h2>
        </div>
      </div>
      <div className="row">
        <div class="col-12 col-md-6">
          <div class="projects mb-4">
            <div class="projects-inner">
              <header class="projects-header">
                <div class="title">Daily Consumption</div>
              </header>
              <table class="projects-table">
                <thead>
                  <tr>
                    <th>Content</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Protein</td>
                    <td>{info.protein}g</td>
                  </tr>
                  <tr>
                    <td>Fat</td>
                    <td>{info.fat}g</td>
                  </tr>
                  <tr>
                    <td>Sugar</td>
                    <td>{info.sugar}g</td>
                  </tr>
                  <tr>
                    <td>Cholestrol</td>
                    <td>{info.cholestrol}mg</td>
                  </tr>
                  <tr>
                    <td>Total Carbohydrate</td>
                    <td>{info.carbohydrate}g</td>
                  </tr>
                  <tr>
                    <td>Sodium</td>
                    <td>{info.sodium}g</td>
                  </tr>
                  <tr>
                    <td>Calcium</td>
                    <td>{info.calcium}mg</td>
                  </tr>
                  <tr>
                    <td>Potassium</td>
                    <td>{info.potassium}mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h2 className="header">Related Products</h2>
        </div>
      </div>

      <div className="row ml-0 mr-0">
        {related &&
          related.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </React.Fragment>
  );
};
export default ProductPage;

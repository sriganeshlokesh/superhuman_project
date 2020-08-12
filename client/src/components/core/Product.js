import React, { useState, useEffect } from "react";
import { getProduct } from "./apiCore";
import ProductPage from "./ProductPage";

const Product = (props) => {
  const [product, setProduct] = useState({});

  const productId = props.match.params.productId;

  const singleProduct = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    singleProduct(productId);
  }, [props]);

  return (
    <div className="container">
      <ProductPage item={product} id={productId} />
    </div>
  );
};

export default Product;

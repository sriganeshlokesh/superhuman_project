import React, { useState, useEffect } from "react";
import { getProduct } from "./apiCore";
import ProductPage from "./ProductPage";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const productId = props.match.params.productId;
  console.log(productId);

  const singleProduct = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
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
      <ProductPage product={product} id={productId} />
    </div>
  );
};

export default Product;

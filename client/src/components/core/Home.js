import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import "../../home.css";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    productSell();
    productArrival();
  }, []);

  const productSell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };
  const productArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError("");
      } else {
        setProductByArrival(data);
      }
    });
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <ProductSearch />

        <h2 className="mb-4 header">Best Sellers</h2>
        <div className="row">
          {productBySell.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
        <h2 className="mb-4 header">New Arrivals</h2>
        <div className="row">
          {productByArrival.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

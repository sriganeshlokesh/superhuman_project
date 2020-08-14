import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./apiCore";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import home from "../../assets/img/home.jpg";
import "../../App.css";
const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);

  useEffect(() => {
    productSell();
    productArrival();
  }, []);

  const productSell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };
  const productArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  return (
    <React.Fragment>
      <div className="container-fluid mt-5">
        <ProductSearch />

        <div className="container-fluid landing-page">
          <img
            src={home}
            alt="Snow"
            style={{
              width: "100%",
              height: "600px",
              opacity: "90%",
            }}
          />
          <div className="centered">
            <h1>Welcome To Superhuman Project</h1>
            <h4 className="mt-3">One Stop Shop for Gym Supplements</h4>
            <Link to="/shop" className="btn">
              Shop Now
            </Link>
          </div>
        </div>

        <h2 className="mb-4 header">Best Sellers</h2>
        <div className="row mx-auto">
          {productBySell.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
        <h2 className="mb-4 header">New Arrivals</h2>
        <div className="row mx-auto text-center">
          {productByArrival.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

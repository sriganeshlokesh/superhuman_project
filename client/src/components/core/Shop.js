import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getCategories, getFilterProduct } from "./apiCore";
import ProductCard from "./ProductCard";
import CategoryCheckBox from "./CategoryCheckBox";
import PriceRadioBox from "./PriceRadioBox";
import { prices } from "./FixedPrices";
import ProductSearch from "./ProductSearch";
import "../../home.css";
import { filter } from "lodash";

const Shop = () => {
  const [productFilters, setProductFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilters(skip, limit, productFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...productFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceRange = handlePrice(filters);
      newFilters.filters[filterBy] = priceRange;
    }
    loadFilters(productFilters.filters);
    setProductFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const loadFilters = (newFilters) => {
    getFilterProduct(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilterProduct(toSkip, limit, productFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load More Products
        </button>
      )
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-3">
            <h4>Filter By Category </h4>
            <ul>
              <CategoryCheckBox
                categories={categories}
                filters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
            <h4>Filter By Price </h4>
            <div>
              <PriceRadioBox
                prices={prices}
                filters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>
          <div className="col-10">
            <h2 className="mb-4"> Products</h2>
            <div className="row">
              {filteredResults.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <hr />
            {loadMoreButton()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Shop;

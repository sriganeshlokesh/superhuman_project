import React, { useState, useEffect } from "react";
import { getCategories, getFilterProduct } from "./apiCore";
import ProductCard from "./ProductCard";
import CategoryCheckBox from "./CategoryCheckBox";
import PriceRadioBox from "./PriceRadioBox";
import { prices } from "./FixedPrices";

const Shop = () => {
  const [productFilters, setProductFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilters(productFilters.filters);
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

  const loadFilters = (skip, limit, newFilters) => {
    getFilterProduct(skip, limit, newFilters).then((data) => {
      if (data.error) {
        console.log(data.error);
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
        console.log(data.error);
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
        <div className="row text-center">
          <div className="col-12">
            <button onClick={loadMore} className="btn load-more-custom  mb-5">
              Load More Products
            </button>
          </div>
        </div>
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
          <div className="col-10 my-0">
            <h2 className="mb-4 header"> Products</h2>
            <div className="row">
              {filteredResults.length > 0 ? (
                filteredResults.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              ) : (
                <h2 className="mx-auto">Products not found</h2>
              )}
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

import React, { useState, useEffect } from "react";
import { getProducts, getCategories, searchProduct } from "./apiCore";
import ProductCard from "./ProductCard";

const ProductSearch = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    result: [],
    searched: false,
  });

  const { categories, category, search, result, searched } = data;

  const allCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    allCategories();
  }, []);

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchData = () => {
    console.log(search, category);
    if (search) {
      searchProduct({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, result: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 1) {
      return `Found ${results.length} Products`;
    }
    if (searched && results.length === 1) {
      return `Found ${results.length} Product`;
    }
    if (searched && results.length < 1) {
      return `No Products Found`;
    }
  };

  const searchedProducts = (results = []) => (
    <div>
      <h2 className="mt-4 mb-4">{searchMessage(searched, result)}</h2>
      <div className="row">
        {results.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All" disabled selected>
                All
              </option>
              {categories &&
                categories.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search Products"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(result)}</div>
    </div>
  );
};

export default ProductSearch;

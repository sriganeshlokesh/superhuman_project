import React, { useState, useEffect } from "react";
import { getCategories, searchProduct } from "./apiCore";
import ProductCard from "./ProductCard";
import "../../App.css";

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
        console.log(data.error);
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
      return `Found ${results.length} Products for " ${search} "`;
    }
    if (searched && results.length === 1) {
      return `Found ${results.length} Product for " ${search} "`;
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

  const searchform = () => (
    <div class="input-group">
      <div class="input-group-btn search-panel">
        <select className="btn mr-2" onChange={handleChange("category")}>
          <option value="All">All</option>
          {categories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <input type="hidden" name="search_param" value="all" id="search_param" />
      <input
        type="search"
        className="form-control-lg mt-0"
        name="search"
        id="search"
        onChange={handleChange("search")}
        placeholder="Search Products"
      />
      <span class="input-group-btn">
        <button class="button" onClick={searchSubmit}>
          Search
        </button>
      </span>
    </div>
  );

  return (
    <div className="row ml-5">
      <div className="container-fluid ml-5">{searchform()}</div>
      <div className="container-fluid">{searchedProducts(result)}</div>
    </div>
  );
};

export default ProductSearch;

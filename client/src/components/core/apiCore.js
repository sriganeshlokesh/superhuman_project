import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(
    `${process.env.REACT_APP_API}/product/products?sortBy=${sortBy}&order=desc&limit=6`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_API}/category/all/category`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getFilterProduct = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${process.env.REACT_APP_API}/product/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const searchProduct = (params) => {
  const query = queryString.stringify(params);
  console.log(query);
  return fetch(`${process.env.REACT_APP_API}/product/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

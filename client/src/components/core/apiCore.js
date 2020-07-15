exports.getProducts = (sortBy) => {
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

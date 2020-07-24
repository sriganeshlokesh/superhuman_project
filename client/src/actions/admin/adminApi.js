import axios from "axios";

export const createCategory = (userId, token, category) => {
  return fetch(`${process.env.REACT_APP_API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  return fetch(`${process.env.REACT_APP_API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
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

export const getOrders = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/order/status/${userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  // return fetch(
  //   `${process.env.REACT_APP_API}/order/${orderId}/status/${userId}`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       Authorization: token,
  //     },
  //     body: JSON.stringify({ status, orderId }),
  //   }
  // )
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .catch((err) => console.log(err));

  return axios({
    method: "put",
    url: `${process.env.REACT_APP_API}/order/${orderId}/status/${userId}`,
    headers: { Authorization: token },
    data: {
      status: status,
      orderId: orderId,
    },
  });
};

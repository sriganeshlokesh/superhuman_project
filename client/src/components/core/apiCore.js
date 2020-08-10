import queryString from "query-string";
import axios from "axios";

export const getProfile = (userId, token) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/user/${userId}`,
    headers: { Authorization: token },
  });
};

export const getPhoto = (userId) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/user/photo/${userId}`,
  });
};

export const updateProfile = (userId, token, user) => {
  return axios({
    method: "put",
    url: `${process.env.REACT_APP_API}/user/${userId}`,
    headers: { Authorization: token, "Content-Type": "multipart/form-data" },
    data: user,
  });
};

export const getUserHistory = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/user/order/${userId}`, {
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

export const getProduct = (productId) => {
  return fetch(`${process.env.REACT_APP_API}/product/read/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getInfo = (productId) => {
  return fetch(`${process.env.REACT_APP_API}/product/info/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const relatedProducts = (productId) => {
  return fetch(`${process.env.REACT_APP_API}/product/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Braintree

export const getBraintreeToken = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API}/braintree/getToken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, payment) => {
  return fetch(`${process.env.REACT_APP_API}/braintree/payment/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(payment),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Orders
export const createOrder = (userId, token, orderData) => {
  return fetch(`${process.env.REACT_APP_API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Add Like to Product
export const addLike = (userId, productId, token) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/product/like/${productId}/${userId}`,
    headers: { Authorization: token },
  });
};

// Unlike Product
export const unLike = (userId, productId, token) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/product/unlike/${productId}/${userId}`,
    headers: { Authorization: token },
  });
};

// Dislike Product
export const disLike = (userId, productId, token) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/product/dislike/${productId}/${userId}`,
    headers: { Authorization: token },
  });
};

// Unlike Dislike Product
export const undislike = (userId, productId, token) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/product/dislike/unlike/${productId}/${userId}`,
    headers: { Authorization: token },
  });
};

// Get comments
export const getComments = (productId) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/product/comment/${productId}`,
  });
};

// Add Comment
export const addComment = (userId, productId, token, comment) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_API}/product/comment/${productId}/${userId}`,
    headers: { Authorization: token },
    data: { text: comment },
  });
};

// Delete Comment
export const deleteComment = (userId, productId, commentId, token) => {
  return axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}/product/comment/${productId}/${commentId}/${userId}`,
    headers: { Authorization: token },
  });
};

// Get Category
export const getCategory = (categoryId) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_API}/category/${categoryId}`,
  });
};

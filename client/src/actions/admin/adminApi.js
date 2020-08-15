import axios from "axios";

export const createCategory = (userId, token, category) => {
  return fetch(`/api/category/create/${userId}`, {
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
  return fetch(`/api/product/create/${userId}`, {
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
  return fetch(`/api/category/all/category`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrders = (userId, token) => {
  return fetch(`/api/order/list/${userId}`, {
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
  return fetch(`/api/order/status/${userId}`, {
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
  return axios({
    method: "put",
    url: `/api/order/${orderId}/status/${userId}`,
    headers: { Authorization: token },
    data: {
      status: status,
      orderId: orderId,
    },
  });
};

// Product CRUD operations

export const getProducts = () => {
  return fetch(`/api/product/products?limit=undefined`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
  return fetch(`/api/product/${productId}/${userId}`, {
    method: "DELETE",
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

export const getProduct = (productId) => {
  return fetch(`/api/product/read/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
  console.log(product);
  return axios({
    method: "put",
    url: `/api/product/${productId}/${userId}`,
    headers: { Authorization: token },
    data: product,
  });
};

export const addInfo = (userId, productId, token, info) => {
  return axios({
    method: "post",
    url: `/api/product/info/${userId}/${productId}`,
    headers: { Authorization: token },
    data: info,
  });
};

export const editInfo = (userId, productId, token, info) => {
  return axios({
    method: "put",
    url: `/api/product/info/${productId}/${userId}`,
    headers: { Authorization: token },
    data: info,
  });
};

export const deleteOrder = (orderId, userId, token) => {
  return fetch(`/api/order/${orderId}/${userId}`, {
    method: "DELETE",
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

// get All Users
export const getAllUsers = (userId, token) => {
  return fetch(`/api/user/all/${userId}`, {
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

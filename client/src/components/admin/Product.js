import React, { useState, useEffect } from "react";
import AdminNavbar from "../user/AdminNavbar";
import { isAuthenticated } from "../../actions/auth";
import {
  createProduct,
  getCategories,
  getProducts,
  deleteProduct,
} from "../../actions/admin/adminApi";
import { Link } from "react-router-dom";
import moment from "moment";
import "../../App.css";

const Product = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    company: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    flavour: "",
    photo: "",
    quantity: "",
    formData: "",
  });
  const [products, setProducts] = useState([]);

  const {
    name,
    description,
    company,
    price,
    categories,
    category,
    shipping,
    flavour,
    quantity,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const allProducts = () => {
    getProducts(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    init();
    allProducts();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({
      ...values,
      errors: false,
      [name]: value,
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    setValues({ ...values, errors: "" });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          company: "",
          flavour: "",
          photo: null,
          quantity: "",
          category: "",
          createdProduct: data.name,
        });
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        allProducts();
      }
    });
  };

  const productForm = () => (
    <React.Fragment>
      <div class="container-fluid mt-0">
        <div class="row">
          <AdminNavbar />
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
            <div class="chart-data">
              <div class="row add-product">
                <div class="col-8">
                  <div class="card-body align-items-center ">
                    <h5 class="card-title text-center header">Add Product</h5>
                    <form class="form-product" onSubmit={addProduct}>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputName"
                          name="name"
                          value={name}
                          placeholder="Product Name"
                          className="form-control"
                          onChange={handleChange("name")}
                          required
                        />

                        <label for="inputName">Name</label>
                      </div>
                      <div class="form-label-group">
                        <textarea
                          type="text"
                          id="inputDesc"
                          name="description"
                          value={description}
                          placeholder="Product Desc"
                          className="form-control"
                          onChange={handleChange("description")}
                          required
                        />

                        <label for="inputDesc">Description</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="number"
                          id="inputPrice"
                          name="price"
                          value={price}
                          placeholder="Product Price"
                          className="form-control"
                          onChange={handleChange("price")}
                          required
                        />

                        <label for="inputPrice">Price</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputCompany"
                          name="company"
                          value={company}
                          placeholder="Product Company"
                          className="form-control"
                          onChange={handleChange("company")}
                          required
                        />

                        <label for="inputCompany">Company</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="number"
                          id="inputQuantity"
                          name="quantity"
                          value={quantity}
                          placeholder="Product Quantity"
                          className="form-control"
                          onChange={handleChange("quantity")}
                          required
                        />

                        <label for="inputQuantity">Quantity</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputFlavour"
                          name="flavour"
                          value={flavour}
                          placeholder="Product Flavour"
                          className="form-control"
                          onChange={handleChange("flavour")}
                          required
                        />
                        <label for="inputFlavour">Flavour</label>
                      </div>
                      <div class="form-label-group">
                        <select
                          id="inputEmail"
                          name="category"
                          value={category}
                          className="custom-select form-control"
                          placeholder="Category Name"
                          onChange={handleChange("category")}
                        >
                          <option value="" disabled selected>
                            Category
                          </option>
                          {categories &&
                            categories.map((item, index) => (
                              <option key={index} value={item._id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div class="form-label-group">
                        <select
                          id="inputShipping"
                          name="shipping"
                          value={shipping}
                          placeholder="Category Name"
                          className="custom-select form-control"
                          onChange={handleChange("shipping")}
                          required
                        >
                          <option value="" disabled selected>
                            Shipping
                          </option>
                          <option value="1">Yes</option>

                          <option value="0">No</option>
                        </select>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="file"
                          id="photo"
                          name="photo"
                          accept="image/*"
                          placeholder="Category Name"
                          className="form-control"
                          onChange={handleChange("photo")}
                          required
                        />

                        <label for="photo">Upload Image</label>
                      </div>

                      <button className="btn text-uppercase" type="submit">
                        Add Product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 text-center">
              <div class="projects mb-4">
                <div class="projects-inner">
                  <header class="projects-header">
                    <div>Products | {products.length} Products</div>
                  </header>
                  <table class="projects-table">
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <p>{product._id}</p>
                        </td>
                        <td>
                          <p>{product.name}</p>
                        </td>
                        <td>
                          <p>{moment(product.createdAt).fromNow()}</p>
                        </td>

                        <td>
                          {JSON.stringify(product.info) === undefined ? (
                            <Link
                              className="btn btn-secondary"
                              to={`/admin/dashboard/info/${product._id}`}
                            >
                              Add Info
                            </Link>
                          ) : (
                            <Link
                              className="btn btn-secondary"
                              to={`/admin/dashboard/edit/info/${product._id}`}
                            >
                              Edit Info
                            </Link>
                          )}
                          <Link
                            to={`/admin/dashboard/edit/${product._id}`}
                            className="btn btn-secondary"
                          >
                            Update
                          </Link>

                          <Link
                            className="btn btn-danger"
                            onClick={() => destroy(product._id)}
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );

  return <div>{productForm()}</div>;
};

export default Product;

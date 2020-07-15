import React, { useState, useEffect } from "react";
import AdminNavbar from "../user/AdminNavbar";
import { isAuthenticated } from "../../actions/auth";
import { createProduct, getCategories } from "../../actions/admin/adminApi";
import { Link } from "react-router-dom";
import "../user/login.css";

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
    errors: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

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
    errors,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
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

  const productForm = () => (
    <React.Fragment>
      <div class="container-fluid">
        <div class="row">
          <AdminNavbar />
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
            <div class="chart-data">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="card-body align-items-center ">
                    <h5 class="card-title text-center">Add Product</h5>
                    <form class="form-signin" onSubmit={addProduct}>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputName"
                          name="name"
                          value={name}
                          placeholder="Product Name"
                          className="form-control-lg"
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
                          className="form-control-lg"
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
                          className="form-control-lg"
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
                          className="form-control-lg"
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
                          className="form-control-lg"
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
                          className="form-control-lg"
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
                          className="custom-select form-control-lg"
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
                          className="custom-select form-control-lg"
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
                          className="form-control-lg"
                          onChange={handleChange("photo")}
                          required
                        />

                        <label for="photo">Upload Image</label>
                      </div>

                      <input
                        class="btn btn-lg btn-block text-uppercase"
                        type="submit"
                        value="Add Product"
                      />
                    </form>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="projects mb-4">
                    <div class="projects-inner">
                      <header class="projects-header">
                        <div class="title">Category List</div>
                        <div class="count">| 4 Categories</div>
                      </header>
                      <table class="projects-table">
                        <thead>
                          <tr>
                            <th>Category ID</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        <tr>
                          <td>
                            <p>Category ID</p>
                          </td>
                          <td>
                            <p>Protein</p>
                          </td>

                          <td>
                            <button className="btn btn-secondary">
                              Add Info
                            </button>
                            <button className="btn btn-secondary">
                              Update
                            </button>
                            <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
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

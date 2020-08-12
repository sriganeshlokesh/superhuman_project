import React, { useState, useEffect } from "react";
import {
  getProduct,
  getCategories,
  updateProduct,
} from "../../actions/admin/adminApi";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    company: "",
    price: "",
    category: "",
    shipping: "",
    flavour: [],
    photo: "",
    categories: [],
    quantity: "",
    errors: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const [categories, setCategories] = useState([]);

  const {
    name,
    description,
    company,
    price,
    category,
    shipping,
    flavour,
    quantity,
    formData,
  } = values;

  const { user, token } = isAuthenticated();

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          shipping: data.shipping,
          company: data.company,
          flavour: data.flavour,
          quantity: data.quantity,
          formData: new FormData(),
        });
        // load categories
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    init(match.params.productId);
  }, []);

  const editProduct = (event) => {
    event.preventDefault();
    console.log(formData);
    setValues({ ...values, error: "" });
    updateProduct(match.params.productId, user._id, token, formData).then(
      () => {
        setValues({
          ...values,
          redirectToProfile: true,
        });
      }
    );
  };

  return (
    <React.Fragment>
      <div class="container-fluid mt-0">
        <div class="row">
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
            <div class="chart-data">
              <Link to="/admin/dashboard/product" className="btn btn-secondary">
                Go to Products
              </Link>
              <div class="row">
                <div class="col-12">
                  <div class="card-body align-items-center ">
                    <h5 class="card-title text-center">Update Product</h5>
                    <form class="form-signin" onSubmit={editProduct}>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputName"
                          name="name"
                          value={name}
                          placeholder="Product Name"
                          className="form-control-lg"
                          onChange={handleChange("name")}
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
                          onChange={(event) => {
                            formData.set(
                              "flavour",
                              event.target.value.split(",")
                            );
                            setValues({
                              ...values,
                              flavour: event.target.value.split(","),
                            });
                          }}
                        />
                        <label for="inputFlavour">Flavour</label>
                      </div>
                      <div class="form-label-group">
                        <select
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
                        />

                        <label for="photo">Update Image</label>
                      </div>

                      <input
                        class="btn btn-lg btn-block text-uppercase"
                        type="submit"
                        value="Update Product"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateProduct;

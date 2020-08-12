import React, { useState } from "react";
import AdminNavbar from "../user/AdminNavbar";
import { isAuthenticated } from "../../actions/auth";
import { createCategory, getCategories } from "../../actions/admin/adminApi";
import { useEffect } from "react";

const Category = () => {
  const [values, setValues] = useState({
    name: "",
    categories: [],
    error: "",
  });

  const { user, token } = isAuthenticated();
  const { name, categories } = values;

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
          error: "",
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, error: false, [e.target.name]: e.target.value });
  };

  const addCategory = (e) => {
    setValues({ ...values, error: false });
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          error: "",
        });
      }
    });
  };

  const categoryLayout = () => (
    <React.Fragment>
      <div class="container-fluid mt-0">
        <div class="row">
          <AdminNavbar />
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
            <div class="chart-data">
              <div class="row">
                <div class="col-12 col-md-6">
                  <div class="card-body align-items-center ">
                    <h5 class="card-title text-center">Add Category</h5>
                    <form class="form-signin" noValidate onSubmit={addCategory}>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="inputEmail"
                          name="name"
                          value={name}
                          placeholder="Category Name"
                          className="form-control-lg"
                          onChange={handleChange}
                          required
                        />

                        <label for="inputEmail">Category Name</label>
                      </div>

                      <input
                        class="btn btn-lg btn-block text-uppercase"
                        type="submit"
                        value="Add Category"
                      />
                    </form>
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <div class="projects mb-4">
                    <div class="projects-inner">
                      <header class="projects-header">
                        <div class="title">Category List</div>
                        <div class="count">
                          | {categories.length} Categories
                        </div>
                      </header>
                      <table class="projects-table">
                        <thead>
                          <tr>
                            <th>Category ID</th>
                            <th>Category</th>
                            <th>Actions</th>
                          </tr>
                        </thead>

                        {categories &&
                          categories.map((item, index) => (
                            <React.Fragment>
                              <tr>
                                <td key={index}>
                                  <p>{item._id}</p>
                                </td>
                                <td>
                                  <p>{item.name}</p>
                                </td>
                                <td>
                                  <button
                                    key={index}
                                    className="btn btn-secondary"
                                  >
                                    Update
                                  </button>
                                  <button
                                    key={index}
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
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
  return <div>{categoryLayout()}</div>;
};

export default Category;

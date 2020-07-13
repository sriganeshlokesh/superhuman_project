import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import classnames from "classnames";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: "",
    success: false,
  });

  const { name, email, password, password2, errors } = input;

  const handleChange = (name) => (event) => {
    setInput({ ...input, errors: false, [name]: event.target.value });
  };

  const registerUser = (event) => {
    event.preventDefault();
    console.log({ name, email, password, password2 });
    register({ name, email, password, password2 });
  };

  async function register(user) {
    await axios
      .post(`${process.env.REACT_APP_API}/auth/register`, user)
      .then((res) => {
        setInput({
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: "",
          success: true,
        });
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        setInput({ ...input, errors: err.response.data });
      });
    console.log(input);
  }

  const registerForm = () => (
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-xl-9 mx-auto my-auto">
          <div class="card card-signin flex-row my-5">
            <div class="card-img-left d-none d-md-flex"></div>
            <div class="card-body">
              <h5 class="card-title text-center">Register</h5>
              <form noValidate class="form-signin" onSubmit={registerUser}>
                <div class="form-label-group">
                  <input
                    type="text"
                    id="inputUsername"
                    name="name"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Username"
                    onChange={handleChange("name")}
                    value={name}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                  <label for="inputUsername">Username</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange("email")}
                    value={email}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange("password")}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  <label for="inputPassword">Password</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    id="inputConfirmPassword"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={handleChange("password2")}
                    value={password2}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                  />
                  <label for="inputConfirmPassword">Confirm Password</label>
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>

                <input
                  class="btn btn-lg btn-button btn-block text-uppercase"
                  type="submit"
                  value="Register"
                />
                <Link class="d-block text-center mt-2" to="/login">
                  Sign In
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{registerForm()}</div>;
};

export default Register;

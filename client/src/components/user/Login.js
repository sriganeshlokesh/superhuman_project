import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./login.css";
import axios from "axios";
import classnames from "classnames";
import { authenticate, isAuthenticated } from "../../actions/auth";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    errors: "",
    redirect: false,
  });

  const { email, password, errors, redirect } = input;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setInput({ ...input, errors: false, [name]: event.target.value });
  };

  const loginUser = (event) => {
    event.preventDefault();
    console.log({ email, password });
    login({ email, password });
  };

  async function login(user) {
    await axios
      .post(`${process.env.REACT_APP_API}/auth/login`, user)
      .then((res) => {
        console.log(res.data);
        authenticate(res.data, () => {
          setInput({
            ...input,
            redirect: true,
          });
        });
      })
      .catch((err) => {
        setInput({ ...input, errors: err.response.data });
      });
  }

  const redirectUser = () => {
    if (redirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loginForm = () => (
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-10 col-xl-9 mx-auto mt-4">
          <div class="card card-signin flex-row my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Login</h5>
              <form class="form-signin" noValidate onSubmit={loginUser}>
                <div class="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    placeholder="Email address"
                    value={email}
                    onChange={handleChange("email")}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    required
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
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    value={password}
                    onChange={handleChange("password")}
                    placeholder="Password"
                    required
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                  <label for="inputPassword">Password</label>
                </div>
                <input
                  class="btn btn-lg btn-block text-uppercase"
                  type="submit"
                />
                <Link class="d-block text-center mt-2 " to="/register">
                  Register
                </Link>
              </form>
            </div>
            <div class="card-img-right d-none d-md-flex"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {loginForm()}
      {redirectUser()}
    </div>
  );
};

export default Login;

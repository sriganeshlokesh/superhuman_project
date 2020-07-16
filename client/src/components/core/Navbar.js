import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../../App.css";
import { logout, isAuthenticated } from "../../actions/auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#EF8354" };
  } else {
    return { color: "#fff" };
  }
};

const Navbar = (props) => {
  const { history } = props;
  return (
    <React.Fragment>
      <nav class="navbar  navbar-expand-lg nav-tabs scrolling-navbar">
        <Link class="navbar-brand" to="/">
          <strong>Super Human </strong>
        </Link>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <Link class="nav-link" to="/" style={isActive(history, "/")}>
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                to="/shop"
                style={isActive(history, "/shop ")}
              >
                Products
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav nav-flex-icons">
            {!isAuthenticated() && (
              <React.Fragment>
                <li class="nav-item">
                  <Link
                    class="nav-link"
                    to="/register"
                    style={isActive(history, "/register")}
                  >
                    <i class="fa fa-user-plus fa-2x"></i>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link"
                    to="/login"
                    style={isActive(history, "/login")}
                  >
                    <i class="fa fa-user-circle-o fa-2x"></i>
                  </Link>
                </li>
              </React.Fragment>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to="/admin/dashboard"
                  style={isActive(history, "/admin/dashboard")}
                >
                  <i class="fa fa-user-circle fa-2x"></i>
                </Link>
              </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to="/user/dashboard"
                  style={isActive(history, "/user/dashboard")}
                >
                  <i class="fa fa-user-circle fa-2x"></i>
                </Link>
              </li>
            )}
            {isAuthenticated() && (
              <React.Fragment>
                <li class="nav-item">
                  <span
                    class="nav-link"
                    to="/"
                    onClick={() =>
                      logout(() => {
                        history.push("/");
                      })
                    }
                  >
                    <i class="fa fa-sign-out fa-2x"></i>
                  </span>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Navbar);

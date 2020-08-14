import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../../App.css";
import { logout, isAuthenticated } from "../../actions/auth";
import { itemTotal } from "../core/addToCartHelper";
import logo from "../../assets/img/logo.png";

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
      <nav
        class="navbar navbar-expand-lg navbar-inverse scrolling-navbar"
        role="navigation"
      >
        <div className="container-fluid">
          <Link class="navbar-brand" to="/">
            <img src={logo} alt="logo" />
          </Link>

          <div className="navbar-header">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navContent"
            >
              <span class="navbar-toggler-icon">
                <i class="fa fa-bars" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navContent">
            <ul class="navbar-nav nav mr-auto">
              <li class="nav-item">
                <Link class="nav-link" to="/" style={isActive(history, "/")}>
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to="/shop"
                  style={isActive(history, "/shop")}
                >
                  Products
                </Link>
              </li>
            </ul>
            <ul class="navbar-nav nav-flex-icons">
              <li class="nav-item">
                <Link
                  class="nav-link"
                  to="/cart"
                  style={isActive(history, "/cart")}
                >
                  <i class="fa fa-shopping-cart fa-2x badge-wrapper">
                    {itemTotal() > 0 && (
                      <span className="badge badge-secondary" id="lblCartCount">
                        {itemTotal()}
                      </span>
                    )}
                  </i>
                </Link>
              </li>
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
        </div>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Navbar);

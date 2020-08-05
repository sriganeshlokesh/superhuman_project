import React from "react";
import { Link, withRouter } from "react-router-dom";

const AdminNavbar = (props) => {
  const { history } = props;
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#EF8354" };
    } else {
      return { color: "#fff" };
    }
  };
  const navbar = () => (
    <nav class="col-md-2 d-none d-md-block sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              <i class="fa fa-tachometer fa-fw"></i>
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/admin/dashboard/order"
              style={isActive(history, "/admin/dashboard/order")}
            >
              <i class="fa fa-truck fa-fw"></i>
              Orders
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/admin/dashboard/product"
              style={isActive(history, "/admin/dashboard/product")}
            >
              <i class="fa fa-database fa-fw"></i>
              Products
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link"
              to="/admin/dashboard/category"
              style={isActive(history, "/admin/dashboard/category")}
            >
              <i class="fa fa-th fa-fw"></i>
              Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

  return <React.Fragment>{navbar()}</React.Fragment>;
};

export default withRouter(AdminNavbar);

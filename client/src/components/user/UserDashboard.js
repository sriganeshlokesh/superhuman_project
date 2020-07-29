import React, { useState } from "react";
import { isAuthenticated } from "../../actions/auth";
import { getUserHistory, getProfile } from "../core/apiCore";
import { Link } from "react-router-dom";
import "../../dashboard.css";
import { useEffect } from "react";
import moment from "moment";

const UserDashboard = () => {
  const { user, token } = isAuthenticated();
  const [purchase, setPurchase] = useState([]);
  const [profile, setProfile] = useState({});

  const getPurchaseHistory = () => {
    getUserHistory(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPurchase(data);
      }
    });
  };

  const getUser = () => {
    getProfile(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.data);
        setProfile(data.data);
      }
    });
  };

  useEffect(() => {
    getPurchaseHistory();
    getUser();
  }, []);

  const dashboardLayout = () => (
    <React.Fragment>
      <div className="cover"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md" id="left">
            <div class="card" id="user">
              <div class="card-header">Profile ID: {profile._id}</div>
              <img
                id="userImage"
                src={`${process.env.REACT_APP_API}/user/photo/${user._id}`}
              />
              <div class="card-block">
                <h4 class="card-title">Welcome, {profile.name}</h4>
                <div class="row">
                  <div class="col"></div>
                </div>
                <div class="row mt-2">
                  <div class="col-1">
                    <i class="fa fa-map-marker"></i>
                  </div>
                  <div class="col">
                    <strong>Country:</strong>
                    <br />
                    {profile.country}
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-1">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="col">+1 {profile.phone}</div>
                </div>
                <div class="row mt-2">
                  <div class="col-1">
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div class="col">{profile.email}</div>
                </div>
                <div class="row mt-2">
                  <div class="col">Joined: 05/10/2010</div>
                </div>
                <div class="row">
                  <div class="col">Expires: 07/12/2015</div>
                </div>
                <div class="mt-3">
                  <Link to={`/user/dashboard/profile/${profile._id}`}>
                    <button class="btn btn-primary mx-auto" id="renew">
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="row">
              <div class="col">
                <div class="card" id="recentActivity">
                  <div class="card-header">
                    Purchase History
                    <a class="action" href="#">
                      All Activity
                    </a>
                  </div>
                  <ul class="list-group">
                    {purchase.map((order, index) => (
                      <li class="list-group-item">
                        <div class="row no-gutters">
                          <div class="col">
                            <div class="row no-gutters align-content-center">
                              <div>
                                <span class="fa-stack fa-lg">
                                  <i class="fa fa-truck fa-fw"></i>
                                </span>
                              </div>
                              <div class="col">
                                <p>Transaction ID: {order.transaction_id}</p>
                                <p>Price: {order.amount}</p>
                              </div>
                            </div>
                          </div>
                          <div class="col right">
                            <div class="row no-gutters justify-content-center align-items-center">
                              <div class="view">
                                <p>{order.status}</p>
                              </div>
                              <div class="text-center">
                                {moment(order.createdAt).fromNow()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );

  return <div>{dashboardLayout()}</div>;
};

export default UserDashboard;

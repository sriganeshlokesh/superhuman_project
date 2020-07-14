import React from "react";
import { isAuthenticated } from "../../actions/auth";
import "../../dashboard.css";

const UserDashboard = () => {
  const {
    user: { _id, name, email },
  } = isAuthenticated();

  const dashboardLayout = () => (
    <React.Fragment>
      <div className="cover"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md" id="left">
            <div class="card" id="user">
              <div class="card-header">Profile ID: {_id}</div>
              <img id="userImage" />
              <div class="card-block">
                <h4 class="card-title">Welcome, {name}</h4>
                <div class="row">
                  <div class="col"></div>
                </div>
                <div class="row mt-2">
                  <div class="col-1">
                    <i class="fa fa-map-marker"></i>
                  </div>
                  <div class="col">
                    <strong>Primary Chapter:</strong>
                    <br />
                    Chicago, IL
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-1">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="col">+1 (555) 555-5555</div>
                </div>
                <div class="row mt-2">
                  <div class="col-1">
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div class="col">{email}</div>
                </div>
                <div class="row mt-2">
                  <div class="col">Joined: 05/10/2010</div>
                </div>
                <div class="row">
                  <div class="col">Expires: 07/12/2015</div>
                </div>
                <div class="mt-3">
                  <button class="btn btn-primary mx-auto" id="renew">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            <div class="card" id="connections">
              <div class="card-header">
                <div class="label">Connections</div>
                <a class="action" href="#">
                  Find
                </a>
              </div>
              <div class="list d-flex justify-content-between flex-wrap">
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
                <img class="list-item" />
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="row mt-4">
              <div class="col-lg-6">
                <div class="card" id="upcomingEvents">
                  <div class="card-header">
                    Upcoming Events
                    <a class="action" href="#">
                      All Upcoming
                    </a>
                  </div>
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">
                          <div class="row">
                            <div class="col">
                              Greater Atlanta Chamber of Commerce 2015
                            </div>
                          </div>
                          <div class="row">
                            <div class="col small">March 15th, 2015</div>
                          </div>
                        </div>
                        <div class="col view">
                          <button class="btn btn-primary">View</button>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">
                          <div class="row">
                            <div class="col">
                              Wednesday Potluck Dinner, Chicago Chapter
                            </div>
                          </div>
                          <div class="row">
                            <div class="col small">March 15th, 2015</div>
                          </div>
                        </div>
                        <div class="col view">
                          <button class="btn btn-primary">View</button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="card" id="goals">
                  <div class="card-header">
                    Goals
                    <a class="action" href="#">
                      Set New Goal
                    </a>
                  </div>
                  <ul class="list-group">
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">March 2015 Donations</div>
                        <div class="col text-right">$300.00</div>
                      </div>
                      <div class="row my-2">
                        <div class="col">
                          <div class="progress">
                            <div
                              class="progress-bar"
                              style={{ width: "63%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="row no-gutters">
                        <div class="col small">
                          $221.34 collected! 63% of your goal
                        </div>
                        <div class="col details text-right">
                          <a class="action" href="#">
                            Details
                          </a>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">Event Fundraising</div>
                        <div class="col text-right">$1,500.00</div>
                      </div>
                      <div class="row my-2">
                        <div class="col">
                          <div class="progress">
                            <div
                              class="progress-bar"
                              style={{ width: "14%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div class="row no-gutters">
                        <div class="col small">
                          $221.34 collected! 14% of your goal
                        </div>
                        <div class="col details text-right">
                          <a class="action" href="#">
                            Details
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

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
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">
                          <div class="row no-gutters align-content-center">
                            <div class="col icon warning">
                              <span class="fa-stack fa-lg">
                                <i class="fa fa-circle fa-stack-2x"></i>
                                <i class="fa fa-usd fa-stack-1x"></i>
                              </span>
                            </div>
                            <div class="col">
                              You have a recent payment that did not process
                            </div>
                          </div>
                        </div>
                        <div class="col right">
                          <div class="row no-gutters justify-content-center align-items-center">
                            <div class="view">
                              <button class="btn btn-primary">View</button>
                            </div>
                            <div class="text-center">4 Hours Ago</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">
                          <div class="row no-gutters align-content-center">
                            <div class="col icon">
                              <i class="fa fa-calendar-o fa-2x"></i>
                            </div>
                            <div class="col">
                              You registered for an event, Greater Atlanta
                              Champer of Commerce 2015
                            </div>
                          </div>
                        </div>
                        <div class="col right">
                          <div class="row no-gutters justify-content-center align-items-center">
                            <div class="view">
                              <button class="btn btn-primary">View</button>
                            </div>
                            <div class="text-center">2 Days Ago</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">
                          <div class="row no-gutters align-content-center">
                            <div class="col icon">
                              <span class="fa-stack fa-lg">
                                <i class="fa fa-circle fa-stack-2x"></i>
                                <i class="fa fa-usd fa-stack-1x"></i>
                              </span>
                            </div>
                            <div class="col">
                              You made a payment in the amount of{" "}
                              <em>$34.99</em> to your membership account
                            </div>
                          </div>
                        </div>
                        <div class="col right">
                          <div class="row no-gutters justify-content-center align-items-center">
                            <div class="view">
                              <button class="btn btn-primary">View</button>
                            </div>
                            <div class="text-center">5 Days Ago</div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="row no-gutters">
                        <div class="col">
                          <div class="row no-gutters align-content-center">
                            <div class="col icon">
                              <i class="fa fa-envelope fa-2x"></i>
                            </div>
                            <div class="col">
                              You received a message from Bill Jones
                            </div>
                          </div>
                        </div>
                        <div class="col right">
                          <div class="row no-gutters justify-content-center align-items-center">
                            <div class="view">
                              <button class="btn btn-primary">View</button>
                            </div>
                            <div class="text-center">7 Days Ago</div>
                          </div>
                        </div>
                      </div>
                    </li>
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

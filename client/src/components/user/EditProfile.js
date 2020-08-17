import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";
import { getProfile, updateProfile } from "../core/apiCore";

const EditProfile = () => {
  const { user, token } = isAuthenticated();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    photo: "",
    country: "",
    about: "",
    formData: "",
  });

  const { name, email, dob, phone, country, about, formData } = profile;

  const getProfileUser = (userId, token) => {
    getProfile(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProfile({
          ...profile,
          name: data.data.name,
          email: data.data.email,
          dob: data.data.dob.substring(0, 10),
          phone: data.data.phone,
          country: data.data.country,
          about: data.data.about,
          formData: new FormData(),
        });
      }
    });
  };

  const profileUpdate = (event) => {
    event.preventDefault();
    updateProfile(user._id, token, formData);
  };

  useEffect(() => {
    getProfileUser(user._id, token);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setProfile({
      ...profile,
      errors: false,
      [name]: value,
    });
  };

  const editForm = () => (
    <div class="container">
      <div className="mt-5">
        <Link to="/user/dashboard" className="back-button mt-5">
          Back to Dashboard
        </Link>
      </div>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
        <div class="chart-data">
          <div class="row">
            <div class="col-12">
              <div class="card-body align-items-center ">
                <h5 class="card-title text-center header">Update Profile</h5>
                <form
                  class="form-update"
                  onSubmit={profileUpdate}
                  encType="multipart/form-data"
                >
                  <div className="form-label-group">
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      accept="image/*"
                      className="form-control"
                      onChange={handleChange("photo")}
                    ></input>
                    <label for="photo">
                      <div class="profile-pic">
                        <span class="fa fa-camera fa-fw"></span>
                        <span>Change Image</span>
                      </div>
                    </label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputName"
                      name="name"
                      value={name}
                      placeholder="User Name"
                      className="form-control"
                      onChange={handleChange("name")}
                      required
                    />

                    <label for="inputName">Name</label>
                  </div>
                  <div class="form-label-group">
                    <textarea
                      type="text"
                      id="inputAbout"
                      name="about"
                      value={about}
                      placeholder="Profile About"
                      className="form-control"
                      onChange={handleChange("about")}
                      required
                    />

                    <label for="inputAbout">About</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      value={email}
                      placeholder="Profile Email"
                      className="form-control"
                      onChange={handleChange("email")}
                      required
                    />

                    <label for="inputEmail">Email</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={dob}
                      placeholder="User Phone"
                      className="form-control"
                      onChange={handleChange("dob")}
                    />

                    <label for="dob">Date of Birth</label>
                  </div>
                  <div class="form-label-group">
                    <input
                      type="tel"
                      id="inputPhone"
                      name="phone"
                      value={phone}
                      placeholder="User Phone"
                      className="form-control"
                      onChange={handleChange("phone")}
                      required
                    />

                    <label for="inputPhone">Phone</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputCountry"
                      name="country"
                      value={country}
                      placeholder="User Location"
                      className="form-control"
                      onChange={handleChange("country")}
                      required
                    />

                    <label for="inputCountry">Country</label>
                  </div>

                  <div className="row">
                    <div className="col-12 text-center">
                      <button class="btn  text-uppercase" type="submit">
                        Update Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  return <div>{editForm()}</div>;
};

export default EditProfile;

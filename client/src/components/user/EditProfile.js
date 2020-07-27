import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
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
    redirectToProfile: false,
    formData: "",
  });

  const {
    name,
    email,
    dob,
    phone,
    photo,
    country,
    about,
    redirectToProfile,
    formData,
  } = profile;

  const getProfileUser = (userId, token) => {
    getProfile(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProfile({
          ...profile,
          name: data.data.name,
          email: data.data.email,
          dob: data.data.dob,
          phone: data.data.phone,
          photo: data.data.photo,
          country: data.data.country,
          about: data.data.about,
          formData: new FormData(),
        });
      }
    });
  };

  const profileUpdate = () => {
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
    <div class="container-fluid">
      <div class="row">
        <Link to="/user/dashboard" className="btn">
          Back to Dashboard
        </Link>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
          <div class="chart-data">
            <div class="row">
              <div class="col-12">
                <div class="card-body align-items-center ">
                  <h5 class="card-title text-center">Update Profile</h5>
                  <form class="form-signin" onSubmit={profileUpdate()}>
                    <label for="photo">
                      <div class="profile-pic">
                        <span class="fa fa-camera fa-fw"></span>
                        <span>Change Image</span>
                      </div>
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      accept="image/*"
                      className="form-control-lg"
                      onChange={handleChange("photo")}
                    ></input>
                    <div class="form-label-group">
                      <input
                        type="text"
                        id="inputName"
                        name="name"
                        value={profile.name}
                        placeholder="User Name"
                        className="form-control-lg"
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
                        value={profile.about}
                        placeholder="Profile About"
                        className="form-control-lg"
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
                        value={profile.email}
                        placeholder="Profile Email"
                        className="form-control-lg"
                        onChange={handleChange("email")}
                        required
                      />

                      <label for="inputEmail">Email</label>
                    </div>
                    <div class="form-label-group">
                      <input
                        type="tel"
                        id="inputPhone"
                        name="phone"
                        value={profile.phone}
                        placeholder="User Phone"
                        className="form-control-lg"
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
                        value={profile.country}
                        placeholder="User Location"
                        className="form-control-lg"
                        onChange={handleChange("country")}
                        required
                      />

                      <label for="inputCountry">Country</label>
                    </div>

                    <input
                      class="btn btn-lg text-uppercase"
                      type="submit"
                      value="Update Profile"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  return <div>{editForm()}</div>;
};

export default EditProfile;

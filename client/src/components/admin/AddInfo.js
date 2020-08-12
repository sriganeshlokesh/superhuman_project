import React, { useState, useEffect } from "react";
import { addInfo, getProduct } from "../../actions/admin/adminApi";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../actions/auth";

const AddInfo = (props) => {
  const productId = props.match.params.productId;
  const { history } = props;
  const [info, setInfo] = useState({
    protein: "",
    fat: "",
    carbohydrate: "",
    cholestrol: "",
    sodium: "",
    sugar: "",
    calories: "",
    calcium: "",
    potassium: "",
  });
  const [product, setProduct] = useState({});

  const { user, token } = isAuthenticated();

  const {
    protein,
    fat,
    carbohydrate,
    cholestrol,
    sodium,
    sugar,
    calcium,
    calories,
    potassium,
  } = info;
  const handleChange = (name) => (event) => {
    setInfo({ ...info, [name]: event.target.value });
  };

  const productTarget = () => {
    getProduct(productId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  useEffect(() => {
    productTarget();
  }, []);

  const productInfo = (event) => {
    event.preventDefault();
    console.log(info);
    addInfo(user._id, productId, token, info)
      .then(() => {
        history.push("/admin/dashboard/product");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div class="container-fluid mt-0">
        <div class="row">
          <main role="main" class="col-md-9 ml-sm-auto col-lg-10 my-3">
            <div class="chart-data">
              <Link to="/admin/dashboard/product" className="btn btn-secondary">
                Go to Products
              </Link>
              <div class="row">
                <div class="col-12">
                  <div class="card-body align-items-center ">
                    <h5 class="card-title text-center">
                      Add {product.name}'s Info
                    </h5>
                    <form class="form-signin" onSubmit={productInfo}>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="protein"
                          name="protein"
                          value={protein}
                          className="form-control-lg"
                          onChange={handleChange("protein")}
                          required
                        />
                        <label for="protein">Protein</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="fat"
                          name="fat"
                          value={fat}
                          className="form-control-lg"
                          onChange={handleChange("fat")}
                          required
                        />

                        <label for="fat">Fat</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="carbohydrate"
                          name="carbohydrate"
                          value={carbohydrate}
                          className="form-control-lg"
                          onChange={handleChange("carbohydrate")}
                          required
                        />

                        <label for="carbohydrate">Carbohydrate</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="cholestrol"
                          name="cholestrol"
                          value={cholestrol}
                          className="form-control-lg"
                          onChange={handleChange("cholestrol")}
                          required
                        />

                        <label for="cholestrol">Cholestrol</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="sodium"
                          name="sodium"
                          value={sodium}
                          className="form-control-lg"
                          onChange={handleChange("sodium")}
                          required
                        />

                        <label for="sodium">Sodium</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="sugar"
                          name="sugar"
                          value={sugar}
                          className="form-control-lg"
                          onChange={handleChange("sugar")}
                          required
                        />
                        <label for="sugar">Sugar</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="calcium"
                          name="calcium"
                          value={calcium}
                          className="form-control-lg"
                          onChange={handleChange("calcium")}
                          required
                        />
                        <label for="calcium">Calcium</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="calories"
                          name="calories"
                          value={calories}
                          className="form-control-lg"
                          onChange={handleChange("calories")}
                          required
                        />
                        <label for="calories">Calories</label>
                      </div>
                      <div class="form-label-group">
                        <input
                          type="text"
                          id="potassium"
                          name="potassium"
                          value={potassium}
                          className="form-control-lg"
                          onChange={handleChange("potassium")}
                          required
                        />
                        <label for="potassium">Potassium</label>
                      </div>

                      <input
                        class="btn btn-lg btn-block text-uppercase"
                        type="submit"
                        value="Add Info"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(AddInfo);

import React, { useState, useEffect } from "react";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import {
  getInfo,
  relatedProducts,
  getProduct,
  addLike,
  unLike,
  disLike,
  undislike,
  getComments,
  addComment,
  deleteComment,
  getProfile,
} from "./apiCore";
import { addItem } from "./addToCartHelper";
import { isAuthenticated } from "../../actions/auth";
import moment from "moment";
import "../../productPage.css";

const ProductPage = ({ id }) => {
  const [info, setInfo] = useState({});
  const [error, setError] = useState(false);
  const [related, setRelated] = useState([]);
  const [product, setProduct] = useState({});
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [profile, setProfile] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [selectedFlavour, setSelectedFlavour] = useState("");

  const { user, token } = isAuthenticated();

  const addToCart = () => {
    if (selectedFlavour.length > 0) {
      addItem(product, selectedFlavour, () => {
        setRedirect(true);
      });
    } else {
      setError("Select Flavour");
    }
  };

  const redirectToCart = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const singleProduct = () => {
    getProduct(id).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        setLikes(data.likes);
        setDislikes(data.dislikes);
      }
    });
  };

  const getUser = () => {
    getProfile(user._id, token).then((data) => {
      setProfile(data);
    });
  };

  const productComments = () => {
    getComments(id).then((data) => {
      console.log(data.data);
      setComments(data.data);
    });
  };

  const productLike = () => {
    if (isAuthenticated()) {
      if (likes.filter((like) => like.user === user._id).length > 0) {
        unLike(user._id, product._id, token).then((data) => {
          setLikes(data.data.likes);
        });
      } else if (
        dislikes.filter((dislike) => dislike.user === user._id).length > 0
      ) {
        undislike(user._id, product._id, token).then((data) => {
          setDislikes(data.data.dislikes);
        });
        addLike(user._id, product._id, token).then((data) => {
          setLikes(data.data.likes);
        });
      } else {
        addLike(user._id, product._id, token).then((data) => {
          setLikes(data.data.likes);
        });
      }
    }
  };

  const productDislike = () => {
    if (isAuthenticated()) {
      if (dislikes.filter((dislike) => dislike.user === user._id).length > 0) {
        undislike(user._id, product._id, token).then((data) => {
          setDislikes(data.data.dislikes);
        });
      } else if (likes.filter((like) => like.user === user._id).length > 0) {
        unLike(user._id, product._id, token).then((data) => {
          setLikes(data.data.likes);
        });
        disLike(user._id, product._id, token).then((data) => {
          setDislikes(data.data.dislikes);
        });
      } else {
        disLike(user._id, product._id, token).then((data) => {
          setDislikes(data.data.dislikes);
        });
      }
    }
  };

  const isActiveLike = () => {
    if (isAuthenticated()) {
      if (likes.filter((like) => like.user === user._id).length > 0) {
        return { color: "#EF8354" };
      } else {
        return { color: "#000" };
      }
    }
  };
  const isActiveDislike = () => {
    if (isAuthenticated()) {
      if (dislikes.filter((dislike) => dislike.user === user._id).length > 0) {
        return { color: "#EF8354" };
      } else {
        return { color: "#000" };
      }
    }
  };

  const productInfo = (productId) => {
    getInfo(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setInfo(data);
        relatedProducts(id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelated(data);
          }
        });
      }
    });
  };

  const comment = () => {
    addComment(user._id, id, token, text).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setText({ text: "" });
        productComments();
      }
    });
  };

  const commentDelete = (userId, productId, commentId, token) => {
    deleteComment(userId, productId, commentId, token).then((data) => {
      setComments(data.comments);
    });
  };

  useEffect(() => {
    productInfo(id);
    singleProduct();
    productComments();
    getUser();
  }, []);

  const handleChange = (name) => (event) => {
    setText({ ...text, [name]: event.target.value });
  };

  const handleFlavour = () => (event) => {
    console.log(event.target.value);
    setSelectedFlavour(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="row mt-2">
        <Link to="/shop" className="custom-back">
          Back to Products
        </Link>
      </div>
      <div className="row">
        {redirectToCart(redirect)}
        <div className="col mb-4">
          <ProductImage item={product} url="product" height="100" />
        </div>
        <div className="custom-card col-8 mb-5">
          <h2 className="product-header">{product.name}</h2>
          <h6 className="product-description">{product.description}</h6>
          <h6 className="product-price">${product.price}</h6>
          <div className="row ml-0 mr-0 custom-info">
            <div className="col-4">
              <h6 className="text-white custom-product-info">PROTEIN</h6>
              <p className="text-white custom-product-content">
                {info.protein}g
              </p>
            </div>
            <div className="col-4">
              <h6 className="text-white custom-product-info">FAT</h6>
              <p className="text-white custom-product-content ">{info.fat}g</p>
            </div>
            <div className="col-4">
              <h6 className="text-white custom-product-info">SUGARS</h6>
              <p className="text-white custom-product-content">{info.sugar}g</p>
            </div>
          </div>
          <div className="row">
            <select
              value={selectedFlavour}
              onChange={handleFlavour()}
              className={classnames("custom-select ml-1", {
                "is-invalid": error,
              })}
            >
              <option value="" disabled selected>
                Flavour
              </option>
              {product.flavour &&
                product.flavour.map((item, index) => (
                  <option key={index} value={item} style={{ color: "#273142" }}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              {product.quantity > 0 ? (
                <span className="in-stock">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            <div className="col-6 added-time">
              <span>Added {moment(product.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <button
                type="button"
                className="btn btn-light mr-2"
                onClick={productLike}
              >
                <i
                  class="fa fa-thumbs-up fa-2x"
                  aria-hidden="true"
                  style={isActiveLike()}
                ></i>
                <span className="badge badge-light">{likes.length}</span>
              </button>
              <button
                type="button"
                className="btn btn-light mr-2"
                onClick={productDislike}
              >
                <i
                  class="fa fa-thumbs-down fa-2x"
                  aria-hidden="true"
                  style={isActiveDislike()}
                ></i>
                <span className="badge badge-light">{dislikes.length}</span>
              </button>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6"></div>
            <div className="col-6">
              <Link onClick={addToCart} className="custom-addcart btn mt-3">
                <i className="fa fa-shopping-cart"></i> Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row text-align-center">
        <div className="col-12">
          <h2 className="header">Product Info</h2>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div class="col-12">
            <div class="projects mb-4">
              <div class="projects-inner">
                <header class="projects-header">
                  <div class="title">Daily Consumption</div>
                </header>
                <table class="projects-table">
                  <thead>
                    <tr>
                      <th>Content</th>
                      <th>Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Protein</td>
                      <td>{info.protein}g</td>
                    </tr>
                    <tr>
                      <td>Fat</td>
                      <td>{info.fat}g</td>
                    </tr>
                    <tr>
                      <td>Sugar</td>
                      <td>{info.sugar}g</td>
                    </tr>
                    <tr>
                      <td>Cholestrol</td>
                      <td>{info.cholestrol}mg</td>
                    </tr>
                    <tr>
                      <td>Total Carbohydrate</td>
                      <td>{info.carbohydrate}g</td>
                    </tr>
                    <tr>
                      <td>Sodium</td>
                      <td>{info.sodium}g</td>
                    </tr>
                    <tr>
                      <td>Calcium</td>
                      <td>{info.calcium}mg</td>
                    </tr>
                    <tr>
                      <td>Potassium</td>
                      <td>{info.potassium}mg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="header">Comments</h2>
            <div className="comment-wrapper">
              <div className="panel panel-info">
                <div className="panel-body">
                  {isAuthenticated() && (
                    <React.Fragment>
                      <textarea
                        className="form-control"
                        placeholder="Add a Public Comment"
                        rows="3"
                        onChange={handleChange("text")}
                      ></textarea>
                      <br />
                      <button
                        type="button"
                        className="btn btn-info pull-right"
                        onClick={comment}
                      >
                        Post
                      </button>
                    </React.Fragment>
                  )}
                  <div className="clearfix"></div>
                  <hr />
                  <ul className="media-list">
                    {comments &&
                      comments.map((comment, index) => (
                        <li className="media" key={index}>
                          {profile.photo === "undefined" || undefined ? (
                            <img
                              src={
                                "http://sunfieldfarm.org/wp-content/uploads/2014/02/profile-placeholder.png"
                              }
                              style={{ width: "100px" }}
                            />
                          ) : (
                            <img
                              src={`${process.env.REACT_APP_API}/user/photo/${comment.user}`}
                              style={{ width: "100px" }}
                            />
                          )}
                          <div className="media-body">
                            <span className="text-muted pull-right">
                              <small className="text-muted">
                                {moment(comment.createdAt).fromNow()}
                              </small>
                              {isAuthenticated() && comment.user === user._id && (
                                <button
                                  type="button"
                                  className="btn btn-danger mr-1"
                                  onClick={() =>
                                    commentDelete(
                                      user._id,
                                      id,
                                      comment._id,
                                      token
                                    )
                                  }
                                >
                                  <i className="fa fa-times"></i>
                                </button>
                              )}
                            </span>
                            <strong className="text-success">
                              @{comment.name}
                            </strong>
                            <p>{comment.text}</p>
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
      <div className="row">
        <div className="col-12">
          <h2 className="header">Related Products</h2>
        </div>
      </div>

      <div className="row ml-0 mr-0">
        {related &&
          related.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </React.Fragment>
  );
};
export default ProductPage;

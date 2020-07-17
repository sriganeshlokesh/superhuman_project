import React, { useState } from "react";
import ProductImage from "./ProductImage";
import { Link, Redirect } from "react-router-dom";
import { addItem } from "./addToCartHelper";
import "../../card.css";

const ProductCard = ({ product }) => {
  const [redirect, setRedirect] = useState(false);

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const redirectToCart = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <ProductImage item={product} url="product" />
        <div className="card-body">
          {redirectToCart(redirect)}
          <h4 className="card-title">{product.name}</h4>
          <h6 className="card-subtitle mb-2 text-muted">
            Product: {product._id}
          </h6>
          <p className="card-text">{product.description}</p>
          <div className="options d-flex flex-fill">
            <div className="price ">
              <h5 className="mt-2">${product.price}</h5>
            </div>
            <select className="custom-select ml-1">
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
          <div className="buy d-flex justify-content-between align-items-center">
            <Link
              to={`/product/${product._id}`}
              className="btn btn-danger mt-3"
            >
              <i className="fa fa-th"></i> View Product
            </Link>
            <button onClick={addToCart} className="btn btn-danger mt-3">
              <i className="fa fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// import React, { useState } from "react";
// import { Link, Redirect } from "react-router-dom";
// import ShowImage from "./ProductImage";
// import moment from "moment";
// import { addItem, updateItem, removeItem } from "./addToCartHelper";

// const Card = ({
//   product,
//   showViewProductButton = true,
//   showAddToCartButton = true,
//   cartUpdate = false,
//   showRemoveProductButton = false,
//   setRun = (f) => f,
//   run = undefined,
//   // changeCartSize
// }) => {
//   const [redirect, setRedirect] = useState(false);
//   const [count, setCount] = useState(product.count);

//   const showViewButton = (showViewProductButton) => {
//     return (
//       showViewProductButton && (
//         <Link to={`/product/${product._id}`} className="mr-2">
//           <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
//             View Product
//           </button>
//         </Link>
//       )
//     );
//   };
//   const addToCart = () => {
//     // console.log('added');
//     addItem(product, setRedirect(true));
//   };

//   const shouldRedirect = (redirect) => {
//     if (redirect) {
//       return <Redirect to="/cart" />;
//     }
//   };

//   const showAddToCartBtn = (showAddToCartButton) => {
//     return (
//       showAddToCartButton && (
//         <button
//           onClick={addToCart}
//           className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
//         >
//           Add to cart
//         </button>
//       )
//     );
//   };

//   const showStock = (quantity) => {
//     return quantity > 0 ? (
//       <span className="badge badge-primary badge-pill">In Stock </span>
//     ) : (
//       <span className="badge badge-primary badge-pill">Out of Stock </span>
//     );
//   };

//   const handleChange = (productId) => (event) => {
//     setRun(!run); // run useEffect in parent Cart
//     setCount(event.target.value < 1 ? 1 : event.target.value);
//     if (event.target.value >= 1) {
//       updateItem(productId, event.target.value);
//     }
//   };

//   const showCartUpdateOptions = (cartUpdate) => {
//     return (
//       cartUpdate && (
//         <div>
//           <div className="input-group mb-3">
//             <div className="input-group-prepend">
//               <span className="input-group-text">Adjust Quantity</span>
//             </div>
//             <input
//               type="number"
//               className="form-control"
//               value={count}
//               onChange={handleChange(product._id)}
//             />
//           </div>
//         </div>
//       )
//     );
//   };
//   const showRemoveButton = (showRemoveProductButton) => {
//     return (
//       showRemoveProductButton && (
//         <button
//           onClick={() => {
//             removeItem(product._id);
//             setRun(!run); // run useEffect in parent Cart
//           }}
//           className="btn btn-outline-danger mt-2 mb-2"
//         >
//           Remove Product
//         </button>
//       )
//     );
//   };
//   return (
//     <div className="card ">
//       <div className="card-header card-header-1 ">{product.name}</div>
//       <div className="card-body">
//         {shouldRedirect(redirect)}
//         <ShowImage item={product} url="product" />
//         <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
//         <p className="card-p black-10">$ {product.price}</p>
//         <p className="black-9">
//           Category: {product.category && product.category.name}
//         </p>
//         <p className="black-8">
//           Added on {moment(product.createdAt).fromNow()}
//         </p>
//         {showStock(product.quantity)}
//         <br />

//         {showViewButton(showViewProductButton)}

//         {showAddToCartBtn(showAddToCartButton)}

//         {showRemoveButton(showRemoveProductButton)}

//         {showCartUpdateOptions(cartUpdate)}
//       </div>
//     </div>
//   );
// };

// export default Card;

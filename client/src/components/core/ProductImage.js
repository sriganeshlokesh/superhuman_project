import React from "react";

const ProductImage = ({ item, url }) => (
  <div className="product_image">
    <img
      className="mb-3 ml-4"
      src={`${process.env.REACT_APP_API}/${url}/photo/${item._id}`}
      alt={item.name}
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  </div>
);

export default ProductImage;

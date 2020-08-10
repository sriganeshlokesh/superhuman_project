import React from "react";

const ProductImage = ({ item, url }) => (
  <div className="product_image">
    <img
      className="mb-1"
      src={`${process.env.REACT_APP_API}/${url}/photo/${item}`}
      alt={item.name}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  </div>
);

export default ProductImage;

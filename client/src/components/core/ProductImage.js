import React from "react";

const ProductImage = ({ item, url }) => (
  <div className="product_image text-center">
    <img
      className="mb-1 "
      src={`/api/${url}/photo/${item}`}
      alt={item.name}
      style={{
        maxWidth: "95%",
        maxHeight: "70%",
      }}
    />
  </div>
);

export default ProductImage;

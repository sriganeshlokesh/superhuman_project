import React, { useState } from "react";

const PriceRadioBox = ({ prices, filters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    filters(event.target.value);
    setValue({
      ...value,
    });
  };

  return prices.map((price, index) => (
    <div key={index}>
      <input
        value={`${price._id}`}
        onChange={handleChange}
        name={price}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  ));
};

export default PriceRadioBox;

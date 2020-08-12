import React, { useState } from "react";

const CategoryCheckBox = ({ categories, filters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedId.push(c);
    } else {
      newCheckedId.splice(currentCategoryId, 1);
    }

    setChecked(newCheckedId);
    filters(newCheckedId);
  };

  return categories.map((category, index) => (
    <li key={index} className="list-unstyled">
      <input
        value={checked.indexOf(category._id === -1)}
        onChange={handleToggle(category._id)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ));
};

export default CategoryCheckBox;

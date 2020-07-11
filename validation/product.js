const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProductInput(data) {
  let errors = {};

  data.protein = !isEmpty(data.protein) ? data.protein : "";
  data.fat = !isEmpty(data.fat) ? data.fat : "";
  data.cholestrol = !isEmpty(data.cholestrol) ? data.cholestrol : "";
  data.sodium = !isEmpty(data.sodium) ? data.sodium : "";
  data.carbohydrate = !isEmpty(data.carbohydrate) ? data.carbohydrate : "";
  data.sugar = !isEmpty(data.sugar) ? data.sugar : "";
  data.calories = !isEmpty(data.calories) ? data.calories : "";
  data.calcium = !isEmpty(data.calcium) ? data.calcium : "";
  data.potassium = !isEmpty(data.potassium) ? data.potassium : "";

  if (validator.isEmpty(data.protein)) {
    errors.protein = "protein field is required";
  }

  if (validator.isEmpty(data.fat)) {
    errors.fat = "fat field is required";
  }

  if (validator.isEmpty(data.cholestrol)) {
    errors.cholestrol = "cholestrol field is required";
  }

  if (validator.isEmpty(data.sodium)) {
    errors.sodium = "sodium field is required";
  }

  if (validator.isEmpty(data.carbohydrate)) {
    errors.carbohydrate = "carbohydrate is required";
  }

  if (validator.isEmpty(data.sugar)) {
    errors.sugar = "sugar is required";
  }

  if (validator.isEmpty(data.calories)) {
    errors.calories = "calories is required";
  }
  if (validator.isEmpty(data.calcium)) {
    errors.calcium = "calcium is required";
  }

  if (validator.isEmpty(data.potassium)) {
    errors.potassium = "potassium is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

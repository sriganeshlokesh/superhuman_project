const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    company: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    info: {
      protein: {
        type: String,
      },
      fat: {
        type: String,
      },
      cholestrol: {
        type: String,
      },
      sodium: {
        type: String,
      },
      carbohydrate: {
        type: String,
      },
      sugar: {
        type: String,
      },
      calories: {
        type: String,
      },
      calcium: {
        type: String,
      },
      potassium: {
        type: String,
      },
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "product");

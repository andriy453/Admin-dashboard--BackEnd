const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    id: {
      type: String,
    },
    photo: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      unique: true,
    },
    suppliers: {
      type: String,
      required: [true, "suppliers is required"],
    },
    stock: {
      type: String,
      required: [true, "stock is required"],
    },
    price: {
      type: String,
      required: [true, "price is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
  },
);


const Product = model("Product", productSchema);

module.exports = {
  Product,
};

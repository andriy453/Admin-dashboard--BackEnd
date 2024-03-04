const { Schema, model } = require("mongoose");

const supplier = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    suppliers: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Supplier = model("supplier", supplier);

module.exports =  {
    Supplier
}
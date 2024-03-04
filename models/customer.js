const { Schema, model } = require("mongoose");

const customer = new Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    spent: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);


const Customer = model("customer", customer);
  
module.exports = {
    Customer,
}

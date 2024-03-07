const { Schema, model } = require("mongoose");


const dashboard = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);



const Dashboard = model("dashboard", dashboard);

module.exports = {
    Dashboard
}

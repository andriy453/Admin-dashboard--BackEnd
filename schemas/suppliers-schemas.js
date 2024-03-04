const Joi = require("joi");


const supplierAddSchema = Joi.object({
    status: Joi.string(),
    name: Joi.string().required(),
    suppliers: Joi.string().required(),
    address: Joi.string().required(),
    date: Joi.string().required(),
    amount: Joi.string().required(),
  });
  module.exports = {
    supplierAddSchema,
  };
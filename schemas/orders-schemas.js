const Joi = require("joi");

 const orderAddSchema = Joi.object({
    photo: Joi.string(),
    name: Joi.string(),
    adress: Joi.string(),
    products: Joi.string(),
    price: Joi.string(),
    status: Joi.string(),
  });
  module.exports =  {
    orderAddSchema,
  };
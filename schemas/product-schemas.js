const Joi = require("joi");

 const productAddSchema = Joi.object({
  id: Joi.string(),
  photo: Joi.string(),
  name: Joi.string().required(),
  suppliers: Joi.string().required(),
  stock: Joi.string().required(),
  price: Joi.string().required(),
  category: Joi.string().required(),
});
module.exports = {
  productAddSchema,
};
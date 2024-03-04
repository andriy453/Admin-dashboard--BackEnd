const Joi = require("joi");

 const customerAddSchema = Joi.object({
  image: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  spent: Joi.string(),
});
module.exports = {
  customerAddSchema,
};
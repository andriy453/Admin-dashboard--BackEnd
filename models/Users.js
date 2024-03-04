const { Schema, model } = require("mongoose");
const Joi = require("joi");
const userSchema = new Schema(
  {
     name:{
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
        token: String,
  },
  { versionKey: false, timestamps: true },
);

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net",'ua'] } })
    .required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net",'ua'] } })
    .required(),
});
const EmailSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net",'ua'] } }).required(),
}
)
const schemas = {
  registerSchema,
  loginSchema,
  EmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};

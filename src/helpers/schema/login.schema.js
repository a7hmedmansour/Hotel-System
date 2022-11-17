import Joi from "joi";
const loginschema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be an empty field",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().required().messages({
    "string.empty": " password cannot be an empty field",
    "any.required": " password is a required field",
  }),
});

export default loginschema;

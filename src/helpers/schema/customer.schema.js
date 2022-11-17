import Joi from "joi";
const cutomerschema = Joi.object({
	id: Joi.string()
		.required()
		.regex(/^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$/)		
		.min(14)
		.messages({
			"string.empty": "Id cannot be an empty field",
			"string.pattern.base": "Id invaild Egyption id must be 14 number",
			"any.required": "Id is a required field",
		}),
	name: Joi.string().min(2).required().messages({
		"string.empty": "Name cannot be an empty field",
		"string.min": "Name must be at least 2 characters long",
		"any.required": "Name is a required field",
	}),
	phonenumber: Joi.string().required().regex(/^01[0125][0-9]{8}$/).messages({
		"string.empty": "Phone number cannot be an empty field",
		"string.pattern.base": "Phone number invaild must be 11 number",
		"any.required": "Phone number is a required field",
	}),
	email: Joi.string().email().required().messages({
		"string.email": "Email must be a valid email",
		"string.empty": "Email cannot be an empty field",
		"any.required": "Email is a required field",
	}),
});

export default cutomerschema;
//.regex(/^01[0125][0-9]{8}$/s)

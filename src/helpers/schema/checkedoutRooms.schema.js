import Joi from "joi";
const checkschema = Joi.object({
	userid: Joi.string().required().messages({
		"string.empty": "User Id cannot be an empty field",
		"any.required": "User Id is a required field",
	}),
	roomid: Joi.number().integer().required().unsafe().messages({
		"number.empty": "Admin Id cannot be an empty field",
		"any.required": "Admin Id is a required field",
		"any.type!=integer": "Admin Id must be integer",
	}),
	feedback: Joi.string().messages({
		"string.empty":
			" write your feedback , feedback cannot be an empty field  ",
	}),
	endAt: Joi.date().required().greater("now").messages({
		"date.empty": "endAt Date cannot be an empty field",
		"any.required": "endAt Date is a required field",
		"date.greater": "endAt Date don't allow must After or equal now ",
	}),
});
export default checkschema;

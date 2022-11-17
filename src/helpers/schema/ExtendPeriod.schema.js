import Joi from "joi";

const ExtendPeriodschema = Joi.object({
	userid: Joi.string().required().messages({
		"string.empty": "User Id cannot be an empty field",
		"any.required": "User Id is a required field",
	}),
	roomid: Joi.number().integer().required().messages({
		"number.empty": "Room Id cannot be an empty field",
		"any.required": "Room Id is a required field",
		"any.type!=integer": "Room Id must be integer",
	}),
	endAt: Joi.date().greater("now").required().messages({
		"date.empty": "endAt Date cannot be an empty field",
		"any.required": "endAt Date is a required field",
		"date.greater": "endAt Date don't allow ",
	}),
});

export default ExtendPeriodschema;

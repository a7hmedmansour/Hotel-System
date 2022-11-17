import Joi from "joi";
const ReservedRoomschema = Joi.object({
	userid: Joi.string().required().messages({
		"string.empty": "User Id cannot be an empty field",
		"any.required": "User Id is a required field",
	}),
	// adminid: Joi.number().integer().required().messages({
	//   "number.empty": "Admin Id cannot be an empty field",
	//   "any.required": "Admin Id is a required field",
	//   "any.type!=integer": "Admin Id must be integer",
	// }),
	roomid: Joi.number().integer().required().messages({
		"number.empty": "Room Id cannot be an empty field",
		"any.required": "Room Id is a required field",
		"any.type!=integer": "Room Id must be integer",
	}),
	startAt: Joi.date().required().min("now").messages({
		"date.empty": "startAt Date cannot be an empty field",
		"any.required": "startAt Date is a required field",
		"date.min": "startAt Date don't allow must start from now ",
	}),
	endAt: Joi.date().greater("now").required().messages({
		"date.empty": "endAt Date cannot be an empty field",
		"any.required": "endAt Date is a required field",
		"date.greater": "endAt Date don't allow ",
	}),
});

export default ReservedRoomschema;

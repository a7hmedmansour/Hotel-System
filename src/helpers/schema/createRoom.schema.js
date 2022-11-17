import Joi from "joi";

const roomschema = Joi.object({
	status: Joi.string()
		.required()
		.valid("Available", "Reserved", "Disabled")
		.messages({
			"any.required": "Status is required",
			"string.empty": "Status cannot be an empty field",
			"any.only": "Status must be Available Or Reserved Or Disabled ",
		}),
	Daycost: Joi.number().positive().required().messages({
		"any.required": "Daycost is required",
		"number.empty": "Daycost cannot be an empty field",
		"number.positive": "Daycost must be positive value",
	}),
	Type: Joi.string().required().valid("double", "single").messages({
		"any.required": " Type  is required",
		"string.empty": " Type  cannot be an empty field",
		"any.only": " Type  must be double Or single",
	}),
	Description: Joi.string().required().messages({
		"any.required": " Description  is required",
		"string.empty": "Description  cannot be an empty field",
	}),
});
export default roomschema;

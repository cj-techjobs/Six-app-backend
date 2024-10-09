const { body } = require("express-validator");

exports.updateProfileValidator = [
	body("email", "email is required").isEmail().notEmpty(),
	body("fullName", "full name is required").trim().notEmpty(),
	body("birthdate", "birthdate is required").isDate().notEmpty(),
];

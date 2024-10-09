const { body } = require("express-validator");

const categoryValidators = [body("title", "deviceType is required").trim().notEmpty()];

exports.addCategory = [...categoryValidators];

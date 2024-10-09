const mongoose = require("mongoose");

const RTOSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("rto", RTOSchema);

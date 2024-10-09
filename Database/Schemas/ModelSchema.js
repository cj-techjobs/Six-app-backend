const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	image: {
		type: String,
		default: "https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg",
	},
	makeId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "makes",
	},
});

module.exports = mongoose.model("models", ModelSchema);

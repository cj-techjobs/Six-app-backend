const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema(
	{
		color: {
			type: String,
			unique: true,
			required: true,
			maxlength: [50, "Color title cannot exceed 50 characters"],
			minlength: [1, "Color title cannot be empty"],
			trim: true,
		},
		hex: {
			type: String,
			required: [true, "HEX color code is required"],
			match: [/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid HEX color code"],
			trim: true,
		},
		rgb: {
			type: String,
			required: [true, "RGB color code is required"],
			match: [/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/, "Invalid RGB color code"],
			trim: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("colors", ColorSchema);

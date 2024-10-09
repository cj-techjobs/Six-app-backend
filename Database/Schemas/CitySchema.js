const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
			maxlength: [20, "City title cannot exceed 20 characters"],
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("cities", CitySchema);

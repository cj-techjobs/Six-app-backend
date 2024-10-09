const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
	{
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "categories",
			required: true,
		},
		title: {
			type: String,
			unique: true,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
		isCommingSoon: {
			type: Boolean,
			default: false,
		},
		isLocked: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("subcategories", SubCategorySchema);

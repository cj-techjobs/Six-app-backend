const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		image: {
			type: String,
			default: "https://via.placeholder.com/150/771796",
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
		metaTitle: {
			type: String,
			default: "Six App - Rent & Buy Cars, Bikes, Properties, and More",
		},
		metaKeywords: {
			type: String,
			default:
				"Six App, rent car, buy second-hand car, buy second-hand bike, best products, lowest price, used cars, used bikes, second-hand property, electronics, appliances, furniture, books, clothing, jobs, movies, events, free auctions, vacation deals",
		},
		metaDescription: {
			type: String,
			default: "Discover the best deals on cars, bikes, properties, and more on Six App. Shop by categories with the lowest prices and enjoy a seamless experience.",
		},
		focusKeyword: {
			type: String,
			trim: true,
			description: "The main keyword or phrase for SEO optimization.",
		},
		slugUrl: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("categories", CategorySchema);

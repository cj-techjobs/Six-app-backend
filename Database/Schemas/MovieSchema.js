const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 255,
		},
		description: {
			type: String,
			required: true,
			minlength: 50,
			maxlength: 1000,
		},
		releaseDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (v) {
					return v <= new Date();
				},
				message: "Release date cannot be in the future",
			},
		},
		poster: {
			type: String,
			required: true,
			validate: {
				validator: function (v) {
					return /^https?:\/\/[\w\-\.]+\.[\w]{2,4}\/[\w\-\.]+\.(jpg|jpeg|png)$/.test(v);
				},
				message: "Invalid image URL",
			},
		},
		genre: {
			type: String,
			enum: [
				"Action",
				"Comedy",
				"Drama",
				"Sci-Fi",
				"Romance",
				"Horror",
				"Animation",
				"Adventure",
				"Family",
				"Mystery",
				"Thriller",
				"Crime",
				"Biography",
				"History",
				"Music",
				"War",
				"Western",
				"Documentary",
				"Musical",
			],
			required: true,
		},
		duration: {
			type: Number,
			required: true,
			min: 0,
			max: 360,
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
		},
		trailerUrl: {
			type: String,
			validate: {
				validator: function (v) {
					return /^https?:\/\/[\w\-\.]+\.[\w]{2,4}\/[\w\-\.]+\.(mp4|mov|avi|webm)$/.test(v);
				},
				message: "Invalid video URL",
			},
		},
		cast: [String],
		director: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("movies", MovieSchema);

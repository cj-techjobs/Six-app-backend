const mongoose = require("mongoose");
const insuranceTypes = ["Third-Party", "Comprehensive"];

const BikeSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		title: {
			type: String,
			required: true,
			minlength: 3,
		},
		categoriesId: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
		makeId: { type: mongoose.Schema.Types.ObjectId, ref: "makes", required: true },
		modelId: { type: mongoose.Schema.Types.ObjectId, ref: "models", required: true },
		colorId: { type: mongoose.Schema.Types.ObjectId, ref: "colors", required: true },
		vehicleTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicleType", required: true },
		realModel: { type: String },
		homeTestDrive: { type: Boolean },
		rto: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "rto",
			required: true,
		},
		year: {
			type: Number,
			required: true,
			min: [1900, "Year must be after 1900"],
			max: [new Date().getFullYear(), `Year cannot be in the future`],
		},
		variant: {
			type: String,
			trim: true,
			maxlength: [100, "Variant name cannot exceed 100 characters"],
		},
		engineCapacity: {
			type: Number,
			required: true,
			min: [50, "Engine capacity must be at least 50cc"],
			max: [2500, "Engine capacity must be below 2500cc"],
		},
		fuelType: {
			type: String,
			enum: ["Petrol", "Electric", "Hybrid"],
			required: true,
		},
		transmission: {
			type: String,
			enum: ["Manual", "Automatic"],
			required: true,
		},
		location: {
			type: String,
			default: "123, Park Street, Park Circus, Kolkata, West Bengal 700017, India",
		},
		latitude: {
			type: String,
			default: "22.5585",
		},
		longitude: {
			type: String,
			default: "88.3493",
		},
		registrationNumber: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: [15, "Registration number cannot exceed 15 characters"],
			validate: {
				validator: function (v) {
					return /^[A-Z0-9-]+$/.test(v);
				},
				message: (props) => `${props.value} is not a valid registration number`,
			},
		},
		registrationState: {
			type: String,
			required: true,
			trim: true,
			maxlength: [50, "Registration state cannot exceed 50 characters"],
		},
		registrationDate: {
			type: Date,
			required: true,
			validate: {
				validator: function (v) {
					return v <= Date.now();
				},
				message: "Registration date cannot be in the future",
			},
		},
		owners: {
			type: Number,
			required: true,
			min: [1, "There must be at least one owner"],
		},
		//----------------
		mileage: {
			type: Number,
			required: true,
			min: [0, "Mileage cannot be negative"],
		},
		kmDriven: {
			type: Number,
			default: 0,
			min: 0,
		},
		insuranceValidity: { type: Date },
		insuranceType: {
			type: String,
			enum: insuranceTypes,
			required: true,
		},
		city: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "cities",
			required: true,
		},
		fuelTankCapacity: {
			type: Number,
			min: 0,
		},
		numberOfGears: {
			type: Number,
			min: 1,
		},
		topSpeed: {
			type: Number,
			min: 0,
		},
		maxPower: {
			type: Number,
			min: 0,
		},
		isLoan: {
			type: Boolean,
			default: false,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		priceUnit: { type: String, default: "RS" },
		transferTax: {
			type: Number,
			min: 0,
		},
		description: {
			type: String,
			trim: true,
			maxlength: [1000, "Description cannot exceed 1000 characters"],
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
		slugUrl: {
			type: String,
			required: true,
			unique: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		images: {
			type: [String],
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("bikes", BikeSchema);

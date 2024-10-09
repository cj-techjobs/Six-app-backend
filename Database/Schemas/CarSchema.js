const mongoose = require("mongoose");

// Enums
const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG", "LPG"];
const transmissionTypes = ["Manual", "Automatic", "CVT", "DCT"];
const insuranceTypes = ["Third-Party", "Comprehensive"];
const steeringAdjustmentTypes = ["Tilt", "Telescopic", "Tilt and Telescopic"];
const suspensionTypes = ["MacPherson Strut", "Double Wishbone", "Multi-Link"];
const brakeTypes = ["Disc", "Drum"];
const steeringTypes = ["Rack and Pinion", "Recirculating Ball"];

const CarSchema = new mongoose.Schema(
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
		makeYear: {
			type: Number,
			required: true,
			min: 1900,
			max: new Date().getFullYear(),
		},
		registerYear: {
			type: Number,
			required: true,
			min: 1900,
			max: new Date().getFullYear(),
		},
		fuel: {
			type: String,
			enum: fuelTypes,
			required: true,
		},
		kmDriven: {
			type: Number,
			default: 0,
			min: 0,
		},
		transmission: {
			type: String,
			enum: transmissionTypes,
			required: true,
		},
		numberOfOwner: {
			type: Number,
			default: 1,
			min: 1,
		},
		insuranceValidity: { type: Date },
		insuranceType: {
			type: String,
			enum: insuranceTypes,
			required: true,
		},
		rto: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "rto",
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
		city: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "cities",
			required: true,
		},
		mileage: {
			type: Number,
			min: 0,
		},
		groundClearance: {
			type: Number,
			min: 0,
		},
		seatingCapacity: {
			type: Number,
			min: 1,
		},
		bootSpace: {
			type: Number,
			min: 0,
		},
		numberOfSeatingRows: {
			type: Number,
			default: 5,
			min: 1,
			max: 5,
		},
		fuelTankCapacity: {
			type: Number,
			min: 0,
		},
		alloyWheels: {
			type: Boolean,
			default: false,
		},
		frontTyreSize: String,
		spareWheel: {
			type: Boolean,
			default: true,
		},
		numberOfDoors: {
			type: Number,
			default: 4,
			min: 2,
			max: 6,
		},
		drivetrain: String,
		gearBox: String,
		numberOfGears: {
			type: Number,
			min: 1,
		},
		displacement: {
			type: Number,
			min: 0,
		},
		numberOfCylinders: {
			type: Number,
			min: 1,
		},
		valve: String,
		limitedSlipDifferential: {
			type: Boolean,
			default: false,
		},
		mildHybrid: {
			type: Boolean,
			default: false,
		},
		turboCharger: {
			type: Boolean,
			default: false,
		},
		clutchType: String,
		topSpeed: {
			type: Number,
			min: 0,
		},
		maxPower: {
			type: Number,
			min: 0,
		},
		maxTorque: {
			type: Number,
			min: 0,
		},
		sportMode: {
			type: Boolean,
			default: false,
		},
		multiDriverMode: {
			type: Boolean,
			default: false,
		},
		suspensionFrontType: {
			type: String,
			enum: suspensionTypes,
		},
		suspensionRearType: {
			type: String,
			enum: suspensionTypes,
		},
		steeringAdjustmentType: {
			type: String,
			enum: steeringAdjustmentTypes,
		},
		frontBreakType: {
			type: String,
			enum: brakeTypes,
		},
		rearBreakType: {
			type: String,
			enum: brakeTypes,
		},
		steeringType: {
			type: String,
			enum: steeringTypes,
		},
		minimumTurningRadius: {
			type: Number,
			min: 0,
		},
		isLoan: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			default: "Discover the best deals on cars, bikes, properties, and more on Six App. Shop by categories with the lowest prices and enjoy a seamless experience.",
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

module.exports = mongoose.model("cars", CarSchema);

const mongoose = require("mongoose");
// Enums for fuel types, transmission types, etc.
const fuelTypes = ["Petrol", "Diesel", "Electric", "CNG", "LPG"];
const transmissionTypes = ["Manual", "Automatic", "CVT", "DCT"];
const insuranceTypes = ["Third-Party", "Comprehensive"];
const steeringAdjustmentTypes = ["Tilt", "Telescopic", "Tilt and Telescopic"];
const suspensionTypes = ["MacPherson Strut", "Double Wishbone", "Multi-Link"];
const brakeTypes = ["Disc", "Drum"];
const steeringTypes = ["Rack and Pinion", "Recirculating Ball"];

const NewCarSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: false,
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
        make: {
            type: String,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
        year: {
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
        transmission: {
            type: String,
            enum: transmissionTypes,
            required: true,
        },
        warranty: {
            type: String,
            // enum: warrantyTypes,
            required: true,
        },
        insuranceValidity: {
            type: Date,
        },
        insuranceType: {
            type: String,
            enum: insuranceTypes,
            required: true,
        },
        mileage: {
            type: Number,
            min: 0,
        },
        seatingCapacity: {
            type: Number,
            required: true,
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
        numberOfCylinders: {
            type: Number,
            min: 1,
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
        features: {
            type: [String], // List of additional features like "Airbags", "Sunroof", etc.
        },
        images: {
            type: [String],
            default: [],
            validate: {
                validator: function (v) {
                    return v.length <= 10; // Limit to 10 images
                },
                message: "You can add a maximum of 10 images.",
            },
        },
        description: {
            type: String,
            default: "Discover the best deals on new cars.",
        },
        metaTitle: {
            type: String,
            default: "Six App Buy Cars",
        },
        metaKeywords: {
            type: String,
            default:
                "Six App, buy second-new car, best products, lowest price",
        },
        metaDescription: {
            type: String,
            default: "Discover the best deals on cars and more on Six App. Shop by categories with the lowest prices and enjoy a seamless experience.",
        },
        slugUrl: {
            type: String,
            required: true,
            unique: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("newcars", NewCarSchema);

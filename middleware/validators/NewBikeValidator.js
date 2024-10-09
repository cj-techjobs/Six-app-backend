const { body } = require("express-validator");

const insuranceTypes = ["Third-Party", "Comprehensive"];
const fuelTypes = ["Petrol", "Electric", "Hybrid"];
const transmissionTypes = ["Manual", "Automatic"];

const newBikeValidators = [
	// UserId
	body("userId").isMongoId().withMessage("UserId must be a valid MongoDB ObjectId"),

	// Title
	body("title")
		.isString()
		.isLength({ min: 3 })
		.withMessage("Title is required and must be at least 3 characters long"),

	// CategoriesId
	body("categoriesId").isMongoId().withMessage("CategoriesId must be a valid MongoDB ObjectId"),

	// MakeId
	body("makeId").isMongoId().withMessage("MakeId must be a valid MongoDB ObjectId"),

	// ModelId
	body("modelId").isMongoId().withMessage("ModelId must be a valid MongoDB ObjectId"),

	// ColorId
	body("colorId").isMongoId().withMessage("ColorId must be a valid MongoDB ObjectId"),

	// VehicleTypeId
	body("vehicleTypeId").isMongoId().withMessage("VehicleTypeId must be a valid MongoDB ObjectId"),

	// RealModel
	body("realModel").optional().isString().withMessage("RealModel must be a string"),

	// HomeTestDrive
	body("homeTestDrive").optional().isBoolean().withMessage("HomeTestDrive must be a boolean"),

	// Rto
	body("rto").isMongoId().withMessage("Rto must be a valid MongoDB ObjectId"),

	// Year
	body("year")
		.isNumeric()
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage("Year is required and must be between 1900 and the current year"),

	// Brand
	body("brand").isString().withMessage("Brand is required and must be a string"),

	// Model
	body("model").isString().withMessage("Model is required and must be a string"),

	// Weight
	body("weight")
		.isNumeric()
		.isFloat({ min: 0 })
		.withMessage("Weight is required and must be a non-negative number"),

	// Variant
	body("variant").optional().isString().isLength({ max: 100 }).withMessage("Variant name cannot exceed 100 characters"),

	// EngineCapacity
	body("engineCapacity")
		.isNumeric()
		.isFloat({ min: 50, max: 2500 })
		.withMessage("EngineCapacity is required and must be between 50cc and 2500cc"),

	// FuelType
	body("fuelType")
		.isString()
		.isIn(fuelTypes)
		.withMessage("FuelType must be one of the predefined options"),

	// Transmission
	body("transmission")
		.isString()
		.isIn(transmissionTypes)
		.withMessage("Transmission type must be either 'Manual' or 'Automatic'"),

	// Location
	body("location")
		.isString()
		.optional()
		.withMessage("Location must be a string"),

	// Latitude
	body("latitude").optional().isString().withMessage("Latitude must be a string"),

	// Longitude
	body("longitude").optional().isString().withMessage("Longitude must be a string"),

	// Mileage
	body("mileage")
		.isNumeric()
		.isFloat({ min: 0 })
		.withMessage("Mileage is required and must be a non-negative number"),

	// InsuranceValidity
	body("insuranceValidity").optional().isISO8601().withMessage("InsuranceValidity must be a valid date"),

	// InsuranceType
	body("insuranceType")
		.isString()
		.isIn(insuranceTypes)
		.withMessage("Insurance type must be one of the predefined options"),

	// City
	body("city").isMongoId().withMessage("City must be a valid MongoDB ObjectId"),

	// FuelTankCapacity
	body("fuelTankCapacity").optional().isNumeric().isFloat({ min: 0 }).withMessage("FuelTankCapacity must be a non-negative number"),

	// NumberOfGears
	body("numberOfGears").optional().isNumeric().isInt({ min: 1 }).withMessage("NumberOfGears must be at least 1"),

	// TopSpeed
	body("topSpeed").optional().isNumeric().isFloat({ min: 0 }).withMessage("TopSpeed must be a non-negative number"),

	// MaxPower
	body("maxPower").optional().isNumeric().isFloat({ min: 0 }).withMessage("MaxPower must be a non-negative number"),

	// Price
	body("price")
		.isNumeric()
		.isFloat({ min: 0 })
		.withMessage("Price is required and must be a non-negative number"),

	// PriceUnit
	body("priceUnit").optional().isString().isIn(["RS", "USD"]).withMessage('Price unit must be "RS" or "USD"'),

	// Description
	body("description").optional().isString().isLength({ max: 1000 }).withMessage("Description cannot exceed 1000 characters"),

	// MetaTitle
	body("metaTitle").optional().isString().withMessage("MetaTitle must be a string"),

	// MetaKeywords
	body("metaKeywords").optional().isString().withMessage("MetaKeywords must be a string"),

	// MetaDescription
	body("metaDescription").optional().isString().withMessage("MetaDescription must be a string"),

	// SlugUrl
	body("slugUrl").isString().withMessage("SlugUrl is required and must be a string"),

	// IsPublished
	body("isPublished").optional().isBoolean().withMessage("IsPublished must be a boolean"),

	// IsActive
	body("isActive").optional().isBoolean().withMessage("IsActive must be a boolean"),

	// Images
	body("images").optional().isArray().withMessage("Images must be an array of strings"),
];

// Export the validation rules for use in routes
exports.addNewBike = [...newBikeValidators];

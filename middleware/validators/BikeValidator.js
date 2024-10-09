const { body, check } = require("express-validator");

const validateBikeAdd = [
	// // Title
	// body("title").isString().isLength({ min: 3 }).withMessage("Title is required and must be at least 3 characters long"),
	// // Color
	// body("colorId").isString().isLength({ max: 50 }).withMessage("Color must be a string with a maximum length of 50 characters."),
	// // MakeId
	// body("makeId").isMongoId().withMessage("MakeId must be a valid MongoDB ObjectId"),
	// // ModelId
	// body("modelId").isMongoId().withMessage("ModelId must be a valid MongoDB ObjectId"),
	// // VehicleTypeId
	// body("vehicleTypeId").isMongoId().withMessage("VehicleTypeId must be a valid MongoDB ObjectId"),
	// // VehicleTypeId
	// body("categoriesId").isMongoId().withMessage("VehicleTypeId must be a valid MongoDB ObjectId"),
	// // RealModel
	// body("realModel").optional().isString().withMessage("RealModel must be a string"),
	// // HomeTestDrive
	// body("homeTestDrive").optional().isBoolean().withMessage("HomeTestDrive must be a boolean"),
	// // Rto
	// body("rto").optional().isMongoId().withMessage("Rto must be a valid MongoDB ObjectId"),
	// body("year").isInt({ min: 1900, max: new Date().getFullYear() }).withMessage(`Year must be an integer between 1900 and ${new Date().getFullYear()}.`),
	// body("variant").isString().isLength({ max: 100 }).withMessage("Variant must be a string with a maximum length of 100 characters."),
	// body("engineCapacity").isInt({ min: 50, max: 2500 }).withMessage("Engine Capacity must be an integer between 50 and 2500."),
	// body("fuelType").isIn(["Petrol", "Electric", "Hybrid"]).withMessage("Fuel Type must be one of Petrol, Electric, or Hybrid."),
	// body("transmission").isIn(["Manual", "Automatic"]).withMessage("Transmission must be either Manual or Automatic."),
	// // Location
	// body("location").isString().withMessage("Location is required and must be a string"),
	// // Latitude
	// body("latitude").isString().withMessage("Latitude is required and must be a string"),
	// // Longitude
	// body("longitude").isString().withMessage("Longitude is required and must be a string"),
	// body("registrationNumber").isString().isLength({ max: 15 }).withMessage("Registration Number must be a string with a maximum length of 15 characters."),
	// body("registrationState").isString().isLength({ max: 50 }).withMessage("Registration State must be a string with a maximum length of 50 characters."),
	// body("registrationDate").isDate().withMessage("Registration Date must be a valid date."),
	// body("owners").isInt({ min: 1 }).withMessage("Owners must be an integer greater than or equal to 1."),
	// body("mileage").isFloat({ min: 0 }).withMessage("Mileage must be a float greater than or equal to 0."),
	// // KmDriven
	// body("kmDriven").optional().isNumeric().isFloat({ min: 0 }).withMessage("KmDriven must be a non-negative number"),
	// // InsuranceValidity
	// body("insuranceValidity").optional().isISO8601().withMessage("InsuranceValidity must be a valid date"),
	// // InsuranceType
	// body("insuranceType").isString().isIn(["Third-Party", "Comprehensive"]).withMessage("Insurance type must be one of the predefined options"),
	// // Color
	// body("city").isString().isLength({ max: 50 }).withMessage("City must be a string with a maximum length of 50 characters."),
	// // FuelTankCapacity
	// body("fuelTankCapacity").optional().isNumeric().isFloat({ min: 0 }).withMessage("FuelTankCapacity must be a non-negative number"),
	// // NumberOfGears
	// body("numberOfGears").optional().isNumeric().isInt({ min: 1 }).withMessage("NumberOfGears must be at least 1"),
	// // TopSpeed
	// body("topSpeed").optional().isNumeric().isFloat({ min: 0 }).withMessage("TopSpeed must be a non-negative number"),
	// // MaxPower
	// body("maxPower").optional().isNumeric().isFloat({ min: 0 }).withMessage("MaxPower must be a non-negative number"),
	// // Price
	// body("price").isNumeric().isFloat({ min: 0 }).withMessage("Price is required and must be a positive number"),
	// // TransferTax
	// body("transferTax").optional().isNumeric().isFloat({ min: 0 }).withMessage("TransferTax must be a non-negative number"),
	// body("description").optional().isString().isLength({ max: 1000 }).withMessage("Description must be a string with a maximum length of 1000 characters."),
];

exports.addBike = [...validateBikeAdd];

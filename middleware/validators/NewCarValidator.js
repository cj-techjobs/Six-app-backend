const { body } = require("express-validator");

const defaultValidation = [
	// Title
	body("title").isString().isLength({ min: 3 }).withMessage("Title is required and must be at least 3 characters long"),

	// Color
	body("colorId").isString().isLength({ max: 50 }).withMessage("Color must be a string with a maximum length of 50 characters."),

	// MakeId
	body("makeId").isMongoId().withMessage("MakeId must be a valid MongoDB ObjectId"),

	// ModelId
	body("modelId").isMongoId().withMessage("ModelId must be a valid MongoDB ObjectId"),

	// VehicleTypeId
	body("vehicleTypeId").isMongoId().withMessage("VehicleTypeId must be a valid MongoDB ObjectId"),

	// VehicleTypeId
	body("categoriesId").isMongoId().withMessage("VehicleTypeId must be a valid MongoDB ObjectId"),

	// RealModel
	body("realModel").optional().isString().withMessage("RealModel must be a string"),

	// HomeTestDrive
	body("homeTestDrive").optional().isBoolean().withMessage("HomeTestDrive must be a boolean"),

	// Price
	body("price").isNumeric().isFloat({ min: 0 }).withMessage("Price is required and must be a positive number"),

	// PriceUnit
	body("priceUnit").optional().isString().isIn(["RS", "USD"]).withMessage('Price unit must be "RS" or "USD"'),

	// TransferTax
	body("transferTax").optional().isNumeric().isFloat({ min: 0 }).withMessage("TransferTax must be a non-negative number"),

	// MakeYear
	body("makeYear").isNumeric().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("MakeYear is required and must be between 1900 and the current year"),

	// RegisterYear
	body("registerYear").isNumeric().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage("RegisterYear is required and must be between 1900 and the current year"),

	// Fuel
	body("fuel").isString().isIn(["Petrol", "Diesel", "Electric", "CNG", "LPG"]).withMessage("Fuel type must be one of the predefined options"),

	// KmDriven
	body("kmDriven").optional().isNumeric().isFloat({ min: 0 }).withMessage("KmDriven must be a non-negative number"),

	// Transmission
	body("transmission").isString().isIn(["Manual", "Automatic", "CVT", "DCT"]).withMessage("Transmission type must be one of the predefined options"),

	// NumberOfOwner
	body("numberOfOwner").optional().isNumeric().isInt({ min: 1 }).withMessage("NumberOfOwner must be at least 1"),

	// InsuranceValidity
	body("insuranceValidity").optional().isISO8601().withMessage("InsuranceValidity must be a valid date"),

	// InsuranceType
	body("insuranceType").isString().isIn(["Third-Party", "Comprehensive"]).withMessage("Insurance type must be one of the predefined options"),

	// Rto
	body("rto").optional().isMongoId().withMessage("Rto must be a valid MongoDB ObjectId"),

	// Location
	body("location").isString().withMessage("Location is required and must be a string"),

	// Latitude
	body("latitude").isString().withMessage("Latitude is required and must be a string"),

	// Longitude
	body("longitude").isString().withMessage("Longitude is required and must be a string"),

	// Mileage
	body("mileage").optional().isNumeric().isFloat({ min: 0 }).withMessage("Mileage must be a non-negative number"),

	// GroundClearance
	body("groundClearance").optional().isNumeric().isFloat({ min: 0 }).withMessage("GroundClearance must be a non-negative number"),

	// SeatingCapacity
	body("seatingCapacity").optional().isNumeric().isInt({ min: 1 }).withMessage("SeatingCapacity must be at least 1"),

	// BootSpace
	body("bootSpace").optional().isNumeric().isFloat({ min: 0 }).withMessage("BootSpace must be a non-negative number"),

	// NumberOfSeatingRows
	body("numberOfSeatingRows").optional().isNumeric().isInt({ min: 1, max: 5 }).withMessage("NumberOfSeatingRows must be between 1 and 5"),

	// FuelTankCapacity
	body("fuelTankCapacity").optional().isNumeric().isFloat({ min: 0 }).withMessage("FuelTankCapacity must be a non-negative number"),

	// AlloyWheels
	body("alloyWheels").optional().isBoolean().withMessage("AlloyWheels must be a boolean"),

	// FrontTyreSize
	body("frontTyreSize").optional().isString().withMessage("FrontTyreSize must be a string"),

	// SpareWheel
	body("spareWheel").optional().isBoolean().withMessage("SpareWheel must be a boolean"),

	// NumberOfDoors
	body("numberOfDoors").optional().isNumeric().isInt({ min: 2, max: 6 }).withMessage("NumberOfDoors must be between 2 and 6"),

	// Drivetrain
	body("drivetrain").optional().isString().withMessage("Drivetrain must be a string"),

	// GearBox
	body("gearBox").optional().isString().withMessage("GearBox must be a string"),

	// NumberOfGears
	body("numberOfGears").optional().isNumeric().isInt({ min: 1 }).withMessage("NumberOfGears must be at least 1"),

	// Displacement
	body("displacement").optional().isNumeric().isFloat({ min: 0 }).withMessage("Displacement must be a non-negative number"),

	// NumberOfCylinders
	body("numberOfCylinders").optional().isNumeric().isInt({ min: 1 }).withMessage("NumberOfCylinders must be at least 1"),

	// Valve
	body("valve").optional().isString().withMessage("Valve must be a string"),

	// LimitedSlipDifferential
	body("limitedSlipDifferential").optional().isBoolean().withMessage("LimitedSlipDifferential must be a boolean"),

	// MildHybrid
	body("mildHybrid").optional().isBoolean().withMessage("MildHybrid must be a boolean"),

	// TurboCharger
	body("turboCharger").optional().isBoolean().withMessage("TurboCharger must be a boolean"),

	// ClutchType
	body("clutchType").optional().isString().withMessage("ClutchType must be a string"),

	// TopSpeed
	body("topSpeed").optional().isNumeric().isFloat({ min: 0 }).withMessage("TopSpeed must be a non-negative number"),

	// MaxPower
	body("maxPower").optional().isNumeric().isFloat({ min: 0 }).withMessage("MaxPower must be a non-negative number"),

	// MaxTorque
	body("maxTorque").optional().isNumeric().isFloat({ min: 0 }).withMessage("MaxTorque must be a non-negative number"),

	// SportMode
	body("sportMode").optional().isBoolean().withMessage("SportMode must be a boolean"),

	// MultiDriverMode
	body("multiDriverMode").optional().isBoolean().withMessage("MultiDriverMode must be a boolean"),

	// SuspensionFrontType
	body("suspensionFrontType").optional().isString().isIn(["MacPherson Strut", "Double Wishbone", "Multi-Link"]).withMessage("SuspensionFrontType must be one of the predefined options"),

	// SuspensionRearType
	body("suspensionRearType").optional().isString().isIn(["MacPherson Strut", "Double Wishbone", "Multi-Link"]).withMessage("SuspensionRearType must be one of the predefined options"),

	// SteeringAdjustmentType
	body("steeringAdjustmentType").optional().isString().withMessage("SteeringAdjustmentType must be a string"),

	// FrontBreakType
	body("frontBreakType").optional().isString().isIn(["Disc", "Drum"]).withMessage("FrontBreakType must be either 'Disc' or 'Drum'"),

	// RearBreakType
	body("rearBreakType").optional().isString().isIn(["Disc", "Drum"]).withMessage("RearBreakType must be either 'Disc' or 'Drum'"),

	// SteeringType
	body("steeringType").optional().isString().withMessage("SteeringType must be a string"),

	// MinimumTurningRadius
	body("minimumTurningRadius").optional().isNumeric().isFloat({ min: 0 }).withMessage("MinimumTurningRadius must be a non-negative number"),
];

const carValidators = [...defaultValidation];

exports.addCar = [...carValidators];

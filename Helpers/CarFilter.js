const ColorModel = new (require("../Models/ColorModel"))();
const MakeModel = new (require("../Models/MakesModel"))();
const ModelModel = new (require("../Models/ModelsModel"))();
const VehicleTypeModel = new (require("../Models/VehicleTypeModel"))();

const buildFilter = async (query) => {
	const filter = {};

	if (query.color) {
		const colorId = await ColorModel.findColor({ color: query.color }, "_id");
		if (colorId) {
			filter["colorId"] = colorId; // Use the color ID in the filter
		}
	}

	if (query.Brand) {
		const brandArray = Array.isArray(query.Brand) ? query.Brand : JSON.parse(query.Brand);
		const makeIds = await Promise.all(brandArray.map((brand) => MakeModel.findMakes({ name: brand }, "_id")));
		const validMakeIds = makeIds.filter(Boolean); // Filter out any invalid makeIds (null or undefined)

		if (validMakeIds.length) {
			filter["makeId"] = { $in: validMakeIds }; // Use the array of make IDs in the filter
		}
	}

	if (query.Models) {
		const modelArray = Array.isArray(query.Models) ? query.Models : JSON.parse(query.Models);
		const modelIds = await Promise.all(modelArray.map((model) => ModelModel.findModel({ name: model }, "_id")));
		const validModelIds = modelIds.filter(Boolean); // Filter out any invalid model IDs (null or undefined)

		if (validModelIds.length) {
			filter["modelId"] = { $in: validModelIds }; // Use the array of model IDs in the filter
		}
	}

	if (query.BodyType) {
		const bodyTypeAry = Array.isArray(query.BodyType) ? query.BodyType : JSON.parse(query.BodyType);
		const bodyIds = await Promise.all(bodyTypeAry.map((model) => VehicleTypeModel.findVehicleType({ name: model }, "_id")));
		const validBodyIds = bodyIds.filter(Boolean); // Filter out any invalid model IDs (null or undefined)

		if (validBodyIds.length) {
			filter["vehicleTypeId"] = { $in: validBodyIds }; // Use the array of model IDs in the filter
		}
	}

	if (query["MinPrice"]) {
		filter["price"] = { $gte: parseFloat(query["MinPrice"]) }; // Adjust the field name and operator as per your schema
	}
	if (query["MaxPrice"]) {
		if (!filter["price"]) filter["price"] = {};
		filter["price"]["$lte"] = parseFloat(query["MaxPrice"]); // Adjust the field name and operator as per your schema
	}
	if (query["KmsDriven"]) {
		filter["kmDriven"] = { $lte: parseInt(query["KmsDriven"]) }; // Adjust the field name and operator as per your schema
	}
	if (query.Year) {
		filter["makeYear"] = { $gte: parseInt(query.Year) }; // Adjust the field name as per your schema
	}

	if (query.Seats) {
		let seatsArray = Array.isArray(query.Seats) ? query.Seats : query.Seats ? JSON.parse(query.Seats) : [];
		filter["seatingCapacity"] = seatsArray.length ? { $in: seatsArray.map(Number) } : [];
	}

	if (query.Owner) {
		filter["numberOfOwner"] = parseInt(query.Owner); // Adjust the field name as per your schema
	}

	if (query["FuelType"]) {
		let fuelTypeArray = Array.isArray(query["FuelType"]) ? query["FuelType"] : query["FuelType"] ? JSON.parse(query["FuelType"]) : [];
		filter["fuel"] = fuelTypeArray.length ? { $in: fuelTypeArray } : [];
	}

	if (query["Transmission"]) {
		let transArray = Array.isArray(query["Transmission"]) ? query["Transmission"] : query["Transmission"] ? JSON.parse(query["Transmission"]) : [];
		filter["transmission"] = transArray.length ? { $in: transArray } : [];
	}

	return filter;
};

module.exports = buildFilter;

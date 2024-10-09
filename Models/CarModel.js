const CarSchema = require("../Database/Schemas/CarSchema");

module.exports = class {
	createCar = (body) => {
		return new CarSchema(body).save();
	};

	createCarAll = (body) => {
		return CarSchema.insertMany(body);
	};

	findCar = (filter, projection, option) => {
		return CarSchema.findOne(filter, projection, option).lean();
	};

	countUserCar = (filter, projection, option) => {
		return CarSchema.findOne(filter, projection, option).countDocuments().lean();
	};

	updateCar = (filter, updatedData) => {
		return CarSchema.updateOne(filter, updatedData);
	};

	deleteCar = (filter) => {
		return CarSchema.deleteOne(filter);
	};

	countCars = (filter) => {
		return CarSchema.countDocuments(filter).exec();
	};

	getAllCar = (filter = {}, skip = 0, limit = 10) => {
		return CarSchema.find(filter)
			.skip(skip)
			.limit(limit)
			.sort({ created_at: -1 })
			.populate([
				{
					path: "userId",
					strictPopulate: false, // Disable strict populate for this query
					select: "fullName mobileNumber",
				},
				{
					path: "makeId",
					strictPopulate: false,
				},
				{
					path: "modelId",
					strictPopulate: false,
				},
				{
					path: "vehicleTypeId",
					strictPopulate: false,
				},
				{
					path: "colorId",
					strictPopulate: false,
				},
				{
					path: "categoriesId",
					strictPopulate: false,
				},
			])
			.lean();
	};

	findCarById = (id) => {
		return CarSchema.findById(id)
			.populate([
				{
					path: "userId",
					strictPopulate: false,
					select: "fullName mobileNumber",
				},
				{
					path: "makeId",
					strictPopulate: false,
				},
				{
					path: "modelId",
					strictPopulate: false,
				},
				{
					path: "vehicleTypeId",
					strictPopulate: false,
				},
				{
					path: "colorId",
					strictPopulate: false,
				},
				{
					path: "categoriesId",
					strictPopulate: false,
				},
			])
			.lean(); // Convert Mongoose document to plain object
	};
	
};

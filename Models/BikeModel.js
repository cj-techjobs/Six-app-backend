const BikeSchema = require("../Database/Schemas/BikeSchema");

module.exports = class {
	createBike = (body) => {
		return new BikeSchema(body).save();
	};

	createBikeAll = (body) => {
		return BikeSchema.insertMany(body);
	};

	findBike = (filter, projection, option) => {
		return BikeSchema.findOne(filter, projection, option).lean();
	};

	countUserBike = (filter, projection, option) => {
		return BikeSchema.findOne(filter, projection, option).countDocuments().lean();
	};

	updateBike = (filter, updatedData) => {
		return BikeSchema.updateOne(filter, updatedData);
	};

	deleteBike = (filter) => {
		return BikeSchema.deleteOne(filter);
	};

	countBikes = (filter) => {
		return BikeSchema.countDocuments(filter).exec();
	};

	getAllBike = (filter = {}, skip = 0, limit = 10) => {
		return BikeSchema.find(filter)
			.skip(skip)
			.limit(limit)
			.populate([
				{
					path: "userId",
					strictPopulate: false, // Disable strict populate for this query
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
			])
			.lean();
	};
	getBikeById = (id) => {
		return BikeSchema.findById(id).lean(); // Fetch bike by ID
	};

};

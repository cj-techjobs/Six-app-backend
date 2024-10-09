const VehicleTypeSchema = require("../Database/Schemas/VehicleTypeSchema");

module.exports = class {
	createVehicleType = (body) => {
		return new VehicleTypeSchema(body).save();
	};

	createVehicleTypeAll = (body) => {
		return VehicleTypeSchema.insertMany(body);
	};

	findVehicleType = (filter, projection, option) => {
		return VehicleTypeSchema.findOne(filter, projection, option).lean();
	};

	updateVehicleType = (filter, updatedData) => {
		return VehicleTypeSchema.updateOne(filter, updatedData);
	};

	deleteVehicleType = (filter) => {
		return VehicleTypeSchema.deleteOne(filter);
	};

	getAllVehicleType = (filter = {}, skip = 0, limit = 10) => {
		return VehicleTypeSchema.find(filter).skip(skip).limit(limit).lean();
	};
};

const RtoSchema = require("../Database/Schemas/RtoSchema");

module.exports = class {
	createRto = (body) => {
		return new RtoSchema(body).save();
	};

	createRtoAll = (body) => {
		return RtoSchema.insertMany(body);
	};

	findRto = (filter, projection, option) => {
		return RtoSchema.findOne(filter, projection, option).lean();
	};

	updateRto = (filter, updatedData) => {
		return RtoSchema.updateOne(filter, updatedData);
	};

	deleteRto = (filter) => {
		return RtoSchema.deleteOne(filter);
	};

	getAllRto = (filter = {}, skip = 0, limit = 10) => {
		return RtoSchema.find(filter).skip(skip).limit(limit).lean();
	};
};
